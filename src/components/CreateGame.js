import React , {Component} from 'react';
import { Link } from 'react-router';

class CreateGame extends Component {
constructor(props){
  super(props)
  this.CreateGame = this.CreateGame.bind(this);
  this.changeName = this.changeName.bind(this)
  this.state = {playerName: 'player1'}
  this.state

}

CreateGame(){ this.props.CreateGame.bind(this, this.playerName.value)();

  this.setState({gameCreated: true});
}

changeName(event){
  const name = event.target.value;
  this.setState({playerName: name})
}

  render() {


    if (this.props.joinedGame){
        this.setState({gameCreated: false });
        this.props.history.push.bind(this, '/startgame')();
    }
            if (this.state.gameCreated){
        return(<h1>Please wait</h1>)
      }

      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

    return (
      <div>

      <div class="input-group mb-2 mr-sm-2 mb-sm-0">

              <input type='text' style={{marginBottom: '8px'}}  
              value={this.state.playerName} 
              onChange={this.changeName} 
              className='form-control  mb-2 mr-sm-2 mb-sm-0'
              ref={(playerName)=>{this.playerName=playerName}} /> 

              <button onClick={this.CreateGame} className='btn btn-primary btn-lg '>
                  Start new game
              </button>

    </div>
    {/* </form> */}

      </div>
    )
  }
};

export default CreateGame;