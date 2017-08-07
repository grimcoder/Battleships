
import React, { Component } from 'react';
import './App.css';

export  class Board extends Component {
    constructor(props){
        super(props)

    }
    
    cells = {
        ship: <svg width='30' height='28'><circle cx='15' cy='15' r='10' fill='aqua' strokeWidth='3' stroke='blue' /></svg>,
        hit: <svg width='30' height='28'><circle cx='15' cy='15' r='10' fill='red' strokeWidth='3' stroke='blue' /></svg>,
        empty: <svg width='30' height='28'><circle cx='15' cy='15' r='10' fill='white' strokeWidth='3' stroke='white' /></svg>,
        tried: <svg width='30' height='28'><circle cx='15' cy='15' r='10' fill='white' strokeWidth='3' stroke='aqua' /></svg>,
        killed: <svg width='30' height='28'><circle cx='15' cy='15' r='10' fill='black' strokeWidth='3' stroke='blue' /></svg>,
    }

    resolveClass (x,y, hits = this.props.hits)  {
        if (!hits || hits.length ==0) return 'empty'
        let hit = hits.filter((hit)=>hit.x == x && hit.y == y)[0];
        return hit ? hit.status : 'empty'
    }

    resolveClassEnemy (x,y)  {
        let ship = this.props.allShips ? this.props.allShips.filter((hit)=>hit[0] == x && hit[1] == y)[0] : undefined;
        let shipStatus = ship ? 'ship' : 'empty';
        let hit = this.props.enemyHits ? this.props.enemyHits.filter((hit)=>hit.x == x && hit.y == y)[0] : undefined;
        return hit ? hit.status : shipStatus
    }

    render(){
            let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
            let cells =  Array.apply(null,Array(10)).map((l,x)=>{
                var className = this.props.isMy ?  this.resolveClassEnemy(x, y) :this.resolveClass(x, y) ;
                    return <td onClick={this.props.myTurn && this.props.startedGame && !this.props.winner ? 
                    this.props.click.bind(null, x, y, this.props.startedGame.game) : null} key={x + '_' + y }>
                        {this.cells[className]}
                    </td>
            });
            return <tr  key={y}>{cells}</tr>
        });

              const boardEnemy =  <table disabled={!this.props.myTurn} ><tbody>{rows}</tbody></table>
              return (<div>
                  {boardEnemy}
                  
              </div>)
    }

}

export default Board;