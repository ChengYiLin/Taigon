import React, { Component } from 'react';
import { connect } from 'react-redux';


class Sidebar extends Component {
    render() {
        let username = (this.props.user) ? (this.props.user.username) : '';

        return (
            <div className='sidebar'>
                <div className='side_head'>
                    <h2 className='workspace'>Appworks School FrontEnd</h2>
                    <p className='username'>{username}</p>
                </div>
                <ul className='side_content'>
                    <li>
                        <i className="fas fa-users"></i>People
                        </li>
                    <li>
                        <i className="fas fa-comments"></i>Channels
                        </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(Sidebar);