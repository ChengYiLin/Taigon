import React, { Component } from 'react';
import { connect } from 'react-redux';
// Components
import Chatbox from './chatbox';
// Router 
import { Redirect, Link } from "react-router-dom";

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            message: "",
        }
    }
    render() {
        if (this.props.isAuthenticated === false) { return <Redirect push to="/signin" /> }

        const room_Name = 'This is Room Name'
        const profile_img = 'https://yt3.ggpht.com/a/AATXAJwS-EfJzU6v3dqTzjkxpTZOnwUiPKtbB89Y8JpOQw=s100-c-k-c0xffffffff-no-rj-mo';

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
                            <p className='nav_text'>{room_Name}</p>
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
                        <p className='room_name'>{room_Name}</p>
                        <Link className='leave_room' to='/'></Link>
                    </div>
                    {/* Chat Main */}
                    <div className='main'>
                        <Chatbox profile_img={profile_img} author_name='User1' timestamp='19:19' textcontent='HAHAHAHAH'/>
                    </div>
                    {/* Chat Footer */}
                    <div className='footer'>
                        <form className='message_form'>
                            <input type="text" id="message" name="message" placeholder={`Messagge to ${room_Name}`} required
                                value={this.state.bgimage} onChange={this.handleChange.bind(this)}
                            ></input>
                            <button type="submit" className="submitBtn">
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
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(ChatRoom);