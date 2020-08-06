import { combineReducers } from 'redux';
import account from './account';
import lobby from './lobby';

export default combineReducers({
    account,
    lobby
})