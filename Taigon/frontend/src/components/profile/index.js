import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='profile mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <nav className='sub_navbar'>
                    </nav>
                    <div className='content'>
                    </div>
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Profile);