import React from 'react';
import '../style/all.scss';
// Components
import Home from './home';
import Lobby from './lobby';
// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Redux
import { Provider } from 'react-redux';
import store from '../store'

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/lobby' component={Lobby} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}



export default App;