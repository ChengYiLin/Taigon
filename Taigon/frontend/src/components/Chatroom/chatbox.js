import React, { Component } from 'react';
import { connect } from 'react-redux';

class Chatbox extends Component {
    constructor(props) {
        super(props)
        this.author_name = this.props.author_name;
        this.authorImage = this.props.authorImage;
        this.timestamp = this.props.timestamp;
        this.textcontent = this.props.textcontent;
    }
    render() {
        // Check mine msgs or not
        const MessageType = (this.props.user.username === this.author_name) ? 'chat_box mine_msg' : 'chat_box'
        
        // Edit timestamp
        let timestamp = this.timestamp.time.slice(0,5)
        return (
            <div className={MessageType}>
                <div className='author_img' style={{ backgroundImage: `url('${window.location.origin + '/media/' + this.authorImage}')` }}></div>
                <div className='main_content'>
                    <p className='author_name'>{this.author_name}</p>
                    <div className='message_box'>
                        <div className='messageTxt'>
                            <p>{this.textcontent}</p>
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