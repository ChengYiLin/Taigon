import React from 'react';
import { connect } from 'react-redux';
// Router
import { Redirect } from "react-router-dom";
// Components
import Topbar from './topbar';
import HeaderContent from './headerContent';
import SignIn from '../general/signin';
import SignUp from '../general/signup';
// actions
import { checkLogin } from '../../actions/account';

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
    componentDidMount() {
        // if localStorage have token, then go to Lobby Page Directly
        this.props.checkLogin();
    }
    render() {
        // if user login
        if (this.props.login) { return (<Redirect to='/mine' />) }

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

const mapStateToProps = state => {
    return {
        login: state.account.login
    }
}

export default connect(mapStateToProps, { checkLogin })(Home);