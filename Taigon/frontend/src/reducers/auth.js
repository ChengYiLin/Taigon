import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, REGISTE_SUCCESS, REGISTE_ERROR } from '../actions/auth';

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
            localStorage.setItem('token', action.payload.token);
            return ({
                ...state,
                isAuthenticated: true,
                isLoading: false,
            })

        case REGISTE_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return ({
                ...state,
                isAuthenticated: true,
                isLoading: false,
            })


        case LOGIN_ERROR:
        case AUTH_ERROR:
        case REGISTE_ERROR:
            localStorage.removeItem('token');
            return ({
                ...state,
                token: null,
                isAuthenticated: null,
                isLoading: false,
                user: null
            })

        default:
            return state
    }
}

export default auth;