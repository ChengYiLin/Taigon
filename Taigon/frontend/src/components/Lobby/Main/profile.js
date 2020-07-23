import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        return (
            <main>
                <div className='profile'>
                    <h2 className='title'>個人資訊</h2>
                    <div className='inform'>
                        
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    chatroomList: state.lobby.chatroomList,
})

export default connect(mapStateToProps)(Profile);