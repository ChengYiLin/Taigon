import React, { Component } from 'react';
// Router
import { Link } from "react-router-dom";

class To_signin extends Component {
    render() {
        return (
            <div className="To_signin">
                <div className="main_content">
                    <h2>One of us ?</h2>
                    <p>Just sign in<br></br>We've missed you!</p>
                    <Link to="/" className="goSignin">
                        Go SignIn
                    </Link>
                </div>
            </div>
        )
    }
}

export default To_signin;