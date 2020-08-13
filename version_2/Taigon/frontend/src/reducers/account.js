import {
    USER_LOGIN,
    USER_LOGIN_ERROR,
    USER_REGISTER,
    USER_REGISTER_ERROR,
    USER_LOGOUT,
    USER_LOGOUT_ERROR,
    GET_USER_DATA,
    GET_USER_DATA_ERROR,
    NOT_LOGIN_YET
} from '../actions/account';

const initialState = {
    login: false,
    user: '',
    token: '',
    error_message: ''
}

function account(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
        case USER_REGISTER:
            localStorage.setItem('token', action.payload.token);
            return ({
                ...state,
                login: true,
                user: action.payload.user,
                token: action.payload.token,
            })

        case GET_USER_DATA:
            return ({
                ...state,
                login: true,
                user: action.payload.user,
                token: localStorage.getItem('token'),
            })

        case USER_LOGOUT:
            localStorage.removeItem('token');
            return ({
                ...state,
                user: '',
                token: '',
                error_message: ''
            })

        case NOT_LOGIN_YET:
            return ({
                ...state,
            })

        case USER_LOGIN_ERROR:
        case USER_REGISTER_ERROR:
        case USER_LOGOUT_ERROR:
        case GET_USER_DATA_ERROR:
            return ({
                ...state,
                error_message: action.payload,
            })

        default:
            return state
    }
}

export default account;