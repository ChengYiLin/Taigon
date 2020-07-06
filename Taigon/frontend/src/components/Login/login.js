import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../../actions/account';

class Login extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.getAccounts();
    };
    render() {
        return (
            <>
                <h1>Hello Redux</h1>
            </>
        )
    }
}

const mapStateToProps = state => (
    { accounts: state.accounts.accounts }
) 

export default connect(mapStateToProps, {getAccounts})(Login);