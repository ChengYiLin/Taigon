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
                        <p className='room_category' style={{ background: `${this.setCategoryColor(room_Category)}` }}>{room_Category}</p>
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
    setCategoryColor(room_Category) {
        switch (room_Category) {
            case '興趣':
                return 'rgb(255 184 93)';
            case '科技':
                return 'rgb(167 217 243)';
            case '寵物':
                return 'rgb(253 235 181)';
            case '運動':
                return 'rgb(90 255 242)';
            case '旅遊':
                return 'rgb(178, 238, 178)';
            case '學習':
                return 'rgb(216 172 155)';
            case '娛樂':
                return 'rgb(255 161 255)';
            case '美食':
                return 'rgb(255 168 191)';
            default:
                return '#b2eeb2';
        }
    }
}


const mapStateToProps = state => ({
    user: state.auth.user,
    mineChatrooms: state.lobby.mineChatrooms,
})

export default connect(mapStateToProps, { getUserOwnChatroom, getNowRoom })(MineChat);