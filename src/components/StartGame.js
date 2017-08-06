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

    resolveClass (x,y, hits = this.props.hits)  {

        if (!hits || hits.length ==0) return 'empty'
        let hit = hits.filter((hit)=>hit.x == x && hit.y == y)[0];
        return hit ? hit.status : 'empty'
    }

    resolveClassEnemy (x,y)  {

        let ship = this.state.allShips ? this.state.allShips.filter((hit)=>hit[0] == x && hit[1] == y)[0] : undefined;
        let shipStatus = ship ? 'ship' : 'empty';

        let hit = this.props.enemyHits ? this.props.enemyHits.filter((hit)=>hit.x == x && hit.y == y)[0] : undefined;

        return hit ? hit.status : shipStatus
    }


  render() {

          let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClassEnemy(x, y);
                 return <td className={className} onClick={this.props.myTurn && this.props.startedGame ? 
                 this.props.click.bind(null, x, y, this.props.startedGame.game) : null} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      const boardEnemy =  <table disabled={!this.props.myTurn} ><tbody>{rows}</tbody></table>

      const generateButton =  <button onClick={()=>{

              this.GenerateBoard();

            }}>Generate Board</button>
          //: undefined;

      const startButton =  <button onClick={()=>{

              this.StartGame();

            }}>Start Game</button>
          //: undefined;

    return (
      <div>
        {generateButton}
        {this.state.ships ? startButton : null}
        
      {/* {boardEnemy} */}

         <Board  isMy='true' {...this.props} ships={this.state.ships} allShips={this.state.allShips} /> 

      </div>
    )
  }
};

export default StartGame;