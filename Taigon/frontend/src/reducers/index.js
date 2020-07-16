import { combineReducers } from 'redux';
import auth from './auth';
import lobby from './lobby';

export default combineReducers({
    auth,
    lobby
})