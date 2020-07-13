import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTE_SUCCESS,
    REGISTE_ERROR,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from '../actions/auth';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

function auth(state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return ({
                ...state,
                isLoading: true,
            })

        case USER_LOADED:
            return ({
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            })

        case LOGIN_SUCCESS:
        case REGISTE_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return ({
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
            })

        case LOGOUT_ERROR:
            console.log(`Log out Error : ${action.payload}`)
            return ({
                ...state,
            })

        case LOGIN_ERROR:
        case AUTH_ERROR:
        case REGISTE_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return ({
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null
            })


        default:
            return state
    }
}

export default auth;