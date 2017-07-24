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


        case 'message':
            console.log (Object.assign({}, {message:action.data}));
            return state;

        default:
            return state;
    }
}

export default ships;
