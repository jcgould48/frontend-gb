import React, { Component } from 'react'
import './Home.css'

export default class Home extends Component {
    render() {
        return (
            <>
            <h1>Welcome to Git Buzzed</h1>
            
            <section>
                <h2>Have a cold one</h2>
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
