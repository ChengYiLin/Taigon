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

class Lobby extends Component {
    constructor(props){
        super(props)
        this.state={
            createRoomState:false
        }
    }
    render() {
        if (this.props.isAuthenticated === false) { return <Redirect push to="/signin" /> }

        // if(this.props.roomnow){ return <Redirect push to={`/chatroom/${this.props.roomnow}`}/>}

        return (
            <div className='Lobby'>
                <Topbar />
                <section className='main_section'>
                    <div className='container'>
                        <Aside openState={this.state.createRoomState} setTrueState={this.openCreateRoom.bind(this)}/>
                        <Switch>
                            <Route exact path='/' component={Hotcategory}/>
                            <Route exact path='/profile' component={Profile}/>
                            <Route exact path='/minechat' component={MineChat}/>
                        </Switch>
                    </div>
                </section>
                <CreateRoom openState={this.state.createRoomState} setFalseState={this.closeCreateRoom.bind(this)}/>
            </div>
        )
    }
    openCreateRoom(){
        this.setState(currentState =>({createRoomState: true}))
    }
    closeCreateRoom(){
        this.setState(currentState =>({createRoomState: false}))
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