import React from 'react';
import { connect } from 'react-redux';
// Router
import { Link } from "react-router-dom";
// actions
import { toggleCreateRoom } from '../../../actions/createroom';

class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleCreateRoom = this.props.toggleCreateRoom;
        this.clickCreateRoom = this.clickCreateRoom.bind(this);
    }
    render() {
        return (
            <nav className='main_navbar'>
                <Link className='logo option' to='/'>
                    <img className='responsive_img' src='/static/img/Taigon.png'></img>
                </Link>
                <ul className='list'>
                    <li>
                        <Link className='option' to='/mine'>
                            <img className='responsive_img' src='/static/img/home.svg'></img>
                        </Link>
                    </li>
                    <li>
                        <Link className='option' to='/lobby'>
                            <img className='responsive_img' src='/static/img/lobby.svg'></img>
                        </Link>
                    </li>
                    <li>
                        <a className='option' onClick={this.clickCreateRoom}>
                            <img className='responsive_img' src='/static/img/add.svg'></img>
                        </a>
                    </li>
                </ul>
                <Link className='setting' to='/profile'>
                    <img className='responsive_img' src='/static/img/setting.svg'></img>
                </Link>
            </nav>
        )
    }
    clickCreateRoom(e){
        e.preventDefault();
        this.toggleCreateRoom();
    }
}
const mapStateToProps = state => {
    return {
        showCreateRoom: state.createRoom.showCreateRoom
    }
}

export default connect(mapStateToProps, { toggleCreateRoom })(MainNavbar);