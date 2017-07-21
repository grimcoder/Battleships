import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var Tools = {


    DotInArray:   function  (item, arr) {
        for (var i = 0; i < arr.length; i++){

            if (arr[i][0] == item[0] && arr[i][1] == item[1])
            {
                return true;
            }

        }

        return false;

    },

    AllDotIn : function  (arr, arr2){
        var result = arr.filter((i)=>{
            if (this.DotInArray(i, arr2))
            {
                return true;
            }
            else return false;
        }).length ;

        return result== arr.length;;

    }
}

class App extends Component {

    allShips = []

    constructor(props){

        super(props)

        this.resolveClass = this.resolveClass.bind(this);
        this.cellClicked = this.cellClicked.bind(this);
        this.calculateResult = this.calculateResult.bind(this);

        this.state = {
            ships: {
                "shipTypes": {
                    "carrier": { "size": 5, "count": 1 },
                    "battleship": { "size": 4, "count": 1 },
                    "cruiser": { "size": 3, "count": 1 },
                    "submarine": { "size": 3, "count": 1 },
                    "destroyer": { "size": 2, "count": 1 },
                },
                "layout": [

                    { "ship": "carrier", "positions": [[2,9], [3,9], [4,9], [5,9], [6,9]] },
                    { "ship": "battleship", "positions": [[5,2], [5,3], [5,4], [5,5]] },
                    { "ship": "cruiser", "positions": [[8,1], [8,2], [8,3]] },
                    { "ship": "submarine", "positions": [[3,0], [3,1], [3,2]] },
                    { "ship": "destroyer", "positions": [[0,0], [1,0]] }
                ]
            },
            hits: []
        }

        this.state.ships.layout.map((p)=>{
            p.positions.map((m)=>{
                this.allShips.push(m);
            })
        })
    }

    resolveClass (x,y)  {

            if (Tools.DotInArray([x,y],this.state.hits) && Tools.DotInArray([x,y],this.allShips)) {

                for (var s = 0 ; s < this.state.ships.layout.length; s++){
                    var ship = this.state.ships.layout[s].positions;
                    if (Tools.AllDotIn(ship, this.state.hits)){

                        if (Tools.DotInArray([x,y], ship)){
                            return 'killed'
                        }

                    }

                }

             return 'hit'

        }
        else if (Tools.DotInArray([x,y],this.state.hits))
            return 'tried'
        else {
            return 'empty'
        }
    }

    calculateResult(){
        if (Tools.AllDotIn(this.allShips, this.state.hits)) alert('you won')
    }

    cellClicked(x, y){
        if (!Tools.DotInArray([x,y], this.state.hits)){
            this.state.hits.push([x,y]);

            this.setState({hits: this.state.hits})
            this.calculateResult();
        }
        else return;
    }

  render() {
      let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClass(x, y);
                 return <td className={className} onClick={this.cellClicked.bind(this, x, y)} key={x + '_' + y }></td>
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

export default App;
