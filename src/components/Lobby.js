import React , {Component} from 'react';
import { Link } from 'react-router';

class Lobby extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    if (this.props.joinedGame){
        this.props.history.push.bind(this, '/startgame')();
    }
      
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

      const joinButtons = this.state.tryinToJoin ? <div>
        <input ref={(name)=>this.name=name} />
        <button onClick={()=>{


              this.props.joinGame.bind(this, this.state.game[0], this.name.value)()
            
            }}>
            JoinGame with {this.state.game[1].players[this.state.game[1].createdBy].name}</button></div>
            : availGames
            .filter((game)=>game[1].createdBy != this.props.playerId)
            .map((game)=> <div><button onClick={()=>{

              this.setState({tryinToJoin: true, game:game});

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