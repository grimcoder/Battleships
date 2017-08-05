/**
 * Created by taraskovtun on 7/23/17.
 */
import {DotInArray, clone} from '../tools'

function ships(state = [], action) {
    switch(action.type) {
        case 'helloResponse' :

            state = clone(state)
            state.userId = action.userId;
            return state;

        case 'CELL_CLICKED' :

            const x = action.x;
            const y = action.y;
            // console.log(`cell clicked!! ${x} ${y}`);
            state = clone(state)
            var hits = state.data.hits;
            if (!DotInArray([x,y], hits)) {
                hits.push([x, y]);
            }
            return {data : {ships: state.data.ships, hits}};


        case 'initResponse':
            console.log (action);
            state = clone(state);

            state['availableGames'] = action.data;

            //state['gameStatue'] = 'init';

            return state;

        case 'createResponse':
            console.log (action);
            state = clone(state);
            state.playerId = action.data.userId;
            state.playerName = action.data.playerName;
            state['gameStatue'] = 'created';
            return state;

        case 'joinResponse':
            console.log (action);
            state = clone(state);

            state.playerId = state.playerId ? state.playerId : action.data.userId;

            state['gameStatue'] = 'joined';
            state.availableGames = undefined;
            state.joinedGame = action.data.gameId;
            state.createdById = action.data.createdById;

            if (!state.playerName) {
                state.playerName = action.data.playerName;
                state.enemyName = action.data.createdBy;
                state.enemyId = action.data.createdById;
            }
            else{
                state.enemyName = action.data.playerName;
                state.enemyId = action.data.userId;
                
            }

            return state;

        case 'startingResponse':
            console.log (action);
            state = clone(state);
            state.joinedGame = undefined;
            state.startingGame = action.data.gameId;
            state['gameStatus'] = 'starting';
            return state;

        case 'startedResponse':
            console.log (action);
            state = clone(state);
            state.startingGame = undefined;
            state.startedGame = action.data.gameId;
            state['gameStatus'] = 'started';
            return state;

        case 'joinResponse':
            console.log (action);
            state = clone(state);


            return state;

        case 'yourTurn':
            console.log (action);
            state = clone(state);
            state['myTurn'] = state.playerId == action.data ? true : false;
            return state;

        case 'server/start':
            state = clone(state);
            state['ships'] = action.data.board.ships;
            return state;
        break;


        case 'hitResponse':
            console.log (action);

            state = clone(state);

            if (state.playerId == action.socketId){
                [state['hits'] , state['enemyHits']]= [ action.hits, action.enemyHits];
            }
            else{
                [state['hits'], state['enemyHits']] = [action.enemyHits,action.hits]
            }

            return state;

        case 'win':
            console.log (action);

            state = clone(state);
            state['winner'] = action.winner;

            return state;

            case 'resetState':
            state = {}
            return state;

        default:
            return state;
    }
}

export default ships;
