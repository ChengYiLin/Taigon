import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Aside from './aside';
import Chatbox from './chatbox';
import Member from './member';
// action
import { leaveChatRoom } from '../../actions/lobby';
import { getRoomMessages, sendImgMessage, getRoomMember } from '../../actions/chatroom';
// Router 
import { Link, Route } from "react-router-dom";
// Wensocket 
import ReconnectingWebSocket from 'reconnecting-websocket';
// Emogi
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const HOST = window.location.origin;

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            showEmoji: false,
            previewImg: ""
        }
        this.fileInput = React.createRef();
    }
    componentDidMount() {
        const roomID = this.props.currentRoomId
        this.props.getRoomMessages(roomID);
        this.scrollToBottom();
        // WebSocket
        const path = `ws://${window.location.host}/ws/chat/${roomID}/`;
        this.chatSocket = new ReconnectingWebSocket(path);
        // When open the chatroom
        this.chatSocket.onopen = (e) => {
            console.log('Websocket Open');
        }
        // When receive the msgs from backend
        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            this.props.getRoomMessages(roomID);
        };
        // When get the Unexpected Error
        this.chatSocket.onclose = (e) => {
            this.chatSocket.close();
            console.log('Websocket Close')
        };
    }
    componentWillUnmount() {
        // When leave the chatroom
        this.chatSocket.close();
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const currentRoom = (this.props.currentRoom) ? (this.props.currentRoom) : '';
        const showEmoji = (this.state.showEmoji) ? 'emogi show' : 'emogi';

        // Message
        let Messages = (!this.props.past_message) ? ([]) : (
            this.props.past_message.data.map(element => (
                <Chatbox key={element.id} author_name={element.author} authorImage={element.author_Image}
                    msgtype={element.type} timestamp={element.time} textcontent={element.text} />
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
                                <div className='overflow_anchor' ref={(el) => { this.messagesEnd = el; }}></div>
                            </div>
                        </div>
                        <div className='footer'>
                            <form className='message_form' onSubmit={this.websocketSubmitMessage.bind(this)}>
                                <textarea id="message" name="message" className='message' placeholder={`Messagge to ${currentRoom}`} rows='2'
                                    value={this.state.message} onChange={this.handleTextChange.bind(this)} onKeyPress={this.handleUserKeyPress.bind(this)}
                                ></textarea>
                                <div className="emojiBtn" onClick={this.toggleEmogiTable.bind(this)}>
                                    <i className="far fa-smile"></i>
                                    <div className={showEmoji}>
                                        <Picker onSelect={this.addEmoji.bind(this)} />
                                    </div>
                                </div>
                                <div className="imageBtn">
                                    <label htmlFor='msg_img' className='upload_image'>
                                        <i className="far fa-images"></i>
                                    </label>
                                    <input type="file" id="msg_img" ref={this.fileInput} onChange={this.handleImgChange.bind(this)} accept=".png, .jpg, .jpeg"></input>
                                </div>
                                <button type="submit" className="submitBtn" onClick={this.websocketSubmitMessage.bind(this)}>
                                    <i className="fas fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                )} />

                {/* RoomMember */}
                <Route exact path="/chatroom/:roomname/member" component={Member} />

            </div>
        )
    }
    addEmoji(e) {
        this.setState((currentState) => ({ message: currentState.message + e.native }));
    }
    handleTextChange(e) {
        this.setState({ [e.target.className]: e.target.value });
    }
    handleImgChange(e) {
        let formData = new FormData();
        formData.append('msgtype', 'IMG');
        formData.append('author', this.props.user.id);
        formData.append('chatroom', this.props.currentRoomId);
        formData.append('imgmessage', this.fileInput.current.files[0]);

        const config = {
            method: "POST",
            body: formData,
        }

        fetch(HOST + '/api/message', config)
            .then(res => {
                if (res.ok) { return res.json() }
                else {
                    throw ({ status: res.status, msg: res.statusText });
                }
            })
            .then(res => {
                console.log(res)
                this.chatSocket.send(JSON.stringify({
                    'msgtype': 'IMG',
                    'author': this.props.user.id,
                    'chatroom': this.props.currentRoomId
                }));
            })
            .catch(err => {
                console.log(`Somthig Wrong : ${err}`)
            })
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
            'msgtype': 'TXT',
            'author': this.props.user.id,
            'chatroom': this.props.currentRoomId,
            'textmessage': this.state.message
        }));

        this.setState({ message: '' })
    }
    // View
    scrollToBottom(e) {
        if (this.messagesEnd) {
            this.messagesEnd.scrollIntoView();
        }
    }
    resetShow(e) {
        e.preventDefault();
        let clickToHide = ['footer', 'chat_box', 'timestamp', 'author_name', 'message', 'room_aside']
        if (clickToHide.includes(e.target.className)) {
            this.setState({ showEmoji: false })
        }
    }
    toggleEmogiTable(e) {
        e.preventDefault();
        if (e.target.tagName !== 'I') { return }
        this.setState((currentState) => ({ showEmoji: !currentState.showEmoji }));
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

export default connect(mapStateToProps, { getRoomMessages, sendImgMessage, leaveChatRoom, getRoomMember })(ChatRoom);