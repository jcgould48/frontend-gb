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
      player1:0,
      player2:0,
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

handleWinClick= ()=>{
  let userID = this.context.isAuth.user._id
  
  console.log("000", this.state.score.player1)
  let newScore = this.state.score.player1 +1
  this.setState({
    score: {
      player1:newScore}
  });
  console.log("111", newScore)
  console.log("222", this.state.score.player1)
  console.log(this.context)
  this.context.handleP1Winner(userID,newScore)
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
                    title="Winner"
                    onClick={this.handleWinClick}
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