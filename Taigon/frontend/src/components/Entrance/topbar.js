import React, { Component } from 'react'

export default class Topbar extends Component {
    render() {
        return (
            <div className="top_bar">
                <div className="Logo">
                    <img src='/static/frontend/img/Taigon.png'></img>
                    <h1>Taigon</h1>
                </div>
            </div>
        )
    }
}
