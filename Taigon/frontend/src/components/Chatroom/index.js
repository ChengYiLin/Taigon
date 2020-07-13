import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Topbar from './topbar';
import Main from './main';
// Router 
import { Redirect } from "react-router-dom";

class ChatRoom extends Component {
    render() {
        if (this.props.isAuthenticated === false) { return <Redirect push to="/signin" /> }

        return (
            <div className='Chatroom_wrapper'>
                <Topbar />
                <Main />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(ChatRoom);