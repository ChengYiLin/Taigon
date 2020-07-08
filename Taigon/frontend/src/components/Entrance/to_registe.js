import React, { Component } from 'react';
// Router
import { Link } from "react-router-dom";

class To_registe extends Component {
    render() {
        return (
            <div className="To_registe">
                <div className="main_content">
                    <h2>New Here ?</h2>
                    <p>Be a Taigoner<br></br>Sign up and Join Us</p>
                    <Link to="/registe" className="goRegiste">
                        Registe Now
                    </Link>
                </div>
            </div>
        )
    }
}

export default To_registe;