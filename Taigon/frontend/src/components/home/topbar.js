import React from 'react';
// Router
import { Link } from "react-router-dom";

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSignIn = this.props.toggleSignIn;
        this.toggleSignUp = this.props.toggleSignUp;
    }
    render() {
        return (
            <div className='topbar'>
                <div className='container'>
                    <Link className='Logo' to='/'>
                        <img src='/static/img/Taigon.png'></img>
                        <p>Taigon</p>
                    </Link>
                    <div className='entrance'>
                        <a className='entrance_button signin' onClick={()=>this.toggleSignIn()}>登入</a>
                        <a className='entrance_button signup' onClick={()=>this.toggleSignUp()}>註冊</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Topbar;