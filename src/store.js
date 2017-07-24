/**
 * Created by taraskovtun on 7/23/17.
 */
import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';



// import the root reducer
import rootReducer from './reducers/index';
import shipsReducer from './reducers/ships';

import data from './data/data.js';

// create an object for the default data
const defaultState = {
data
};

const store = createStore(shipsReducer, defaultState);


export default store;
