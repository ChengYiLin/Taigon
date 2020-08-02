import React, { Component } from 'react'
// Router 
import { Link } from "react-router-dom";

export default class Topbar extends Component {
    render() {
        return (
            <div className="top_bar">
                <Link className="Logo" to=''>
                    <img src='/static/frontend/img/Taigon.png'></img>
                    <h1>Taigon</h1>
                </Link>
            </div>
        )
    }
}
