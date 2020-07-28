import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Aside from './aside';
import Chatbox from './chatbox';
// action
import { leaveChatRoom } from '../../actions/lobby'
import { getRoomMessages, sendNewMessage } from '../../actions/chatroom';
// Router 
import { Link, Route } from "react-router-dom";
// Wensocket 
import ReconnectingWebSocket from 'reconnecting-websocket';
// Emogi
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            showEmoji: false
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
    componentWillUnmount() {
        // When leave the chatroom
        this.chatSocket.close = function (e) {
            console.log('Chat socket closed unexpectedly');
        };
    }
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const showEmoji = (this.state.showEmoji) ? 'emogi show' : 'emogi';

        // Message
        let Messages = (!this.props.past_message) ? ([]) : (
            this.props.past_message.data.map(element => (
                <Chatbox key={element.id} author_name={element.author} authorImage={element.author_Image} timestamp={element.time} textcontent={element.text} />
            ))
        )

        return (
            <div className='Chatroom_wrapper'>
                <Aside />

                {/* ChatRoom */}
                <Route exact path="/chatroom/:roomname" render={() => (
                    <div className='chat_content'>
                        <div className='header'>
                            <p className='room_name'>{currentRoom}</p>
                            <Link className='leave_room' to='/' onClick={this.props.leaveChatRoom}></Link>
                        </div>
                        <div className='main'>
                            <div className='overflow_container'>
                                {Messages}
                            </div>
                        </div>
                        <div className='footer'>
                            <form className='message_form' onSubmit={this.websocketSubmitMessage.bind(this)}>
                                <textarea id="message" name="message" placeholder={`Messagge to ${currentRoom}`} rows='2'
                                    value={this.state.message} onChange={this.handleTextChange.bind(this)} onKeyPress={this.handleUserKeyPress.bind(this)}
                                ></textarea>
                                <div className="emojiBtn" onClick={this.toggleEmogiTable.bind(this)}>
                                    <i className="far fa-smile"></i>
                                    <div className={showEmoji}>
                                        <Picker onSelect={this.addEmoji.bind(this)} />
                                    </div>
                                </div>
                                <div className="imageBtn">

                                    <i className="far fa-images"></i>
                                </div>
                                <button type="submit" className="submitBtn">
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                )} />

                {/* RoomMember */}
                <Route exact path="/chatroom/:roomname/member" render={() => (
                    <div className='room_member'>
                    </div>
                )} />

            </div>
        )
    }
    addEmoji(e) {
        this.setState((currentState) => ({ message: currentState.message + e.native }));
    }
    toggleEmogiTable(e) {
        e.preventDefault();
        if (e.target.tagName !== 'I') { return }
        this.setState((currentState) => ({ showEmoji: !currentState.showEmoji }));
    }
    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleUserKeyPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            this.websocketSubmitMessage(e);
        }
    }
    websocketSubmitMessage(e) {
        e.preventDefault();

        if (this.state.message === '') { return }

        this.chatSocket.send(JSON.stringify({
            'type': 'text',
            'author': this.props.user.id,
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