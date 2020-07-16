import React, { Component } from 'react'

class Chatbox extends Component {
    constructor(props){
        super(props)
        this.profile_img = this.props.profile_img;
        this.author_name = this.props.author_name;
        this.timestamp = this.props.timestamp;
        this.textcontent = this.props.textcontent;
    }
    render() {
        return (
            <div className='chat_box'>
                <div className='author_img' style={{ backgroundImage: `url(${this.profile_img})` }}></div>
                <div className='main_content'>
                    <p className='author_name'>{this.author_name}</p>
                    <small className='timestamp'>{this.timestamp}</small>
                    <div className='messageTxt'>
                        {this.textcontent}
                    </div>
                </div>
            </div>
        )
    }
}

export default Chatbox;