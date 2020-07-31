import React, { Component } from 'react';
import { connect } from 'react-redux';
// Router 
import { Link } from "react-router-dom";
// action
import { getChatRoom } from '../../../actions/lobby';

class Aside extends Component {
    constructor(props) {
        super(props);
        this.setCreateRoomTrue = this.props.setCreateRoomTrue;
    }
    render() {
        return (
            <aside>
                {/*--- Create Room BTN */}
                <a className='createRoom' onClick={this.setCreateRoomTrue}>
                    <i className="add_icon fas fa-plus"></i>
                    <span>新增聊天室</span>
                </a>
                {/*--- Aside Navbar */}
                <ul className='main_nav'>
                    <li>
                        <Link className='navlink' to='/' onClick={()=>{this.props.getChatRoom()}}>
                            <i className="nav_icon fas fa-fire"></i>
                            <span>熱門話題</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='navlink' to='/minechat'>
                            <i className="nav_icon fab fa-facebook-messenger"></i>
                            <span>我的聊天</span>
                        </Link>
                    </li>
                    <li>
                        <Link className='navlink' to='/profile'>
                            <i className="nav_icon fas fa-user-alt"></i>
                            <span>個人資訊</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        )
    }
}

const mapStateToProps = state => ({
    chatroomList: state.lobby.chatroomList,
})

export default connect(mapStateToProps, { getChatRoom})(Aside);