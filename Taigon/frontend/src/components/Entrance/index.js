import React, { Component } from 'react';
// Components
import Topbar from './topbar';
import Signin_content from './signin_content';
import To_registe from './to_registe';
import Registe_content from './registe_content';
import To_signin from './to_signin';
// Router
import { Route } from "react-router-dom";

export default class Entrance extends Component {
    render() {
        return (
            <section className="SignIn">
                <Route exact path="/" component={Signin_Page} />
                <Route exact path="/registe" component={Registe_Page} />
            </section>
        )
    }
}

// --- Signin Page Components ---
class Signin_Page extends Component {
    render() {
        return (
            <>
                <Topbar />
                <Signin_content />
                <To_registe />
            </>
        )
    }
}

// --- Registe Page Components ---
class Registe_Page extends Component {
    render() {
        return (
            <>
                <Topbar />
                <Registe_content />
                <To_signin />
            </>
        )
    }
}