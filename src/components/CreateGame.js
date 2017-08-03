import React , {Component} from 'react';
import { Link } from 'react-router';

class CreateGame extends Component {
constructor(props){
  super(props)
  this.CreateGame = this.CreateGame.bind(this);

}

CreateGame(){
              this.props.CreateGame.bind(this, this.playerName.value)();
              
}

  render() {

    if (this.props.joinedGame){
        this.props.history.push.bind(this, '/startgame')();
    }

      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

    return (
      <div>

        <input type='text'  
        ref={(playerName)=>{this.playerName=playerName}} /> 

        <button onClick={this.CreateGame}>

            Start new game
        </button>


      </div>
    )
  }
};

export default CreateGame;