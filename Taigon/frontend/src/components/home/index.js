import React from 'react';
// Components
import Topbar from './topbar';
import HeaderContent from './headerContent';
import SignIn from '../signin';
import SignUp from '../signup';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSignIn: false,
            showSignUp: false
        }
        this.toggleSignIn = this.toggleSignIn.bind(this)
        this.toggleSignUp = this.toggleSignUp.bind(this)
        this.closeAll = this.closeAll.bind(this)
    }
    render() {
        let entranceBox = <></>
        if (this.state.showSignIn) { entranceBox = <SignIn toggleSignIn={this.toggleSignIn} toggleSignUp={this.toggleSignUp} closeAll={this.closeAll} /> }
        if (this.state.showSignUp) { entranceBox = <SignUp toggleSignIn={this.toggleSignIn} toggleSignUp={this.toggleSignUp} closeAll={this.closeAll} /> }

        return (
            <div className='homepage'>
                <div className='section header'>
                    <Topbar toggleSignIn={this.toggleSignIn} toggleSignUp={this.toggleSignUp} />
                    <HeaderContent />
                    {entranceBox}
                </div>
            </div>
        )
    }
    toggleSignIn() {
        this.setState(currentState => ({ showSignIn: !currentState.showSignIn }))
    }
    toggleSignUp() {
        this.setState(currentState => ({ showSignUp: !currentState.showSignUp }))
    }
    closeAll() {
        this.setState({ showSignIn: false, showSignUp: false })
    }
}

export default Home;