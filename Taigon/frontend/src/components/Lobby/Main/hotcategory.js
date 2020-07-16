import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getChatRoom } from '../../../actions/lobby';
// Router 
import { Link } from "react-router-dom";


class Hotcategory extends Component {
    componentDidMount() {
        this.props.getChatRoom();
    }
    render() {
        let roomlist = (!this.props.chatroomList) ? [] : this.props.chatroomList.map(element => {
            let room_id = element.id
            let room_Name = element.roomname;
            let room_Category = element.category;
            let room_BackgroundImage = element.bgimage;

            return (
                <Link key={room_id} className='room' to={`/chatroom/${room_Name}`}>
                    <div className='room_background' style={{ backgroundImage: `url(${room_BackgroundImage})` }}></div>
                    <div className='name_box'>
                        <p className='room_category'>{room_Category}</p>
                        <p className='room_name'>{room_Name}</p>
                    </div>
                </Link>
            )
        })


        return (
            <main>
                <div className='hot_category'>
                    <h2 className='title'>熱門話題</h2>
                    <div className='all_room'>
                        {roomlist}
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    chatroomList: state.lobby.chatroomList
})

export default connect(mapStateToProps, { getChatRoom })(Hotcategory);