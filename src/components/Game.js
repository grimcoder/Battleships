
import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import boom from '../sounds/boom.wav'
import hit from '../sounds/hit.wav'
import killed from '../sounds/killed.wav'
import lost from '../sounds/lost.wav'
import tried from '../sounds/tried.wav'
import won from '../sounds/won.wav'
import {DotInArray, AllDotIn} from './../tools'
import Board from './Board'

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

    resolveClass (x,y, hits = this.props.hits)  {
        if (!hits || hits.length ==0) return 'empty'
        let hit = hits.filter((hit)=>hit.x == x && hit.y == y)[0];
        return hit ? hit.status : 'empty'
    }

    resolveClassEnemy (x,y)  {
        //if (!this.enemyHits.hits || this.props.enemyHits.length ==0) return 'empty'
        let ship = this.props.allShips ? this.props.allShips.filter((hit)=>hit[0] == x && hit[1] == y)[0] : undefined;
        let shipStatus = ship ? 'ship' : 'empty';
        let hit = this.props.enemyHits ? this.props.enemyHits.filter((hit)=>hit.x == x && hit.y == y)[0] : undefined;
        return hit ? hit.status : shipStatus
    }

    boomSoundplay(audio){
        this[audio].play();
    }

    componentWillReceiveProps (nextProps) {
            for(let x = 0; x < 10; x++){
                for (let y = 0; y < 10; y++){
                    let newValue =this.resolveClass(x, y, nextProps.hits); 
                    let oldValue =this.resolveClass(x, y, this.props.hits);
                    if (newValue != oldValue) {
                        this.boomSoundplay(newValue);
                    }
                }
                let newValue =nextProps.winner; 
                let oldValue =this.props.winner;

                if (newValue != oldValue) {
                    let playEnd = newValue == this.props.playerId ? 'win' : 'lost';
                    this.boomSoundplay(playEnd);
                }
            }
    }


  render() {
    var sounds = 
    <div>
        <audio src={hit} ref={(hit)=>{this.hit = hit;}}/>
        <audio src={killed} ref={(killed)=>{this.killed = killed;}}/>
        <audio src={lost} ref={(lost)=>{this.lost = lost;}}/>
        <audio src={tried} ref={(tried)=>{this.tried = tried;}}/>
        <audio src={won} ref={(won)=>{this.won = won;}}/>
    </div>

if (this.props.winner) {
        //alert(`Winner is ${this.props.winner}`)
        const result =  this.props.playerName == this.props.winner ? "You are winner" : "You lost";
        return (<div>{sounds}{result}</div>)
    }

    //   let enemyrows =  Array.apply(null,  Array(10)).map((i,y)=>{
    //       let cells =  Array.apply(null,Array(10)).map((l,x)=>{
    //           var className = this.resolveClassEnemy(x, y);
    //              return <td className={className} key={x + '_' + y }></td>
    //       });
    //       return <tr  key={y}>{cells}</tr>
    //   });

      let rows =  Array.apply(null,  Array(10)).map((i,y)=>{
          let cells =  Array.apply(null,Array(10)).map((l,x)=>{
              var className = this.resolveClass(x, y);
                 return <td className={className} onClick={this.props.myTurn && this.props.startedGame ? 
                 this.props.click.bind(null, x, y, this.props.startedGame.game) : null} key={x + '_' + y }></td>
          });
          return <tr  key={y}>{cells}</tr>
      });

      const boardEnemy =  <table disabled={!this.props.myTurn} ><tbody>{rows}</tbody></table>
    //   const boardMy = <table disabled={true} ><tbody>{enemyrows}</tbody></table> 
      const availGames = this.props.availableGames ? this.props.availableGames.initGames : []

    return (
      <div className="App">
        {sounds}


          <div className='pull-left  col-sm-12 col-md-6  col-lg-6 container'>
              {this.props.myTurn ? <span>My turn</span> : <span>Wait!!!</span>}
              Enemy  
            {boardEnemy}
          </div>

          <div className='pull-left  col-sm-12 col-md-6  col-lg-6 container'>My board
            {/* {boardMy} */}
            <Board  isMy='true' {...this.props}  /> 
          </div>

      </div>
    );
  }
}

export default Game;
