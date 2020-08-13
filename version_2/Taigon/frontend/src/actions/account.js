import { GetFetch, PostFetch } from './global_function';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR';
export const NOT_LOGIN_YET = 'NOT_LOGIN_YET';

// Check Login or not
export const checkLogin = () => (dispatch) => {
    const token = localStorage.getItem('token');

    if (token !== null) {
        const dispatchType = {
            'success': GET_USER_DATA,
            'error': GET_USER_DATA_ERROR
        }

        GetFetch(dispatch, '/api/user/', dispatchType, token)
    }
    else{
        dispatch({
            type: NOT_LOGIN_YET
        })
    }
}


// Login
export const login = (username, password) => (dispatch) => {
    const dispatchType = {
        'success': USER_LOGIN,
        'error': USER_LOGIN_ERROR
    }

    const data = {
        'username': username,
        'password': password
    }

    PostFetch(dispatch, '/api/login/', data, dispatchType)
}

// Register
export const register = (username, email, password) => (dispatch) => {
    const dispatchType = {
        'success': USER_REGISTER,
        'error': USER_REGISTER_ERROR
    }

    const data = {
        'username': username,
        'email': email,
        'password': password
    }

    PostFetch(dispatch, '/api/register/', data, dispatchType)
}

// Logout
export const logout = () => (dispatch, getState) => {
    const dispatchType = {
        'success': USER_LOGOUT,
        'error': USER_LOGOUT_ERROR
    }

    const token = getState().account.token;

    PostFetch(dispatch, '/api/logout/', data, dispatchType, token);
}