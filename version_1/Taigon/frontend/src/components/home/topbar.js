import React from 'react';
// Router 
import { Link } from "react-router-dom";

class Topbar extends React.Component {
    render() {
        return (
            <div className='topbar'>
                <div className='container'>
                    <Link className='Logo' to='/'>
                        <img src='/static/frontend/img/Taigon.png'></img>
                        <p>Taigon</p>
                    </Link>
                    <div className='entrance'>
                        <Link className='entrance_button signin' to='/signin'>登入</Link>
                        <Link className='entrance_button signup' to='/registe'>註冊</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topbar;