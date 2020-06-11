import React, { Component } from 'react'
import {Context} from '../Context/Context'
// import {ScoreContext} from '../Context/ScoreContext'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import ButtonGroup from "../shared/ButtonGroup"
import {getScores} from "../Helpers/Api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import minesweeper from '../../images/minesweeper.jpeg'
import tictactoe from '../../images/tictactoe.jpg'
import pictionary from '../../images/pictionary.jpeg'
import './WaitRoom.css'

export default class WaitRoom extends Component {
    // static contextType = ScoreContext;
    static contextType = Context;
        
    state = { 
    formSetting: {
      wins: null,
        },
      }
       
    
    // componentDidMount(){
    //       let results = this.getUserScore() 

    //     console.log("is this the way?" ,results);
        
    // }

    getUserScore = async (req, res) =>{
        let userID = this.context.isAuth.user._id
        try{
          let results= await getScores(userID)
         

        } catch (e) {
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
                    <h2>Player 1:</h2>
                    <h1>{this.state.wins}</h1>
                    <ButtonGroup
                    buttonStyle="form-button"
                    title="Retrieve User Score"
                    onClick={this.handlePopulateScore}
                    />
                    <h2>Player 2:</h2>
                </div>
                <div className="cards-container">
                    <div className="game-cards" >
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={tictactoe} />
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
                        <Card.Img variant="top" src={minesweeper} />
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
                        <Card.Img variant="top" src={pictionary} />
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
            </div>
        )
    }
}

