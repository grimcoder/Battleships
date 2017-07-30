
const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');
var uuid = require('uuid');
const reducer = require('./reducer').reducer
const defaultState = require('./state').defaultState
const makeCopy = require('./tools').makeCopy


server.listen(3000);
const io = socket_io();
io.attach(server);

let state = defaultState;




io.on('connection', function(socket){

    console.log("Socket connected: " + socket.id);

    socket.on('action', (action) => {



        switch (action.type){

            case 'server/init'  :
                state = reducer(state, action);
                const initGames = Object.entries(state.games).filter((game)=>game[1].status = 'init').map((item)=>item[0]);
                socket.emit('action', {type:'initResponse', data:{userId: socket.id, initGames: initGames}});

                break;

            case 'server/create':
                const socketId = socket.id;
                action.socketId = socketId;
                action.newgameId = uuid.v4();
                state = reducer(state, action);

                socket.join(action.newgameId);

                socket.emit('action', {type:'createResponse', data:{userId: socketId, newgameId: action.newgameId}});

                break;

            case 'server/join':
                break;
            case 'server/hit':
                break;
            default:
                break;
        }

        // if(action.type === 'server/hello'){
        //
        //     console.log('Got hello data!', action.data);
        //
        //     socket.emit('action', {type:'message', data:'good day buddy!'});
        //
        // }
        //
        // if (action.type === 'server/init'){
        //
        // }

    });

});
