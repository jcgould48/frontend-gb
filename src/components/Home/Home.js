import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <>
            <br></br>
            <h1 className="title" style={{fontFamily:"fantasy"}}>Welcome to Git Buzzed</h1>
            
                <h2 className="title" style={{fontFamily:"fantasy"}}>Have a cold one</h2>
                <br></br>
                <img src="/images/deck.png"></img>
            <section>
                <div className="mug">
                    <div className="handle"></div>
                    <div className="beer"></div>
                    <div className="overflow"></div>
                </div>
                <div className=""></div>
            </section>
            </>
        )
    }
}
