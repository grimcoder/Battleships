/**
 * Created by taraskovtun on 7/23/17.
 */
import {DotInArray, clone} from '../tools'

function ships(state = [], action) {
    switch(action.type) {
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
            return state;

        case 'createResponse':
            console.log (action);
            return state;

        default:
            return state;
    }
}

export default ships;
