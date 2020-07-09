import React, { Component } from 'react';
import { connect } from 'react-redux';

class Topbar extends Component {
    render() {
        let username = (this.props.user) ? (this.props.user.username) : '';

        return (
            <div className='topbar'>
                <div className="logo">
                    <img className='logo_image' src='/static/frontend/img/Taigon_sm.png'></img>
                    <h1 className='logo_text'>Taigon</h1>
                </div>
                <div className="user">
                    <p className='username'>{username}</p>
                    <a className='profile_img'></a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Topbar);