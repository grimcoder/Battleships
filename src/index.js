
import React from 'react';
import { render } from 'react-dom';
import './index.css';

import App from './components/App';
import Home from './components/Home'
import Game from './components/Game'
import CreateGame from './components/CreateGame'
import StartGame from './components/StartGame'

import { Provider } from 'react-redux';
import store, { history } from './store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Lobby from './components/Lobby'

const provider = (

    <Provider store={store}>

      <Router >
        <Route path="/" component={App} >
           <IndexRoute component={Lobby}></IndexRoute>  
           <Route path="/game" component={Game}></Route>    
           <Route path="/lobby" component={Lobby}></Route>    
           <Route path="/creategame" component={CreateGame}></Route>    
           <Route path="/startgame" component={StartGame}></Route>    

      </Route>
    </Router>  

        {/* <Provider store={store}> */}
        {/* <App >
           
        </App> */}
    {/* </Provider> */}

    </Provider>
)

render(provider, document.getElementById('root'));