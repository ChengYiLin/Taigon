import React, { Component } from 'react';
// Router 
import { Link } from "react-router-dom";

class Aside extends Component {
    constructor(props) {
        super(props);
        this.openState = this.props.openState;
        this.setTrueState = this.props.setTrueState;
    }
    render() {
        return (
            <aside>
                {/*--- Create Room BTN */}
                <a className='createRoom' onClick={this.setTrueState}>
                    <i className="add_icon fas fa-plus"></i>
                    <span>新增聊天室</span>
                </a>
                {/*--- Aside Navbar */}
                <ul className='main_nav'>
                    <li>
                        <Link className='navlink' to='/'>
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

export default Aside;