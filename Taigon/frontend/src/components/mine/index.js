import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';
import MineNavbar from './mine_navbar';
import Createroom from '../general/createroom';



class Mine extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const showCreateRoom = (this.props.showCreateRoom) ? <Createroom /> : []

        return (
            <div className='mine mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <MineNavbar />
                    <div className='content'>
                    </div>
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

export default connect(mapStateToProps)(Mine);