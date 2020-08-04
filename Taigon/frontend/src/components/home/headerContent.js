import React from 'react';

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
                        <a className='startChat'>加入我們，開始聊天</a>
                    </div>
                    <div className='main_img'>
                        <img src='/static/img/GroupChat.svg'></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderContent;