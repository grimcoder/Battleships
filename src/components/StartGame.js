import React , {Component} from 'react';
import { Link } from 'react-router';

class StartGame extends Component {
constructor(props){
  super(props)

  this.state = {

      ships: [{"ship": "destroyer", "positions": [[0, 0], [1, 0]]}]
    
    }
  }


  render() {
      const startButton = this.props.joinedGame
          ?  <button onClick={()=>{

              this.props.startGame.bind(this, this.props.joinedGame, this.state.ships)();
              this.props.history.push.bind(this, '/game')();

            }}>Start game</button>
          : undefined;

    return (
      <div>
        {startButton}
      </div>
    )
  }
};

export default StartGame;