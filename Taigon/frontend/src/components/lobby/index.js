import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';
import LobbyNavbar from './lobbynavbar';
import LobbyContent from './lobbycontent';
import Createroom from '../general/createroom';


class Lobby extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const showCreateRoom = (this.props.showCreateRoom) ? <Createroom /> : []

        return (
            <div className='lobby mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <LobbyNavbar />
                    <LobbyContent />
                </main>
                {showCreateRoom}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showCreateRoom: state.createRoom.showCreateRoom
    }
}

export default connect(mapStateToProps, {})(Lobby);

