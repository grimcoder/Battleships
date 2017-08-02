const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');
var uuid = require('uuid');
const reducer = require('./reducer').reducer
const defaultState = require('./state').defaultState

const makeCopy = require('./tools').makeCopy
const AllDotIn = require('./tools').AllDotIn
const DotInArray = require('./tools').DotInArraymakeCopy

server.listen(3000);
const io = socket_io();
io.attach(server);

let state = defaultState;

io.on('connection', function(socket){

    console.log("Socket connected: " + socket.id);

        socket.on('disconnected', function() {

            socket.emit('DelPlayer', person_name);

        });


    socket.on('action', (action) => {


        const socketId = socket.id;
        action.socketId = socketId;

        switch (action.type){

            case 'server/init'  :
                state = reducer(state, action);
                const initGames = Object.entries(state.games).filter((game)=>game[1].status = 'init').map((item)=>[item[0], item[1]]);
                socket.emit('action', {type:'initResponse', data:{userId: socket.id, initGames: initGames}});

                break;

            case 'server/hello'  :
                socket.emit('action', {type:'helloResponse', userId: socket.id});
                break;

            case 'server/create':
                action.newgameId = uuid.v4();
                 
                state = reducer(state, action);
                socket.join(action.newgameId,(err) => {
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms); // [ <socket.id>, 'room 237' ]
                    io.sockets.in(action.newgameId).emit(action.newgameId, 'a new user has joined the room'); // broadcast to everyone in the room
                });

                socket.emit('action', {type:'createResponse', data:{userId: socketId,
                    newgame: state.games[action.newgameId],
                    newgameId: action.newgameId}});

                break;

            case 'server/join':
                state = reducer(state, action);

                socket.join(action.data,() => {
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms); // [ <socket.id>, 'room 237' ]
                    io.sockets.in(action.data).emit(action.data, 'a new user has joined the room'); // broadcast to everyone in the room
                });

                io.sockets.in(action.data).emit('action', {type:'joinResponse', data:{userId: socketId, gameId: action.data}});

                break;

            case 'server/start':
                state = reducer(state, action);
                socket.emit('action', {type:'startingResponse',data:{userId: socketId, game: action.data}});

                if (Object.entries(state.games[action.data.game].players).filter((player)=>{return player[1].started}).length == 2) {
                    io.sockets.in(action.data.game).emit('action', {type:'startedResponse', data:{gameId: action.data}});
                }


                socket.emit('action', {type:'yourTurn', data: state.games[action.data.game].turn});
                break;

            case 'server/CELL_CLICKED':
                state = reducer(state, action);
                gameId = action.gameId;

                const hits = state.games[gameId].players[socketId].board.hits;
                socket.emit('action', {type:'hitResponse', hits});

                if (CalculateWin(gameId, socketId)){
                    io.sockets.in(action.gameId).emit('action', 
                    {type:'win', winner: state.games[action.gameId].players[socketId].name}
                    );
                 
                    delete state.games[action.gameId];
                    return;
                }

                io.sockets.in(action.gameId).emit('action', {type:'yourTurn', data: state.games[action.gameId].turn});

                break;

            default:
                break;

        }

    });

});

CalculateWin = (gameId, socketId) => {

    const hits = state.games[gameId].players[socketId].board.hits;

    const enemyId = Object
    .keys(state.games[gameId].players)
    .filter(player=>player != socketId);

    const enemyBoard = state.games[gameId].players[enemyId].board;


    return (AllDotIn(enemyBoard.allShips, enemyBoard.enemyHits))

};
