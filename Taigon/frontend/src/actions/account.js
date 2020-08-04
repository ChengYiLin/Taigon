import { PostFetch } from './global_function';

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

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
export const register = (username, email, password) => (dispatch) =>{
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