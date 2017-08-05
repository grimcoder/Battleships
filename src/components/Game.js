import React, { Component } from 'react';
import './App.css';
import {DotInArray, AllDotIn} from './../tools'

class Game extends Component {

    allShips = []

    constructor(props){
        super(props)
        this.resolveClass = this.resolveClass.bind(this);
        this.resolveClassEnemy = this.resolveClassEnemy.bind(this);

        this.showMyBoard = this.showMyBoard.bind(this);
        this.showEnemyBoard = this.showEnemyBoard.bind(this);
        this.state = {showEnemy: true}
    }

    showEnemyBoard(){
        this.setState({showEnemy: true})
    }

    showMyBoard(){
        this.setState({showEnemy: false})
    }

    resolveClass (x,y)  {
        if (!this.props.hits || this.props.hits.length ==0) return 'empty'
        let hit = this.props.hits.filter((hit)=>hit.x == x && hit.y == y)[0];
        return hit ? hit.status : 'empty'
    }

    resolveClassEnemy (x,y)  {
        //if (!this.enemyHits.hits || this.props.enemyHits.length ==0) return 'empty'

        let ship = this.props.allShips ? this.props.allShips.filter((hit)=>hit[0] == x && hit[1] == y)[0] : undefined;
        let shipStatus = ship ? 'ship' : 'empty';

        let hit = this.props.enemyHits ? this.props.enemyHits.filter((hit)=>hit.x == x && hit.y == y)[0] : undefined;

        return hit ? hit.status : shipStatus
    }

  render() {
    if (this.props.winner) {
        //alert(`Winner is ${this.props.winner}`)
        const result =  this.props.playerName == this.props.winner ? "You are winner" : "You lost";
        return (<div>{result}</div>)
    }

      let enemyrows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClassEnemy(x, y);
                 return <td className={className} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClass(x, y);
                 return <td className={className} onClick={this.props.myTurn && this.props.startedGame ? 
                 this.props.click.bind(null, x, y, this.props.startedGame.game) : null} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      const board = this.state.showEnemy ?  
      <table disabled={!this.props.myTurn} ><tbody>{rows}</tbody></table> 
      : <table disabled={true} ><tbody>{enemyrows}</tbody></table> 

      
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

    return (
      <div className="App">

            <button className={!this.state.showEnemy ? 'bold' : null} 
            onClick={this.showMyBoard}>My Board</button>

            <button className={this.state.showEnemy ? 'bold' : null} 
            onClick={this.showEnemyBoard}>Enemy {this.props.enemyName}</button>

          {this.props.myTurn ? <span>My turn</span> : undefined}
          {board}
          <hr />
      </div>
    );
  }
}

export default Game;
