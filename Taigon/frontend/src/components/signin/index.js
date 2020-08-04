import React from 'react';
import { connect } from 'react-redux';
// actions
import { login } from '../../actions/account';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSignIn = this.props.toggleSignIn;
        this.toggleSignUp = this.props.toggleSignUp;
        this.closeAll = this.props.closeAll;
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGosignup = this.handleGosignup.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className='entrance_container' onClick={this.handleClickOutside}>
                <div className='entrance_box'>
                    <div className='close_btn' style={{ backgroundImage: 'url("/static/img/close.png")' }} onClick={() => this.closeAll()}></div>
                    <form className='box_container' onSubmit={this.handleSubmit}>
                        <p className='title'>Sign In</p>
                        <div className='main'>
                            <div className='form_group'>
                                <div className='entrance_input'>
                                    <div className='input_icon' style={{ backgroundImage: 'url("/static/img/user.png")' }}></div>
                                    <input id='username' className='input_text' type='text' placeholder='username' onChange={this.handleChange}></input>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div className='entrance_input'>
                                    <div className='input_icon' style={{ backgroundImage: 'url("/static/img/lock.png")' }}></div>
                                    <input id='password' className='input_text' type='password' placeholder='password' onChange={this.handleChange}></input>
                                </div>
                            </div>
                        </div>
                        <div className='footer'>
                            <input type="submit" className='entrance_submit signin' value="Sign In" onClick={this.handleSubmit} />
                            <p className="small_text">don't have an account？<a id='goSignUp' onClick={this.handleGosignup}>Sign Up</a></p>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleGosignup(e) {
        e.preventDefault();
        this.toggleSignIn();
        this.toggleSignUp();
    }
    handleClickOutside(e) {
        e.preventDefault();
        if (e.target.className === 'entrance_container') { this.closeAll(); }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username === '') { alert('username not input') }
        else if (this.state.password === '') { alert('password not input') }
        
        this.props.login(this.state.username, this.state.password)
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, { login })(SignIn);