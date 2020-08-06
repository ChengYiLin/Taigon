import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='lobby mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <nav className='sub_navbar lobby_navbar'>
                        <p className='title'>分類</p>
                    </nav>
                    <div className='content lobby_content'>
                        <div className='banner'>
                            <p className='slogen'>在 Taigon 上尋找你的聊天社群</p>
                            <p className='slogen small'>總會有屬於你的最佳角落</p>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Lobby);

