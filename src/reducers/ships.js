/**
 * Created by taraskovtun on 7/23/17.
 */
import {DotInArray} from '../tools'

function ships(state = [], action) {
    switch(action.type) {
        case 'CELL_CLICKED' :

            const x = action.x;
            const y = action.y;

            console.log(`cell clicked!! ${x} ${y}`);


            var hits = state.data.hits;

            if (!DotInArray([x,y], hits)) {

                hits.push([x, y]);

            }


            return {data : {ships: state.data.ships, hits}};

        default:
            return state;
    }
}

export default ships;
