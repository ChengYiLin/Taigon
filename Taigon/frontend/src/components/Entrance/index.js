import React, { Component } from 'react';
// Components
import Topbar from './topbar';
import Signin_content from './signin_content';
import To_registe from './to_registe';
import Registe_content from './registe_content';
import To_signin from './to_signin';

// --- Signin Page Components ---
class Signin_Page extends Component {
    render() {
        return (
            <section className="SignIn">
                <Topbar />
                <Signin_content />
                <To_registe />
            </section>
        )
    }
}

// --- Registe Page Components ---
class Registe_Page extends Component {
    render() {
        return (
            <section className="SignIn">
                <Topbar />
                <Registe_content />
                <To_signin />
            </section>
        )
    }
}

export { Signin_Page, Registe_Page }