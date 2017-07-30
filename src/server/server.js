
const http = require('http');
const server = http.createServer();
const socket_io = require('socket.io');

const reducer = require('./reducer').reducer
const defaultState = require('./state')
const makeCopy = require('./tools')


server.listen(3000);
const io = socket_io();
io.attach(server);

let state = defaultState;


io.on('connection', function(socket){

    console.log("Socket connected: " + socket.id);

    socket.on('action', (action) => {

        state = reducer(state, action);

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
