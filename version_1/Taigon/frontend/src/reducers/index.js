import { combineReducers } from 'redux';
import auth from './auth';
import lobby from './lobby';
import chatroom from './chatroom';

export default combineReducers({
    auth,
    lobby,
    chatroom
})