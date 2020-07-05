import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.toRegiste = this.props.toRegiste;
    }
    render() {
        return (
            <form className="signinForm">
                <p className="title">Sign In Use</p>
                <div className="form_group">
                    <button className="temp_logIn">this is Google</button>
                </div>
                <div className="form_group">
                    <button className="temp_logIn">this is Facebook</button>
                </div>
                <div className="form_group">
                    <p className="divide_line">or</p>
                </div>
                <div className="form_group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="userEmail" name="email" placeholder="Enter user email" required></input>
                </div>
                <div className="form_group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="userPwd" name="password" placeholder="Enter user password" required></input>
                </div>
                <div className="form_group">
                    <a className="fogretPassword">Forget Password ?</a>
                </div>
                <div className="form_group">
                    <button type="submit" className="submitBtn signIn">SignIn</button>
                    <a className="goRegiste" onClick={this.toRegiste}>No account? Create Now</a>
                </div>
            </form>
        )
    }
}

export { SignIn }