import React from 'react';

import { SignIn } from './login';
import { Registe } from './registe';

class Entrance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goRegiste: false
        }
    }
    render() {
        let EntrancePage;

        if (this.state.goRegiste) {
            EntrancePage = <Registe toSignIn={this.GoSigninPage.bind(this)} />
        } else {
            EntrancePage = <SignIn toRegiste={this.GoRegistePage.bind(this)} />
        }

        return (
            <div className="Entrance">
                {/* left side */}
                <div className="loginImage">
                </div>

                {/* right side */}
                {EntrancePage}
            </div>
        )
    }
    GoRegistePage() {
        this.setState({ goRegiste: true })
    }
    GoSigninPage() {
        this.setState({ goRegiste: false })
    }
}

export { Entrance }