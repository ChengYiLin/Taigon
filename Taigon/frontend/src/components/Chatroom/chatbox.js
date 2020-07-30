import React, { Component } from 'react';
import { connect } from 'react-redux';

const HOST = window.location.origin;

class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.author_name = this.props.author_name;
        this.authorImage = this.props.authorImage;
        this.msgtype = this.props.msgtype;
        this.timestamp = this.props.timestamp;
        this.textcontent = this.props.textcontent;
    }
    render() {
        // Check mine msgs or not
        const checkMineMessage = (this.props.user.username === this.author_name) ? 'chat_box mine_msg' : 'chat_box';
        // Deal with msg type
        let message;
        switch (this.msgtype) {
            case 'TXT':
                message = <p className='txt'>{this.textcontent}</p>
                break;
            case 'IMG':
                message = <div className='img'><img src={`${HOST + '/media/' + this.textcontent}`}></img></div>
                break;
            default:
                message = <p className='txt'>{this.textcontent}</p>
        }
        // Edit timestamp
        let timestamp = this.timestamp.time.slice(0, 5);
        return (
            <div className={checkMineMessage}>
                <div className='author_img' style={{ backgroundImage: `url('${HOST + '/media/' + this.authorImage}')` }}></div>
                <div className='main_content'>
                    <p className='author_name'>{this.author_name}</p>
                    <div className='message_box'>
                        <div className='messageTxt'>
                            {message}
                            {/* <p className='txt'>{this.textcontent}</p> */}
                        </div>
                        <small className='timestamp'>{timestamp}</small>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Chatbox);