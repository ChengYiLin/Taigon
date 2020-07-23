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
        const showInform_class = (!this.state.showInform) ? "profile_box" : "profile_box show";
        const profile_img = (this.props.user) ? `/media/${this.props.user.image}` : "url(/media/user.png)";
        const userName = (this.props.user) ? this.props.user.username : "";
        const userEmail = (this.props.user) ? this.props.user.email : "";

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
                        <a className='profile_image' onClick={this.showInform.bind(this)} style={{ backgroundImage: `url(${profile_img})` }}></a>
                        <div className={`${showInform_class}`}>
                            <a className='profile_image' style={{ backgroundImage: `url(${profile_img})` }}></a>
                            <p className='profile_name'>{userName}</p>
                            <p className='profile_email'>{userEmail}</p>
                            <div className='signout_box'>
                                <a className='logout' onClick={this.props.logout.bind(this)}>Signout</a>
                            </div>
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