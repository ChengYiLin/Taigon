import React, { Component } from 'react';
// Components
import Sidebar from './main_sidebar';
import Content from './main_content';

class Main extends Component {
    render() {
        return (
            <div className="main">
                <Sidebar />
                <Content />
            </div>
        )
    }
}

export default Main;