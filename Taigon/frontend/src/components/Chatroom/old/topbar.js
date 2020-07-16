import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInform: false
        }
    }
    render() {
        let username = (this.props.user) ? (this.props.user.username) : '';
        let email = (this.props.user) ? (this.props.user.email) : '';
        return (
            <div className='topbar'>
                <div className="logo">
                    <img className='logo_image' src='/static/frontend/img/Taigon_sm.png'></img>
                    <h1 className='logo_text'>Taigon</h1>
                </div>
                <div className="user">
                    <a className='profile_img' onClick={this.showInform.bind(this)}></a>
                    <div className={(this.state.showInform)?'profile_inform active':'profile_inform'}>
                        <div className='inform'>
                            <a className='profile_img'></a>
                            <p className='username'>{username}</p>
                            <p className='email'>{email}</p>
                        </div>
                        <div className='sign_out'>
                            <a className='signout_Btn' onClick={this.props.logout.bind(this)}>Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    showInform() {
        this.setState(currentState => ({ showInform: !currentState.showInform }))
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { logout })(Topbar);