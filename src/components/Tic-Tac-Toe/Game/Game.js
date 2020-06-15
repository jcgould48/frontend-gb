import React, { Component } from 'react'
import {calculateWinner} from '../Tic-Tac-Toe-Helpers/CalculateWinner'
import Board from '../Board/Board'
import {Context} from '../../Context/Context'

import '../Game/Game.css'

export default class Game extends Component {
    static contextType = Context;
    constructor(props){
        super(props);
        this.state={
            xIsNext:true,
            stepNumber:0,
            history:[
                {squares:Array(9).fill(null)}
            ],
            score: {
                wins:0,
                losses:0,
              }

        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2)===0
        })
    }
    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber +1)
        const current =history[history.length-1]
        const squares = current.squares.slice()
        const winner = calculateWinner(squares)
        if(winner || squares[i]) return 
        squares[i]=this.state.xIsNext?'X':'O'
        this.setState({
            history:history.concat({
                squares:squares
            }),
            xIsNext:!this.state.xIsNext,
            stepNumber:history.length
        })
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
        this.setState({
          score:{
              wins: this.context.formSetting.wins,
              losses: this.context.formSetting.losses,
          }
      })
      }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to #' + move : 'Start the Game';
            return (
                <li key={move}>
                    <button onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            )
        });
        let status;
        if (winner) {
            status = `Winner is ${winner} loser drink up `;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
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
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>

            </div>
        )
    }
}

