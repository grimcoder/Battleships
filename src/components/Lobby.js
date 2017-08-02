import React , {Component} from 'react';
import { Link } from 'react-router';

class Lobby extends Component {

  render() {
    if (this.props.joinedGame){
        this.props.history.push.bind(this, '/startgame')();
    }
      
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

      const joinButtons = availGames
          .filter((game)=>game[1].createdBy != this.props.playerId)
          .map((game)=> <div><button onClick={()=>{

              this.props.joinGame.bind(this, game[0])()
            
            }}>
            JoinGame with {game[1].players[game[1].createdBy].name}</button></div> )
    
    return (
      <div>
        <button onClick={
          ()=>
            {
                this.props.history.push.bind(this, '/creategame')();
              }
          }>
            Start new game
        </button>

        {joinButtons}
      </div>
    )
  }
};

export default Lobby;