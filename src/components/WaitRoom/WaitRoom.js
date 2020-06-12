import React, { Component } from 'react'
import {Context} from '../Context/Context'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import ButtonGroup from "../shared/ButtonGroup"
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
        },
      }
       

    handlePopulateScore =  async (req, res) => {
      try{
        let userID = this.context.isAuth.user._id
        let results = await getScores(userID)
        this.setState({
          wins: results.wins
        });
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
                <div>
                    <h2>Player 1: {this.context.isAuth.user.username}</h2>
                    <h1>{this.state.wins}</h1>
                    <ButtonGroup
                    buttonStyle="form-button"
                    title="Retrieve User Score"
                    onClick={this.handlePopulateScore}
                    />
                    <h2>Player 2: Guest</h2>
                </div>
                <div className="cards-container">
                    <div className="game-cards" >
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/images/tictactoe.jpg" alt=".." />
                        <Card.Body>
                            <Card.Title>Tic Tac Toe</Card.Title>
                            <Card.Text>
                            It's simple...you lose, you drink.
                            </Card.Text>
                            <NavLink
                                to="/tictactoe"
                                className="minesweeper"
                                activeStyle={{ fontWeight: "bold" }}
                                activeClassName="selected"
                                
                            >
                                {/* {this.props.username} */}
                                Tic Tac Toe
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
                            It's like minesweeper, but you drink.
                            </Card.Text>
                             <NavLink
                                to="/beersweeper"
                                className="beersweeper"
                                activeStyle={{ fontWeight: "bold" }}
                                activeClassName="selected"
                            >
                                Play!
                            </NavLink>
                        </Card.Body>
                        </Card>
                    </div>
                    <div className="game-cards">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="/images/pictionary.jpeg" alt=".." />
                        <Card.Body>
                            <Card.Title>Pictionary</Card.Title>
                            <Card.Text>
                            Drink and draw.  **Coming Soon**
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
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
                        <div className="centered">TEST</div>
                    </div>
                    <div className="game-cards">
                        <img className="blue-card" src="/images/blue-card.jpg" alt=".."/>
                    </div>
                    <div className="game-cards">
                        <img className="blue-card" src="/images/blue-card.jpg" alt=".."/>
                    </div>
                </div>
            </div>
        )
    }
}

