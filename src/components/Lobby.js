import React , {Component} from 'react';
import { Link } from 'react-router';

class Lobby extends Component {

  render() {
    return (
      <div>
        <h1 onClick={this.props.history.push.bind(this, '/game')}>
            Game
        </h1>
      </div>
    )
  }
};

export default Lobby;