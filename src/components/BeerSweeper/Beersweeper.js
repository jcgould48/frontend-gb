import React, { Component } from 'react'
import Board from "./Board/Board"
import BoardHead from "./BoardHead/BoardHead"
import "./Beersweeper.css"

class Minesweeper extends Component {
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