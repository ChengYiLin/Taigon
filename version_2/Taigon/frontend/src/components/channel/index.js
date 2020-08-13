import React from 'react';
import { connect } from 'react-redux';

class Channel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const roomID = 1;

        // WebSocket
        const path = `ws://${window.location.host}/ws/chat/${roomID}/`;
        this.chatSocket = new WebSocket(path);
        // When open the chatroom
        this.chatSocket.onopen = (e) => {
            console.log('Websocket Open');
        }
        // When receive the msgs from backend
        this.chatSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
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
        console.log('Websocket Close')
    }

    render() {

        return (
            <div className='channel'>
                Hello here is channel
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Channel);