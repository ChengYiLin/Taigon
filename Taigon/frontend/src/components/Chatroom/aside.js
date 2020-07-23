import React, { Component } from 'react';
import { connect } from 'react-redux';

class Aside extends Component {
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const profile_img = 'https://thispersondoesnotexist.com/image';

        return (
            <div className='room_aside'>
                <div className='topbar'>
                    <div className="logo">
                        <img src='/static/frontend/img/Taigon.png'></img>
                        <h1>Taigon</h1>
                    </div>
                    <div className='profile'>
                        <a className='porfile_image' style={{ backgroundImage: `url(${profile_img})` }}></a>
                    </div>
                </div>
                <ul className='chat_nav'>
                    <li>
                        <i className="nav_icon fas fa-comments"></i>
                        <p className='nav_text'>{currentRoom}</p>
                    </li>
                    <li>
                        <i className="nav_icon fas fa-users"></i>
                        <p className='nav_text'>聊天成員</p>
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