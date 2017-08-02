import React , {Component} from 'react';
import { Link } from 'react-router';
import Lobby from './Lobby'

class Home extends Component {

  render() {
    return (
      <div>
        <h1 onClick={this.props.history.push.bind(this, '/lobby')}>
            Start
        </h1>
      </div>
    )
  }
};

export default Home;