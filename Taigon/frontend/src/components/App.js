import React from 'react';
import '../statics/styles/all.scss';
// Components
import { Signin_Page, Registe_Page } from './Entrance';
import Chatroom from './Chatroom';
import Lobby from './Lobby';
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
                        <Route exact path="/chatroom/:roomname" component={Chatroom} />
                        <Route exact path="/signin" component={Signin_Page} />
                        <Route exact path="/registe" component={Registe_Page} />
                        <Route path="/" component={Lobby} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

export default App;