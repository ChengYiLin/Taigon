import React, { Component } from 'react'

export default class Signin_content extends Component {
    render() {
        return (
            <div className="sigin_content">
                <div className="main_content">
                    <h2>Login to Your Account</h2>
                    <p>Login using social networks</p>
                    <div className="social_networks">
                        <a className="social_login_btn fb">FaceBook</a>
                        <a className="social_login_btn google">Google</a>
                    </div>
                    <div className="spread_line">
                        <div className="line"><hr></hr></div>
                        <p className="text">or</p>
                        <div className="line"><hr></hr></div>
                    </div>
                    <form className="signin_form">
                        <div className="form_group">
                            <input type="email" id="userEmail" name="email" placeholder="Enter user email" required></input>
                        </div>
                        <div className="form_group">
                            <input type="password" id="userPwd" name="password" placeholder="Enter user password" required></input>
                        </div>
                        <div className="form_group">
                            <button type="submit" className="submitBtn signIn">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
