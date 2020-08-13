import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';
import ProfileNavbar from './profilenavbar';
import ProfileContent from './profilecontent';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='profile mainpage'>
                <MainNavbar />
                <main className='main_content'>
                    <ProfileNavbar />
                    <ProfileContent />
                </main>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Profile);