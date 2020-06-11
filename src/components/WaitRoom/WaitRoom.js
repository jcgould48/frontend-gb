import React, { Component } from 'react'
// import {Context} from '../Context/Context'
import {ScoreContext} from '../Context/ScoreContext'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import ButtonGroup from "../shared/ButtonGroup"
import {updateScore} from "../Helpers/Api"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import minesweeper from '../../images/minesweeper.jpeg'
import tictactoe from '../../images/tictactoe.jpg'
import pictionary from '../../images/pictionary.jpeg'
import './WaitRoom.css'

 class WaitRoom extends Component {
    static contextType = ScoreContext;
    
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       formSetting: {
    //         wins,
    //         losses,
    //         owner
    //         }
    //     }
    // }

    handleWin = async (req, res) => {
        // e.preventDefault();
        // console.log("....", req.params.id)
        // console.log("....", context.owner.id)
        // console.log("....", o._id)
        // try {
        //   const {
        //     wins,
        //     losses
        //   } = this.state.formSetting;
    
        //   let scoreObj = {
        //     wins: wins.value,
        //     losses: losses.value,
        //   };
    
        //   let success = await updateScore(scoreObj);
    
        //   this.context.expenseDispatch({
        //     type: "UPDATE_SCORE",
        //     payload: success,
        //   });
    
        // } catch (e) {
        //   toast.error(e.message, {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // }
      };

    render() {
        const { scoreArray } = this.context;
        return (
            <div>
                <div>
                    <h2>Player 1:</h2>
                    <h1>{scoreArray.wins}</h1>
                    <ButtonGroup
                    buttonStyle="form-button"
                    title="BUTTON"
                    onClick={this.handleWin}
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

export default WaitRoom;