import React from 'react';
import { connect } from 'react-redux';
// actions


class MineNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className='sub_navbar mine_navbar'>
                <p className='title'>我的聊天室</p>
                <ul className='chatrooms'>
                    {[]}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(MineNavbar);