import React, { Component } from 'react';
import './App.css';
import {DotInArray, AllDotIn} from './../tools'

class Game extends Component {

    allShips = []

    constructor(props){
        super(props)
        this.resolveClass = this.resolveClass.bind(this);
        this.calculateResult = this.calculateResult.bind(this);


        this.props.data.ships.layout.map((p)=>{
            p.positions.map((m)=>{
                this.allShips.push(m);
            })
        })

    }

    resolveClass (x,y)  {

        if (!this.props.hits || this.props.hits.length ==0) return 'empty'

        let hit = this.props.hits.filter((hit)=>hit.x == x && hit.y == y)[0];

        return hit ? hit.status : 'empty'


    }

    calculateResult(){
        if (AllDotIn(this.allShips, this.props.data.hits)) alert('you won')
    }



    componentDidUpdate(prevProps, prevState){
        this.calculateResult();
    }

  render() {
      let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClass(x, y);
                 return <td className={className} onClick={this.props.myTurn ? this.props.click.bind(null, x, y, this.props.startedGame.game) : null} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      const board = <table disabled={!this.props.myTurn} ><tbody>{rows}</tbody></table>
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []



    return (
      <div className="App">

          {this.props.myTurn ? <span>My turn</span> : undefined}
          {board}
          <hr />
      </div>
    );
  }
}

export default Game;
