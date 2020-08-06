import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';
import LobbyNavbar from './lobbynavbar';
import LobbyContent from './lobbycontent';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='lobby mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <LobbyNavbar />
                    <LobbyContent />
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Lobby);

