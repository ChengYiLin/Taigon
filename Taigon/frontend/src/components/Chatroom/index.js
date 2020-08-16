import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Aside from './aside';
import Chatbox from './chatbox';
import Member from './member';
// action
import { leaveChatRoom } from '../../actions/lobby';
import { getRoomMessages, sendImgMessage, getRoomMember, getRoomImage } from '../../actions/chatroom';
// Router 
import { Link, Route } from "react-router-dom";
// Wensocket 
import ReconnectingWebSocket from 'reconnecting-websocket';
// Emogi
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
// ContentEditable
import ContentEditable from 'react-contenteditable';


const HOST = window.location.origin;

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
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
        this.props.getRoomImage(roomID);
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
        const room_img = (this.props.roomInform) ? HOST + '/media/' + (this.props.roomInform.bgimage) : '';
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
                            <Link className='leave_room' to='/lobby' onClick={this.props.leaveChatRoom}></Link>
                            <div className='mb_menu'></div>
                        </div>
                        <div className='main'>
                            <div className='overflow_container'>
                                {Messages}
                                <div className='overflow_anchor' ref={(el) => { this.messagesEnd = el; }}></div>
                            </div>
                            <div className='background' style={{backgroundImage:`url('${room_img}')`}}></div>
                        </div>
                        <div className='footer'>
                            <div className='message_form'>
                                <div className='message_box'>
                                    <ContentEditable className='message' contentEditable innerRef={this.contentEditable}
                                        html={this.state.message} onChange={this.handleTextChange.bind(this)} onKeyPress={this.handleUserKeyPress.bind(this)}/>
                                </div>
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
                            </div>
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
        this.setState({ 'message': e.target.value });
    }
    handleImgChange(e) {
        let formData = new FormData();
        formData.append('msgtype', 'IMG');
        formData.append('author', this.props.user.id);
        formData.append('chatroom', this.props.currentRoomId);
        formData.append('imgmessage', this.fileInput.current.files[0]);

        this.props.sendImgMessage(formData, this.chatSocket)
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
        currentRoomId: state.lobby.currentRoomId,
        roomInform: state.chatroom.roomInform
    }
}

export default connect(mapStateToProps, { getRoomMessages, sendImgMessage, leaveChatRoom, getRoomMember, getRoomImage })(ChatRoom);