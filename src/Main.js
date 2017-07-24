import React, { Component } from 'react';
import './App.css';
import {DotInArray, AllDotIn} from './tools'

class Main extends Component {

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

            if (DotInArray([x,y],this.props.data.hits) && DotInArray([x,y],this.allShips)) {
                for (var s = 0 ; s < this.props.data.ships.layout.length; s++){
                    var ship = this.props.data.ships.layout[s].positions;
                    if (AllDotIn(ship, this.props.data.hits)){
                        if (DotInArray([x,y], ship)){
                            return 'killed'
                        }
                    }
                }

             return 'hit'

        }
        else if (DotInArray([x,y],this.props.data.hits))
            return 'tried'
        else {
            return 'empty'
        }
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
                 return <td className={className} onClick={this.props.click.bind(null, x, y)} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      var board = <table ><tbody>{rows}</tbody></table>

    return (
      <div className="App">
          {board}
          <hr />
      </div>
    );
  }
}

export default Main;
