import React, { Component } from 'react';
import { connect } from 'react-redux';
// Router 
import { Link } from "react-router-dom";
// action
import { getChatRoom } from '../../actions/lobby';

class Mb_Aside extends Component {
    constructor(props) {
        super(props);
        this.openState = this.props.openState;
        this.setCreateRoomTrue = this.props.setCreateRoomTrue;
        this.setMobileAsideFalse = this.props.setMobileAsideFalse;
    }
    render() {
        const mb_aside_state = (this.props.openState) ? 'mb_aside show' : 'mb_aside'

        return (
            <div className={mb_aside_state}>
                <div className='nav'>
                    <ul>
                        <li>
                            <Link className='navlink' to='/lobby' onClick={() => { this.setMobileAsideFalse() }}>
                                <i className="nav_icon fas fa-fire"></i>
                                <span>熱門話題</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='navlink' to='/lobby/minechat' onClick={() => { this.setMobileAsideFalse() }}>
                                <i className="nav_icon fab fa-facebook-messenger"></i>
                                <span>我的聊天</span>
                            </Link>
                        </li>
                        <li>
                            <Link className='navlink' to='/lobby/profile' onClick={() => { this.setMobileAsideFalse() }}>
                                <i className="nav_icon fas fa-user-alt"></i>
                                <span>個人資訊</span>
                            </Link>
                        </li>
                        <li>
                            <a className='createRoom' onClick={this.setCreateRoomTrue}>
                                <i className="add_icon fas fa-plus"></i>
                                <span>新增聊天室</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chatroomList: state.lobby.chatroomList,
})

export default connect(mapStateToProps, { getChatRoom })(Mb_Aside);