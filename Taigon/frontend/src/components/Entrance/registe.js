import React from 'react';

class Registe extends React.Component{
    constructor(props){
        super(props);
        this.toSignIn = this.props.toSignIn;
        this.state={
            userName : '',
            userEmail : '',
        }
    }
    render(){
        return(
            <form className="registeForm">
                <p className="title">WeleCome</p>
                <div className="form_group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="userName" name="name" placeholder="Enter your name" required></input>
                </div>
                <div className="form_group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="userEmail" name="email" placeholder="Enter your email" required></input>
                </div>
                <div className="form_group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="userPwd" name="password" placeholder="Enter your password" required></input>
                </div>
                <div className="form_group">
                    <label htmlFor="ckPassword">Password (check)</label>
                    <input type="password" id="ckUserPwd" name="ckPassword" placeholder="Check your password again" required></input>
                </div>
                <div className="form_group">
                    <button type="submit" className="submitBtn registe" onClick={this.toSignIn.bind(this)}>Registe Now</button>
                </div>
            </form>
        )
    }
}

export { Registe }