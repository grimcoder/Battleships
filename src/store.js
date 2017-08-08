/**
 * Created by taraskovtun on 7/23/17.
 */
import { createStore, compose } from 'redux';
import { applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import shipsReducer from './reducers/ships';
import data from './data/data.js';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';


let socket = io(process.env.REACT_APP_API_HOST, {'forceNew': true})
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// create an object for the default data

const defaultState = {
    data
};

const store = createStore(shipsReducer, defaultState, applyMiddleware(socketIoMiddleware));


// export const history = syncHistoryWithStore(browserHistory, store);

export default store;