/**
 * Created by taraskovtun on 7/23/17.
 */
import { createStore, compose } from 'redux';
import { applyMiddleware } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import shipsReducer from './reducers/ships';
import data from './data/data.js';

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// create an object for the default data
const defaultState = {
    data
};

const store = createStore(shipsReducer, defaultState, applyMiddleware(socketIoMiddleware));


export default store;
