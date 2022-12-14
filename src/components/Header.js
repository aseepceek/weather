import React, { Component } from 'react'
import Nav from './Nav'
import HeaderBG from "../img/BG.png"

export default class Header extends Component {
    render() {
        return (
            <div>
                <header className='header'>
                    <Nav />
                    <div className='header-div'>
                        <img className='header-img' src={HeaderBG} alt="Header Bg"/>
                        <div className='container'>
                            <h1 className='header-h1'>Be aware, <br />
                            Manage well.</h1>
                        <p className='header-title'>Everyone experiences stress in different ways.
                            Let Alivio guide you, in a personalized journal experience, to overcome your stress.</p>
                        <button className='header-btn'>Find Your Way</button>
                        </div>
                    </div>
                </header>
                
            </div>
        )
    }
}
