import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
// Router 
import { Redirect } from "react-router-dom";

class Signin_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    render() {
        if(this.props.isAuthenticated){
            return (
                <Redirect push to="/" />
            )
        }
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
                    <form className="signin_form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form_group">
                            <input type="text" id="userName" name="username" placeholder="Enter user name" required
                                value={this.state.username} onChange={this.handleTextChange.bind(this)}
                            ></input>
                        </div>
                        <div className="form_group">
                            <input type="password" id="userPwd" name="password" placeholder="Enter user password" required
                                value={this.state.password} onChange={this.handleTextChange.bind(this)}
                            ></input>
                        </div>
                        <div className="form_group">
                            <button type="submit" className="submitBtn">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Signin_content);