import React from 'react';
import { connect } from 'react-redux';
// Components
import LobbyContentBanner from './banner';
import RoomList from './roomlist';


class LobbyContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <div className='content lobby_content'>
                <LobbyContentBanner />
                <RoomList />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(LobbyContent);

