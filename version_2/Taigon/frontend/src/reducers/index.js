import { combineReducers } from 'redux';
import account from './account';
import lobby from './lobby';
import createRoom from './createroom';

export default combineReducers({
    account,
    lobby,
    createRoom
})