import React from 'react';
import ReactDOM from 'react-dom';
import './statics/styles/all.scss';
// Components
import SignIn from './components/Signin/';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Router 
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <SignIn />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));