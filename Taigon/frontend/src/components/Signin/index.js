import React, { Component } from 'react';
// Components
import Topbar from './topbar';
import Signin_content from './signin_content';
import Registe_content from './registe_content';
import To_registe from './to_registe';
import To_signin from './to_signin';
// Router
import { Switch, Route } from "react-router-dom";


class SignIn extends Component {
    render() {
        return (
            <section className="SignIn">
                <Topbar />
                <Switch>
                    <Route exact path="/">
                        <Signin_content />
                        <To_registe />
                    </Route>
                    <Route path="/registe">
                        <Registe_content />
                        <To_signin />
                    </Route>
                </Switch>
            </section>
        )
    }
}

export default SignIn;
