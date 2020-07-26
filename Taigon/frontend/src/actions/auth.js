export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTE_SUCCESS = "REGISTE_SUCCESS";
export const REGISTE_ERROR = "REGISTE_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

const HOST = window.location.origin;

//      GET USER DATA
// --------------------------
export const loadUserData = () => (dispatch, getState) => {
    // Start to Loading
    dispatch({ type: USER_LOADING });

    // Get Token from state
    const token = getState().auth.token;

    // Define Ajax config for UserAPI
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }
    // --- if there is a token, ser it in headers
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    Standard_Fetch(dispatch, HOST + '/api/auth/user', config, USER_LOADED, AUTH_ERROR);
};

//        User Login
// --------------------------
export const login = (username, password) => (dispatch) => {
    // Define Ajax config for LoginAPI
    let config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username, password })
    }

    // FETCH API
    Standard_Fetch(dispatch, HOST + '/api/auth/login', config, LOGIN_SUCCESS, LOGIN_ERROR);
}

//        User Registe
// --------------------------
export const registe = (username, email, password) => (dispatch) => {
    // Define Ajax config for RegisteAPI
    let config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
    }

    // FETCH API
    Standard_Fetch(dispatch, HOST + '/api/auth/registe', config, REGISTE_SUCCESS, REGISTE_ERROR);
}

//        User Logout
// --------------------------
export const logout = () => (dispatch, getState) => {
    // Get Token from state
    const token = getState().auth.token;

    // Define Ajax config for UserAPI
    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
    }
    // --- if there is a token, ser it in headers
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    // FETCH API
    fetch(HOST + '/api/auth/logout', config)
        .then(res => {
            if (res.ok) {
                return res
            }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: LOGOUT_ERROR,
                payload: err.status
            });
        })
}

// Fetch API
function Standard_Fetch(dispatch, URL, config, Success_type, Error_type) {
    fetch(URL, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: Success_type,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: Error_type,
                payload: err.status
            });
        })
}