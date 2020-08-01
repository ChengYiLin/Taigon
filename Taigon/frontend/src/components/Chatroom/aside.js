import React, { Component } from 'react';
import { connect } from 'react-redux';
// action
import { getRoomImage } from '../../actions/chatroom';
// Router 
import { Link } from "react-router-dom";

const HOST = window.location.origin

class Aside extends Component {
    componentWillMount() {
        this.props.getRoomImage(this.props.currentRoomId)
    }
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const profile_img = (this.props.user) ? `/media/${this.props.user.image}` : "url(/media/user.png)";;
        const room_img = (this.props.roomInform) ? HOST + '/media/' + (this.props.roomInform.bgimage) : '';

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
                        <Link to={`/chatroom/${currentRoom}`} className='roomLink'>
                            <p className='nav_text'>{currentRoom}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/chatroom/${currentRoom}/member`}>
                            <i className="nav_icon fas fa-users"></i>
                            <p className='nav_text'>聊天成員</p>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/`}>
                            <i className="nav_icon fas fa-door-open"></i>
                            <p className='nav_text'>返回大廳</p>
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
        currentRoomId: state.lobby.currentRoomId,
        roomInform: state.chatroom.roomInform
    }
}

export default connect(mapStateToProps, { getRoomImage })(Aside);