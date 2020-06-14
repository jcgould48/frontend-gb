import React, { Component } from 'react'
import {Context} from '../Context/Context'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import ButtonGroup from "../shared/ButtonGroup"
import Footer from '../Footer/Footer'
import {getScores} from "../Helpers/Api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './WaitRoom.css'

export default class WaitRoom extends Component {
    // static contextType = ScoreContext;
    static contextType = Context;
        
    state = { 
    formSetting: {
      wins: 0,
      losses:0,
        },
      }
       

    handlePopulateScore =  async () => {
      try{
        let userID = this.context.isAuth.user._id
        let results = await getScores(userID)
        console.log("Poooooooooop",results.wins)
        this.setState({
          wins: results.wins,
          losses: results.losses
        });
        let scoreObj= {
            wins: this.state.wins,
            losses: this.state.losses
        }
        console.log("POOP", scoreObj)
       
       this.context.dispatch({
            type:"POPULATE_SCORE",
            payload: scoreObj
        })
      }catch (e) {
          toast.error(e.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      };

    render() {
        // const { scoreArray } = this.context;
        return (
            <div>
                <br></br>
                <div className="players">
                    <h2>Player 1: {this.context.isAuth.user.username}</h2>
                    <h2>Score: {this.state.wins}</h2>
                    <img onClick={this.handlePopulateScore} style={{width:"80px"}} src="/images/chip.png"></img>
                    {/* <ButtonGroup
                    buttonStyle="form-button"
                    title="Retrieve User Score"
                    onClick={this.handlePopulateScore}
                    /> */}
                    <h2>Player 2: Guest</h2>
                    <h2>Score: {this.state.losses}</h2>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="cards-container">
                    <div className="game-cards" >
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/images/tictactoe.jpg" alt=".." />
                        <Card.Body>
                            <Card.Title>Tic Tac Toe</Card.Title>
                            <Card.Text>
                            It's simple...<br></br>You lose, You drink.
                            </Card.Text>
                            <NavLink
                                to="/tictactoe"
                                className="minesweeper navlink"
                                activeStyle={{ fontWeight: "bold"}}
                                activeClassName="selected" 
                            >
                                {/* {this.props.username} */}
                                Play Now!
                            </NavLink>
                        </Card.Body>
                        </Card>
                    </div>
                    <div className="game-cards">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/images/minesweeper.jpeg" alt=".."/>
                        <Card.Body>
                            <Card.Title>BeerSweeper</Card.Title>
                            <Card.Text>
                            It's like minesweeper...<br></br> but you drink.
                            </Card.Text>
                             <NavLink
                                to="/beersweeper"
                                className="beersweeper navlink"
                                activeStyle={{ fontWeight: "bold" }}
                                activeClassName="selected"
                            >
                                Play Now!
                            </NavLink>
                        </Card.Body>
                        </Card>
                    </div>
                    <div className="game-cards">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" style={{height:"275px"}} src="/images/pictionary.jpeg" alt=".." />
                        <Card.Body>
                            <Card.Title>Drink-tionary</Card.Title>
                            <Card.Text>
                            Drink and draw. <br></br> **Coming Soon**
                            </Card.Text>
                            <Button disabled = "yes" variant="primary">Coming Soon</Button>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="cards-container">
                    <div className="game-cards">
                        <img  className="blue-card" src="/images/blue-card.jpg" alt=".."/>
                    </div>
                    <div className="game-cards">
                        <img className="blue-card" src="/images/blue-card.jpg" alt=".."/>
                    </div>
                    <div className="game-cards">
                        <img className="blue-card" src="/images/blue-card.jpg" alt=".."/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

