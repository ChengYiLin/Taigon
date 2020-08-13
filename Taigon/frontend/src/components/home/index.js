import React from 'react';
// Components
import Topbar from './topbar';
import HomeContent from './homeContent';

class Home extends React.Component {
    render() {
        return (
            <div className='homepage'>
                <div className='section header'>
                    <Topbar />
                    <HomeContent />
                </div>
            </div>
        )
    }
}

export default Home;