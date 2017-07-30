/**
 * Created by taraskovtun on 7/29/17.
 */

const makeCopy = require( './tools')

module.exports.reducer =  (state = {}, action) => {

    switch (action.type){

        // if(action.type === 'server/hello'){
        //     console.log('Got hello data!', action.data);
        //     socket.emit('action', {type:'message', data:'good day buddy!'});
        // }
        // if (action.type === 'server/init'){
        // }

        case 'server/init' :

            return makeCopy(state);

        case 'server/create':

            const statecopy = makeCopy(state);
            const socketId = action.socketId;
            const newgameId = action.newgameId;

            statecopy.games[newgameId] = {

                status: 'init', // init, created, started, finished

                turn: action.socketId,

                players: {
                    socketId: {socketId}
                }

            }

            return statecopy;

            break;

        case 'server/join':
            break;

        case 'server/hit':
            break;

        default:
            return makeCopy(state);

    }

}

