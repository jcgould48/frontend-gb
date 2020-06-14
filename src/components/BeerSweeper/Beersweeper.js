import React, { Component } from 'react'
import Board from "./Board/Board"
import BoardHead from "./BoardHead/BoardHead"
import {Context} from '../Context/Context'

import "./Beersweeper.css"
// import ButtonGroup from "../shared/ButtonGroup"

class Minesweeper extends Component {

  static contextType = Context;
  constructor (){
    super()
 
  this.state = {
    status: "waiting",
    rows: 10,
    columns: 10,
    beers: 10,
    openCells: 0,
    score: {
      wins:0,
      losses:0,
    }
  }
  this.baseState = this.state
}

componentDidUpdate(nextProps, nextState){
  if(this.state.status === "running"){
    this.checkForWinner();
  }

}

checkForWinner = ()=>{
  if(this.state.beers +this.state.openCells >= this.state.rows *this.state.columns){
    this.setState({
      status: "winner"
    }, alert("You won!"))
  }
}


handleP1WinClick= ()=>{
  let userID = this.context.isAuth.user._id
 let currentScore = this.context.formSetting.wins
  let newScore = this.state.score.wins +1
  this.setState({
    score: {
      wins:newScore,
      losses: this.state.score.losses
    }
  });

  let total= {
    wins:newScore,
    losses: this.state.score.losses
  }
  this.context.handleP1Winner(userID,total)
}


handleP2WinClick= ()=>{
  let userID = this.context.isAuth.user._id
  
  let newScore = this.state.score.losses +1

  this.setState({
    score: {
      wins:this.state.score.wins,
      losses: newScore
    }
  });
  let total= {
    wins:this.state.score.wins,
    losses: newScore
  }
  this.context.handleP1Winner(userID,total)
}

componentDidMount(){
  this.intervals = [];
  this.setState({
    score:{
        wins: this.context.formSetting.wins,
        losses: this.context.formSetting.losses,
    }
})
}

  // handleTimer = () => {
  //   if(this.state.openCells > 0 && this.state.status === "running"){
  //     let time = this.state.time + 1;
  //     this.setState({time})
  //   }
  // }

  setInterval= (fn, t) => {
    this.intervals.push(setInterval(fn, t))
  };

  handleReset=()=>{
    this.intervals.map(clearInterval);
    console.log("RESET")
    this.setState(Object.assign({}, this.baseState)
    , ()=>{
      this.intervals=[];
    }
    )
  }

 
  handleCellClick = () =>{
    if(this.state.openCells === 0 && this.state.status !== "running"){
      this.setState({
        status:"running"
      }
    
      )
    }
    this.setState(prevState=>{
      return {openCells: prevState.openCells + 1}
    })
  }

  endGame = ()=> {
    this.setState({
      status: "ended"
    })
  }
  
  render() {
    return (
      <div className="minesweeper">
        <div className="winners">
          <div className="player">
          <img 
          onClick={this.handleP1WinClick} 
          style={{width:"80px"}} 
          src="/images/chip.png"></img>
          <div>Player one wins</div>
          </div>
          <div className="player">
          <img 
          onClick={this.handleP2WinClick} 
          style={{width:"80px"}} 
          src="/images/chip.png"></img>
          <div>Player two wins</div>
          </div>
        </div>
    
        <div className="whole-board">
        <BoardHead  
        handleReset={this.handleReset}
        status={this.state.status}
        />
        <Board  
        rows={this.state.rows} 
        columns={this.state.columns} 
        beers={this.state.beers} 
        openCells={this.state.openCells}
        endGame={this.endGame}
        status={this.state.status}
        onCellClick={this.handleCellClick}
        
        />
        </div>
      </div>
    )
  }
}

export default Minesweeper;