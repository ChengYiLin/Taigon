import React from 'react';
// Router 
import { Link } from "react-router-dom";

class HeaderContent extends React.Component {
    render() {
        return (
            <div className='header_content'>
                <div className='container'>
                    <div className='slogen'>
                        <p className='title typing1'>找不到人聊天？</p>
                        <p className='title typing2'>那就來 <span className='logo_text'>Taigon</span> 吧!</p>
                        <div className='subtitle'>
                            <p>多人聊天，想說什麼就說什麼</p>
                            <p>主題多樣，各類話題應有盡有</p>
                        </div>
                        <Link className='startChat' to='/lobby'>加入我們，開始聊天</Link>
                    </div>
                    <div className='main_img'>
                        <img src='/static/frontend/img/GroupChat.svg'></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderContent;