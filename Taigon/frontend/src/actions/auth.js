export const USER_LOADING = 'USER_LOADING';
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTE_SUCCESS = "REGISTE_SUCCESS";
export const REGISTE_ERROR = "REGISTE_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";


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

    fetch('http://localhost:8000/api/auth/user', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.status
            });
        })

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
    fetch('http://localhost:8000/api/auth/login', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.status
            });
        })
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
    fetch('http://localhost:8000/api/auth/registe', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: REGISTE_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: REGISTE_ERROR,
                payload: err.status
            });
        })
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
    fetch('http://localhost:8000/api/auth/logout', config)
        .then(res => {
            if (res.ok) { 
                return res
            }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            console.log('OUT Success')
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res
            })
        })
        .catch(err => {
            console.log(`Noooooo  ${err}`)
            dispatch({
                type: LOGOUT_ERROR,
                payload: err.status
            });
        })
}