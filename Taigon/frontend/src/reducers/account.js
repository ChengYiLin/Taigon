import {
    USER_LOGIN,
    USER_LOGIN_ERROR,
    USER_REGISTER,
    USER_REGISTER_ERROR
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
            localStorage.setItem('token', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            return ({
                ...state,
                login: true,
                user: action.payload.user,
                token: action.payload.token,
            })

        case USER_LOGIN_ERROR:
        case USER_REGISTER_ERROR:
            return ({
                ...state,
                error_message: action.payload,
            })

        default:
            return state
    }
}

export default account;