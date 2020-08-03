import React from 'react';
// Components
import Topbar from './topbar';
import HeaderContent from './headerContent';

class Home extends React.Component {
    render() {
        return (
            <div className='homepage'>
                <div className='section header'>
                    <Topbar />
                    <HeaderContent />
                </div>
            </div>
        )
    }
}

export default Home;