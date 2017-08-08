import React , {Component} from 'react';
import { Link } from 'react-router';

class Lobby extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
        this.props.resetState();
    
    this.props.SocketIOHandshake();
    this.props.InitGame()
  }

  render() {
    if (this.props.joinedGame){
        this.props.history.push.bind(this, '/startgame')();
    }
      
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []
      const userId = this.props.userId;

        const createGameButton =  <button  style={{marginBottom: '8px'}} className="btn btn-primary  btn-lg" onClick={
          ()=>
            {
                this.props.history.push.bind(this, '/creategame')();
              }
          }>
            Start new game
 </button> 


      const joinButtons = this.state.tryinToJoin ? <div  style={{marginBottom: '8px'}}>
        <input value='player2' ref={(name)=>this.name=name} style={{width: '200px', marginBottom: '8px'}} className='form-control'/>
        <button  className="btn btn-primary  btn-lg"  onClick={()=>{


              this.props.joinGame.bind(this, this.state.game[0], this.name.value)()
            
            }}>
            JoinGame with {this.state.game[1].players[this.state.game[1].createdBy].name}</button>
            </div>
            : availGames
            .filter((game)=>game[1].createdBy != userId)
            .map((game)=> <div style={{marginBottom: '8px'}}>
              <button  className="btn btn-primary  btn-lg" onClick={()=>{

              this.setState({tryinToJoin: true, game:game});

            }}>
            JoinGame with {game[1].players[game[1].createdBy].name}</button></div> )  
    


    return (
      <div className='container'>

        {createGameButton}
        {joinButtons}
      
      </div>
    )
  }
};

export default Lobby;