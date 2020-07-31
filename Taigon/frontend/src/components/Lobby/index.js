import React, { Component } from 'react';
import { connect } from 'react-redux';
// Router 
import { Switch, Route, Redirect } from "react-router-dom";
// Component
import Topbar from './topbar';
import CreateRoom from './createRoom';
import Aside from './Main/aside';
import Hotcategory from './Main/hotcategory';
import Profile from './Main/profile';
import MineChat from './Main/minechat';
import Mb_Aside from './mb_aside';

class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            createRoomState: false,
            mobileAsideState: false
        }
    }
    render() {
        if (this.props.isAuthenticated === false) { return <Redirect push to="/signin" /> }

        const mb_asideIcon_class = (this.state.mobileAsideState) ? 'add_icon show fas fa-plus' : 'add_icon fas fa-plus';

        return (
            <div className='Lobby'>
                <Topbar />
                <section className='main_section'>
                    <div className='container'>
                        <Aside openState={this.state.createRoomState} setCreateRoomTrue={this.openCreateRoom.bind(this)} />
                        <Switch>
                            <Route exact path='/' component={Hotcategory} />
                            <Route exact path='/profile' component={Profile} />
                            <Route exact path='/minechat' component={MineChat} />
                        </Switch>
                    </div>
                </section>
                <CreateRoom openState={this.state.createRoomState} setCreateRoomFalse={this.closeCreateRoom.bind(this)} />
                <div className='mb_aside_btn' onClick={this.toggleMobileAside.bind(this)}>
                    <i className={mb_asideIcon_class}></i>
                </div>
                <Mb_Aside openState={this.state.mobileAsideState} setMobileAsideFalse={this.closeMobileAside.bind(this)} setCreateRoomTrue={this.openCreateRoom.bind(this)} />
            </div>
        )
    }
    openCreateRoom() {
        this.setState(currentState => ({ createRoomState: true }))
    }
    closeCreateRoom() {
        this.setState(currentState => ({ createRoomState: false }))
    }
    toggleMobileAside() {
        if (this.state.createRoomState) {
            this.setState(currentState => ({ mobileAsideState: !currentState.mobileAsideState, createRoomState:false }))
        }
        else {
            this.setState(currentState => ({ mobileAsideState: !currentState.mobileAsideState }))
        }
    }
    closeMobileAside() {
        this.setState(currentState => ({ mobileAsideState: false }))
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        roomnow: state.lobby.roomnow
    }
}

export default connect(mapStateToProps)(Lobby);