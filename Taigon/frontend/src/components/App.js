import React from 'react';
import ReactDOM from 'react-dom';
import '../statics/styles/all.scss';
// Redux

// Components
import { Login } from './Login/login';
import { Content } from './Login/content';

class App extends React.Component {
    render() {
        return (
            <>
                <Login />
                <Content />
            </>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));