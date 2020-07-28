import React, { Component } from 'react';
import { connect } from 'react-redux';
// Router 
import { Link } from "react-router-dom";

class Aside extends Component {
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const profile_img = (this.props.user) ? `/media/${this.props.user.image}` : "url(/media/user.png)";;

        return (
            <div className='room_aside'>
                <div className='topbar'>
                    <Link to='/' className="logo">
                        <img src='/static/frontend/img/Taigon.png'></img>
                        <h1>Taigon</h1>
                    </Link>
                    <div className='profile'>
                        <Link to='/profile' className='porfile_image' style={{ backgroundImage: `url(${profile_img})` }}></Link>
                    </div>
                </div>
                <ul className='chat_nav'>
                    <li>
                        <Link to={`/chatroom/${currentRoom}`}>
                            <i className="nav_icon fas fa-comments"></i>
                            <p className='nav_text'>聊天室</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/chatroom/${currentRoom}/member`}>
                            <i className="nav_icon fas fa-users"></i>
                            <p className='nav_text'>聊天成員</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
                    user: state.auth.user,
        currentRoom: state.lobby.currentRoom,
        currentRoomId: state.lobby.currentRoomId
    }
}

export default connect(mapStateToProps)(Aside);