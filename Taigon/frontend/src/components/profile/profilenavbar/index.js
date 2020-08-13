import React from 'react';
import { connect } from 'react-redux';


class ProfileNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav className='sub_navbar profile_navbar'>
                <p className='title'>設定</p>
                <ul className='settings'>
                    <li>
                        <a className='item show'>個人資料</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(ProfileNavbar);