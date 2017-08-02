import React , {Component} from 'react';
import { Link } from 'react-router';

class StartGame extends Component {
constructor(props){
  super(props)

}


  render() {
      const startButton = this.props.joinedGame
          ?  <button onClick={()=>{

              this.props.startGame.bind(this, this.props.joinedGame)();
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