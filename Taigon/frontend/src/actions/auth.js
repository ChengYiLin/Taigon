import { GetFetch, PostFetch, PostFileFetch } from './globalfunction';

export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTE_SUCCESS = "REGISTE_SUCCESS";
export const REGISTE_ERROR = "REGISTE_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const UPDATE_PROFILE_IMAGE = 'UPDATE_PROFILE_IMAGE';
export const UPDATE_PROFILE_IMAGE_ERROR = 'UPDATE_PROFILE_IMAGE_ERROR';

const HOST = window.location.origin;

// Get User data
export const loadUserData = () => (dispatch, getState) => {
    // Start to Loading
    dispatch({ type: USER_LOADING });

    // Get Token from state
    const token = getState().auth.token;

    const dispatchType = {
        'success': USER_LOADED,
        'error': AUTH_ERROR
    }

    GetFetch(dispatch, '/api/auth/user', dispatchType, token)
};

// User Login
export const login = (username, password) => (dispatch) => {
    const dispatchType = {
        'success': LOGIN_SUCCESS,
        'error': LOGIN_ERROR
    }

    const data = {
        'username': username,
        'password': password
    }

    PostFetch(dispatch, '/api/auth/login', data, dispatchType)
}

// User Registe
export const registe = (username, email, password) => (dispatch) => {
    const dispatchType = {
        'success': REGISTE_SUCCESS,
        'error': REGISTE_ERROR
    }

    const data = {
        'username': username,
        'email': email,
        'password': password
    }

    PostFetch(dispatch, '/api/auth/registe', data, dispatchType)
}

// User Logout
export const logout = () => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'Authorization': `Token ${token}`
        },
    }

    fetch(HOST + '/api/auth/logout', config)
        .then(res => {
            if (res.ok) { return res }
            else { throw ({ status: res.status, msg: res.statusText }) }
        })
        .then(res => { dispatch({ type: LOGOUT_SUCCESS, payload: res }) })
        .catch(err => { dispatch({ type: LOGOUT_ERROR, payload: err.status }) })
}


// Update user Profile
export const updateProfileImage = (user, profileImg) => (dispatch) => {
    const dispatchType = {
        'success': UPDATE_PROFILE_IMAGE,
        'error': UPDATE_PROFILE_IMAGE_ERROR
    }
    
    let formData = new FormData();
    formData.append('user', user);
    formData.append('profileimg', profileImg);

    PostFileFetch(dispatch, '/api/auth/profile', formData, dispatchType)
}