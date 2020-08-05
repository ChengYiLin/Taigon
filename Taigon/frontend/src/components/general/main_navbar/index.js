import React from 'react';
import { connect } from 'react-redux';
// Router
import { Link } from "react-router-dom";

class MainNavbar extends React.Component {
    constructor(props) {
        super(props);
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
                        <a className='option'>
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
}
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(MainNavbar);