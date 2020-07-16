import React, { Component } from 'react';
import { connect } from 'react-redux';

class Content extends Component {
    render() {
        let username = (this.props.user) ? (this.props.user.username) : '';

        return (
            <div className='content'>
                <div className='header'>
                    <p className='room_name'>
                        Chatroom_Name
                    </p>
                </div>
                <div className='main'>
                    <div className='chat_box'>
                        <div className='user_image' >
                            <img src='/static/frontend/img/guest.png'></img>
                        </div>
                        <div className='inform'>
                            <p className='user_name'>{username}</p>
                            <div className='msg_text'>
                                <p className='text'>this is a test</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer'>
                    <form className='message_input'>
                        <input type="text" id="message" name="message" placeholder="Messagge to Chatroom_Name" required></input>
                        <button type="submit" className="submitBtn">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Content);