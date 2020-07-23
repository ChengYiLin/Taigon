import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Topbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showInform: false
        }
    }
    render() {
        const profile_img = 'https://thispersondoesnotexist.com/image';
        return (
            <header className='topbar'>
                <div className='container'>
                    {/* Logo */}
                    <div className="Logo">
                        <img src='/static/frontend/img/Taigon.png'></img>
                        <h1>Taigon</h1>
                    </div>
                    {/* User */}
                    <div className='User'>
                        <a className='porfile_image' style={{ backgroundImage: `url(${profile_img})` }}></a>
                        <div className='profile_box'>
                            <a className='porfile_image' style={{ backgroundImage: `url(${profile_img})` }}></a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
    showInform() {
        this.setState(currentState => ({ showInform: !currentState.showInform }))
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps, { logout })(Topbar);