import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actionCreators';
import Main from './Main';


function mapStateToProps(state) {
    return {
        data: state.data,
        availableGames: state.availableGames,
        joinedGame: state.joinedGame,
        startingGame: state.startingGame,
        startedGame: state.startedGame,
        gameStatue: state.gameStatue,
        myTurn: state.myTurn,
        playerId: state.playerId
    }
}

function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
