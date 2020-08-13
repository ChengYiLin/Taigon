import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getChatRoom,
    getNowRoom,
    checkRoomMember,
    getChatroomCategories,
    getChatRoomByCategory
} from '../../../actions/lobby';
// Router 
import { Link } from "react-router-dom";


class Hotcategory extends Component {
    componentDidMount() {
        this.props.getChatRoom();
        this.props.getChatroomCategories();
    }
    render() {
        let roomlist = (!this.props.chatroomList) ? [] : this.props.chatroomList.map(element => {
            let room_id = element.id
            let room_Name = element.roomname;
            let room_Category = element.category;
            let room_BackgroundImage = 'media/' + element.bgimage;

            return (
                <Link key={room_id} className='room' to={`/chatroom/${room_Name}`} onClick={() => {
                    this.props.getNowRoom(room_Name, room_id);
                    this.props.checkRoomMember(this.props.user.id, room_id);
                }}>
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

        let categorylist = (!this.props.categories) ? [] : this.props.categories.map(element => {
            let category_id = element.id;
            let category_value = element.value;

            return (
                <a key={category_id} id={category_id} className='category'
                    style={{ background: `${this.setCategoryColor(category_value)}` }}
                    onClick={()=>{this.handleClickCategory(category_id)}}
                >
                    {this.setCategoryIcon(category_value)}{category_value}
                </a>
            )
        })

        return (
            <main>
                <div className='hot_category'>
                    <h2 className='title'>熱門話題</h2>
                    <div className='categories'>
                        {categorylist}
                    </div>
                    <div className='all_room'>
                        {roomlist}
                    </div>
                </div>
            </main>
        )
    }
    handleClickCategory(category_id){
        console.log('click')
        this.props.getChatRoomByCategory(category_id);
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
    setCategoryIcon(room_Category) {
        switch (room_Category) {
            case '興趣':
                return <i className="fas fa-coffee"></i>;
            case '科技':
                return <i className="fas fa-microchip"></i>;
            case '寵物':
                return <i className="fas fa-paw"></i>;
            case '運動':
                return <i className="fas fa-dumbbell"></i>;
            case '旅遊':
                return <i className="fas fa-paw"></i>;
            case '學習':
                return <i className="fas fa-chalkboard-teacher"></i>;
            case '娛樂':
                return <i className="fas fa-ghost"></i>;
            case '美食':
                return <i className="fas fa-utensils"></i>;
            default:
                return <i className="fas fa-paw"></i>;
        }
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    chatroomList: state.lobby.chatroomList,
    categories: state.lobby.categories
})

export default connect(mapStateToProps, { getChatRoom, getNowRoom, checkRoomMember, getChatroomCategories, getChatRoomByCategory })(Hotcategory);