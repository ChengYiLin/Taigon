import React from 'react';
import '../statics/styles/all.scss';
// Components
import Entrance from './Entrance';
// Redux
import { Provider } from 'react-redux';
import store from '../store';
// Router 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// actions
import { loadUserData } from '../actions/auth';


class App extends React.Component {
    componentDidMount() {
        store.dispatch(loadUserData());
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Entrance />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;