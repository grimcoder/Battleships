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
const log = require('simple-node-logger').createSimpleLogger('project.log');

let state = defaultState;

io.on('connection', function(socket) {

    console.log("Socket connected: " + socket.id);

    socket.on('disconnect', function() {

        // notify all users this game is cancelled because user dropped off
        let gamesWithPlayer = state.games ? Object.entries(state.games).filter(game=>Object.keys(game[1].players).some(playerId=>playerId==socket.id))[0]
            : undefined;

            if (gamesWithPlayer){
                //io.sockets.emit('action', { type: 'disconnected', userId: socket.id });
                state.games[gamesWithPlayer[0]] = {}
                
            }


        // delete games with this user: 


    });


    socket.on('action', (action) => {
        const socketId = socket.id;
        action.socketId = socketId;
        log.info(action);
        let initGames;
        switch (action.type) {

            case 'server/init':
                state = reducer(state, action);
                initGames = Object.entries(state.games).filter((game) => game[1].status = 'init').map((item) => [item[0], item[1]]);
                socket.emit('action', { type: 'initResponse', data: { userId: socket.id, initGames: initGames } });

                break;

            case 'server/hello':
                socket.emit('action', { type: 'helloResponse', userId: socket.id });
                break;

            case 'server/create':
                action.newgameId = uuid.v4();

                state = reducer(state, action);
                socket.join(action.newgameId, (err) => {
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms); // [ <socket.id>, 'room 237' ]
                    io.sockets.in(action.newgameId).emit(action.newgameId, 'a new user has joined the room'); // broadcast to everyone in the room
                });

                 initGames = Object.entries(state.games).filter((game) => game[1].status = 'init').map((item) => [item[0], item[1]]);
                
                 io.sockets.emit('action', {
                    type: 'createResponse',
                    data: {
                        userId: socketId,
                        newgame: state.games[action.newgameId],
                        playerName: state.games[action.newgameId].players[socketId].name,
                        newgameId: action.newgameId,
                        initGames: initGames
                    }
                });

                break;

            case 'server/join':
                state = reducer(state, action);

                socket.join(action.data, () => {
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms); // [ <socket.id>, 'room 237' ]
                    io.sockets.in(action.data).emit(action.data, 'a new user has joined the room'); // broadcast to everyone in the room
                });

                io.sockets.in(action.data).emit('action', {
                    type: 'joinResponse',
                    data: { userId: socketId, gameId: action.data, 
                        playerName: state.games[action.data].players[socketId].name ,
                        createdBy: state.games[action.data].players[state.games[action.data].createdBy].name,
                        createdById: state.games[action.data].createdBy,
                    }
                });

                break;

            case 'server/start':
                state = reducer(state, action);
                socket.emit('action', { type: 'startingResponse', data: { userId: socketId, game: action.data } });

                if (Object.entries(state.games[action.data.game].players).filter((player) => { return player[1].started }).length == 2) {
                    io.sockets.in(action.data.game).emit('action', { type: 'startedResponse', data: { gameId: action.data } });

                }
                //if (io.sockets.in(action.data.game).length > 1){
                    io.sockets.in(action.data.game).emit('action', { type: 'yourTurn', data: state.games[action.data.game].turn });
                //}
                break;


            case 'server/CELL_CLICKED':
                state = reducer(state, action);
                
                if (process.env.NODE_ENV == 'development') {
                    console.log(state);
                }

                gameId = action.gameId;

                const hits = state.games[gameId].players[socketId].board.hits;
                const allShips = state.games[gameId].players[socketId].board.allShips;

                const enemyId = Object.keys(state.games[gameId].players).filter((player)=>player!=socketId)[0];
                const enemyHits = state.games[gameId].players[enemyId].board.hits;

                //socket.emit('action', { type: 'hitResponse', socketId, hits, enemyHits });

                io.sockets.in(action.gameId).emit('action', { type: 'hitResponse', socketId, hits, enemyHits });

                io.sockets.in(action.gameId).emit('action', { type: 'yourTurn', data: state.games[action.gameId].turn });

                if (CalculateWin(gameId, socketId)) {
                    io.sockets.in(action.gameId).emit('action', { type: 'win', winner: state.games[action.gameId].players[socketId].name });

                    delete state.games[action.gameId];
                    return;
                }


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
        .filter(player => player != socketId);

    const enemyBoard = state.games[gameId].players[enemyId].board;


    return (AllDotIn(enemyBoard.allShips, enemyBoard.enemyHits))

};