import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Aside from './aside';
import Chatbox from './chatbox';
// action
import { leaveChatRoom } from '../../actions/lobby'
import { getRoomMessages, sendNewMessage } from '../../actions/chatroom';
// Router 
import { Link } from "react-router-dom";
// Wensocket 
import ReconnectingWebSocket from 'reconnecting-websocket';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
    }
    componentDidMount() {
        this.props.getRoomMessages(this.props.currentRoomId);
        // WebSocket
        const path = `ws://${window.location.host}/ws/chat/${this.props.currentRoomId}/`;
        this.chatSocket = new ReconnectingWebSocket(path);
        // When open the chatroom
        this.chatSocket.onopen = (e) => {
            console.log('Websocket Open');
        }
        // When receive the msgs from backend
        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.props.getRoomMessages(this.props.currentRoomId);
            console.log(data);
        };
        // When get the Unexpected Error
        this.chatSocket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        };
    }
    componentWillUnmount(){
        // When leave the chatroom
        this.chatSocket.onclose = function (e) {
            console.log('Chat socket closed unexpectedly');
        };
    }
    render() {
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
                <Aside />

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
                            <button type="submit" className="submitBtn" onClick={this.websocketSubmitMessage.bind(this)}>
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
    websocketSubmitMessage(e) {
        e.preventDefault();

        this.chatSocket.send(JSON.stringify({
            'type': 'text',
            'author':this.props.user.id,
            'chatroom': this.props.currentRoomId,
            'textmessage': this.state.message
        }));

        this.setState({ message: '' })
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        past_message: state.chatroom.message,
        currentRoom: state.lobby.currentRoom,
        currentRoomId: state.lobby.currentRoomId
    }
}

export default connect(mapStateToProps, { getRoomMessages, sendNewMessage, leaveChatRoom })(ChatRoom);