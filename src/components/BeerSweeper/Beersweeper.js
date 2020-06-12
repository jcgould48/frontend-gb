import React, { Component } from 'react'
import Board from "./Board/Board"
import BoardHead from "./BoardHead/BoardHead"
import {Context} from '../Context/Context'

import "./Beersweeper.css"
import ButtonGroup from "../shared/ButtonGroup"

class Minesweeper extends Component {

  static contextType = Context;
  constructor (){
    super()
 
  this.state = {
    status: "waiting",
    rows: 10,
    columns: 10,
    // flagCount: 10,
    beers: 10,
    // time: 0,
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
  
  console.log("000", this.state.score.wins)
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
  console.log("111", newScore)
  console.log("222", this.state.score.wins)
  console.log(this.context)
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

  // changeFlagAmount = amount => {
  //   this.setState({flagCount : this.state.flagCount + amount})
  // }

  handleCellClick = () =>{
    if(this.state.openCells === 0 && this.state.status !== "running"){
      this.setState({
        status:"running"
      }
      // , ()=> {
      //   this.setInterval(this.handleTimer, 1000)
      // }
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
        <ButtonGroup
                    buttonStyle="form-button"
                    title="Player 1 Wins"
                    onClick={this.handleP1WinClick}
                    />
        <ButtonGroup
                    buttonStyle="form-button"
                    title="Player 2 Wins"
                    onClick={this.handleP2WinClick}
                    />
        <h2>Beer Sweeper</h2>
        <BoardHead 
        // time ={this.state.time} 
        // flagsUsed={this.state.flagCount} 
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
        // changeFlagAmount={this.changeFlagAmount}
        />
      </div>
    )
  }
}

export default Minesweeper;