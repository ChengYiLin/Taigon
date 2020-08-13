import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registe } from '../../actions/auth';
// Router 
import { Redirect } from "react-router-dom";

class Registe_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }
    render() {
        if(this.props.isAuthenticated){
            return (
                <Redirect push to="/lobby" />
            )
        }
        return (
            <div className="registe_content">
                <div className="main_content">
                    <h2>Create Free Account</h2>
                    {/* <p>Sign Up using social networks</p>
                    <div className="social_networks">
                        <a className="social_login_btn fb">FaceBook</a>
                        <a className="social_login_btn google">Google</a>
                    </div>
                    <div className="spread_line">
                        <div className="line"><hr></hr></div>
                        <p className="text">or</p>
                        <div className="line"><hr></hr></div>
                    </div> */}
                    <form className="registe_form" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form_group">
                            <input type="text" id="userName" name="username" placeholder="Enter user name" required
                                value={this.state.username} onChange={this.handleTextChange.bind(this)}
                            ></input>
                        </div>
                        <div className="form_group">
                            <input type="email" id="userEmail" name="email" placeholder="Enter user email" required
                                value={this.state.email} onChange={this.handleTextChange.bind(this)}
                            ></input>
                        </div>
                        <div className="form_group">
                            <input type="password" id="userPwd" name="password" placeholder="Enter user password" required
                                value={this.state.password} onChange={this.handleTextChange.bind(this)}
                            ></input>
                        </div>
                        <div className="form_group">
                            <button type="submit" className="registeBtn">Join Taigon</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.registe(this.state.username, this.state.email, this.state.password);
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { registe })(Registe_content);