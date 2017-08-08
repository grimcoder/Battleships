import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './../actions/actionCreators';
import Main from './Main';
import Game from './Game';


function mapStateToProps(state) {
    return {
        userId: state.userId,
        data: state.data,
        availableGames: state.availableGames,
        joinedGame: state.joinedGame,
        startingGame: state.startingGame,
        startedGame: state.startedGame,
        gameStatus: state.gameStatus,
        myTurn: state.myTurn,
        hits: state.hits,
        winner: state.winner,
        playerName: state.playerName,
        enemyName: state.enemyName,
        enemyId: state.enemyId,
        enemyHits: state.enemyHits,
        ships: state.ships,
        allShips: state.allShips,
        playerId: state.playerId,
        error: state.error
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
