import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const profile_img = (this.props.user) ? `/media/${this.props.user.image}` : "url(/media/user.png)";
        const username = (this.props.user) ? this.props.user.username : '';
        const email = (this.props.user) ? this.props.user.email : '';

        return (
            <main>
                <div className='profile'>
                    <h2 className='title'>個人資訊</h2>
                    <div className='inform'>
                        <div className='image' style={{ backgroundImage: `url(${profile_img})` }}></div>
                        <div className='username'>{username}</div>
                        <div className='email'>{email}</div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    chatroomList: state.lobby.chatroomList
})

export default connect(mapStateToProps)(Profile);