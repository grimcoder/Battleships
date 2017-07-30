/**
 * Created by taraskovtun on 7/29/17.
 */

const makeCopy = require( './tools')

module.exports.reducer = function (state = {}, action)  {

    switch (action.type){

        // if(action.type === 'server/hello'){
        //     console.log('Got hello data!', action.data);
        //     socket.emit('action', {type:'message', data:'good day buddy!'});
        // }
        // if (action.type === 'server/init'){
        // }

        default:
            return makeCopy(state);

    }

}

