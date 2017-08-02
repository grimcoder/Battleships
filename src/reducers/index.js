/**
 * Created by taraskovtun on 7/23/17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ships from './ships';


const rootReducer = combineReducers({ships, routing: routerReducer});

export default rootReducer;

