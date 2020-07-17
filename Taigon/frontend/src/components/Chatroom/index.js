import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Chatbox from './chatbox';
// action
import { leaveChatRoom } from '../../actions/lobby'
import { getRoomMessages, sendNewMessage } from '../../actions/chatroom';
// Router 
import { Redirect, Link } from "react-router-dom";

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
        }
    }
    componentDidMount() {
        this.props.getRoomMessages(this.props.currentRoomId);
    }
    render() {
        if (this.props.isAuthenticated === false) { return <Redirect push to="/signin" /> }

        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const profile_img = 'https://thispersondoesnotexist.com/image';

        // Message
        let Messages = (!this.props.past_message) ? ([]) : (
            this.props.past_message.data.map(element => (
                <Chatbox key={element.id} profile_img={profile_img} author_name={element.author} timestamp={element.time} textcontent={element.text} />
            ))
        )

        return (
            <div className='Chatroom_wrapper'>
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
                            <p className='nav_text'>聊天室友</p>
                        </li>
                    </ul>
                </div>

                <div className='chat_content'>
                    {/* Chat Header */}
                    <div className='header'>
                        <p className='room_name'>{currentRoom}</p>
                        <Link className='leave_room' to='/' onClick={this.props.leaveChatRoom}></Link>
                    </div>
                    {/* Chat Main */}
                    <div className='main'>
                        <div className='overflow_container'>
                            {Messages}
                        </div>
                    </div>
                    {/* Chat Footer */}
                    <div className='footer'>
                        <form className='message_form'>
                            <input type="text" id="message" name="message" placeholder={`Messagge to ${currentRoom}`} required
                                value={this.state.message} onChange={this.handleChange.bind(this)}
                            ></input>
                            <button type="submit" className="submitBtn" onClick={this.submitMessage.bind(this)}>
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    submitMessage(e) {
        e.preventDefault();
        const author = this.props.user.id;
        const currentRoomId = this.props.currentRoomId;

        this.props.sendNewMessage(author, currentRoomId, this.state.message);
        this.setState({message:''})
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        past_message: state.chatroom.message,
        currentRoom: state.lobby.currentRoom,
        currentRoomId: state.lobby.currentRoomId
    }
}

export default connect(mapStateToProps, { getRoomMessages, sendNewMessage, leaveChatRoom })(ChatRoom);