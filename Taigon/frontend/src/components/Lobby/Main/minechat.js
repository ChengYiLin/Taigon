import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserOwnChatroom, getNowRoom } from '../../../actions/lobby';
// Router 
import { Link } from "react-router-dom";

class MineChat extends Component {
    componentDidMount() {
        const userId = this.props.user.id
        this.props.getUserOwnChatroom(userId);
    }
    render() {
        let roomlist = (!this.props.mineChatrooms) ? [] : this.props.mineChatrooms.map(element => {
            let room_id = element.id
            let room_Name = element.roomname;
            let room_Category = element.category;
            let room_BackgroundImage = 'media/' + element.bgimage;

            return (
                <Link key={room_id} className='room' to={`/chatroom/${room_Name}`} onClick={() => { this.props.getNowRoom(room_Name, room_id) }}>
                    <div className='image_box' >
                        <div className='room_background' style={{ backgroundImage: `url(${room_BackgroundImage})` }}></div>
                    </div>
                    <div className='name_box'>
                        <p className='room_category'>{room_Category}</p>
                        <p className='room_name'>{room_Name}</p>
                    </div>
                </Link>
            )
        })

        return (
            <main>
                <div className='mine_chatroom'>
                    <h2 className='title'>我的聊天</h2>
                    <div className='all_room'>
                        {roomlist}
                    </div>
                </div>
            </main>
        )
    }
}


const mapStateToProps = state => ({
    user: state.auth.user,
    mineChatrooms: state.lobby.mineChatrooms,
})

export default connect(mapStateToProps, { getUserOwnChatroom, getNowRoom })(MineChat);