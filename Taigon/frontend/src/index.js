import React from 'react';
import ReactDOM from 'react-dom';
import './statics/styles/all.scss';
// Components
import Login from './components/Login/login';
import { Content } from './components/Login/content';
// Redux
import { Provider } from 'react-redux';
import store from './store';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Login />
                <Content />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));