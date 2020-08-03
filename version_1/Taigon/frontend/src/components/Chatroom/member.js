import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components

// action
import { getRoomMember } from '../../actions/chatroom';
// Router 
import { Link } from "react-router-dom";
import { element } from 'prop-types';

const HOST = window.location.origin;

class Member extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getRoomMember(this.props.currentRoomId);
    }
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';

        let Members = (!this.props.member) ? ([]) : (
            this.props.member.map(element => {
                let profileImg = HOST + '/media/' + element.image;

                return (
                    <div key={element.id} className='member_card'>
                        <div className='profileImg' style={{ backgroundImage: `url(${profileImg})` }}></div>
                        <div className='name'>
                            <p>{element.username}</p>
                        </div>
                    </div>
                )
            })
        )

        return (
            <div className='room_member'>
                <div className='header'>
                    <p className='room_name'>{currentRoom}</p>
                    <Link className='leave_room' to='/' onClick={this.props.leaveChatRoom}></Link>
                </div>
                <div className='member'>
                    <div className='member_overflow_container'>
                        {Members}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        currentRoom: state.lobby.currentRoom,
        currentRoomId: state.lobby.currentRoomId,
        member: state.chatroom.member
    }
}

export default connect(mapStateToProps, { getRoomMember })(Member);