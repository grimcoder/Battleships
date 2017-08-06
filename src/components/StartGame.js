import React , {Component} from 'react';
import { Link } from 'react-router';
import './App.css';
import { Board } from './Board'

class StartGame extends Component {

constructor(props){
    super(props)
    this.state = {}
  }


  flatten(ships){
    return ships.reduce((all, ship)=>[...all, ...ship ], [])    
  }

  randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  GenerateBoard(){

    let rules = [5,4,3,3,2]
    let ships = [];

    for (let i = 0; i < rules.length; i++){
      let allShips = this.flatten(ships);

      while(true){

        let newShip = []

        let randomDirection = this.randomIntFromInterval(1,2);
        let randomX = this.randomIntFromInterval(0,9);
        let randomY = this.randomIntFromInterval(0,9);
        
        for (let n=0; n<rules[i]; n++){

          switch(randomDirection){
            case 1: 
                  newShip.push([randomX, randomY+n]);
                  break;
            case 2: 
                  newShip.push([randomX+n, randomY])
                  break;
          }

        }

        if (newShip.some(cell=>allShips.some(acell=>cell[0] == acell[0] && cell[1] == acell[1])))
        {
            continue;
        }

        if (newShip.some(cell=>cell[0] > 9 || cell[1] > 9))
        {
            continue;
        }

        ships.push(newShip);
        break;
      }
    }

    this.setState({
      ships: ships, 
      allShips: ships.reduce((all, ship)=>[...all, ...ship], [])
    })
  }

    StartGame(){
      this.props.startGame.bind(this, this.props.joinedGame, this.state.ships.map(ship=>{return {positions: ship}}))();
      this.props.history.push.bind(this, '/game')();
    }


  render() {

      const generateButton =  <button onClick={()=>{
              this.GenerateBoard();
            }}>Generate Board</button>

      const startButton =  <button onClick={()=>{
              this.StartGame();
            }}>Start Game</button>

    return (
      <div>
        {generateButton}
        {this.state.ships ? startButton : null}
         <Board  isMy='true' {...this.props} ships={this.state.ships} allShips={this.state.allShips} /> 
      </div>
    )
  }
};

export default StartGame;