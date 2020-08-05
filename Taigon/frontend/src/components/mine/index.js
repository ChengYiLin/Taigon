import React from 'react';
import { connect } from 'react-redux';
// Components
import MainNavbar from '../general/main_navbar';


class Mine extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='mine mainpage'>
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

export default connect(mapStateToProps)(Mine);