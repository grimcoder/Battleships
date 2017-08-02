import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
      <div>
        <Link to='/' >Home</Link>
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

export default Main;