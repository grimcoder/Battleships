import React , {Component} from 'react';
import { Link } from 'react-router';
import Lobby from './Lobby'

class Home extends Component {

  constructor(props){
    super(props)
    
  }

  componentDidMount(){
   
  }
  
  render() {
    return (
      <div>
        <h1 onClick={()=>{
          this.props.history.push.bind(this, '/lobby')()
           this.props.SocketIOHandshake.bind(this)();
          this.props.InitGame.bind(this, '')()
          }
          }>
            Start
        </h1>
      </div>
    )
  }
};

export default Home;