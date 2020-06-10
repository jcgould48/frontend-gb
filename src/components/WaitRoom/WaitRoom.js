import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
import minesweeper from '../../images/minesweeper.jpeg'
import tictactoe from '../../images/tictactoe.jpg'
import pictionary from '../../images/pictionary.jpeg'
import './WaitRoom.css'

export default class WaitRoom extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>Player 1:</h2>
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
                            {/* <NavLink
                                to="/beersweeper"
                                className="minesweeper"
                                activeStyle={{ fontWeight: "bold" }}
                                activeClassName="selected"
                            >
                                {this.props.username}
                            </NavLink> */}
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
