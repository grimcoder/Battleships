import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
      <div>
        <div className='container'>
          <Link to='/'  ><h1 className='text-center'>🏠 </h1> </Link>
        </div>
        
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
};

export default Main;