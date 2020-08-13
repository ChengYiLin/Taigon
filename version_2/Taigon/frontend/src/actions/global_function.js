const HOST = window.location.origin;

// Fetch : Get API
export function GetFetch(dispatch, URL, dispatchType, token = null) {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    if (token !== null) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    fetch(HOST + URL, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: dispatchType['success'],
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: dispatchType['error'],
                payload: err
            });
        })
}

// Fetch : Post API
export function PostFetch(dispatch, URL, data, dispatchType, token = null) {
    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    if (token !== null) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    fetch(HOST + URL, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: dispatchType['success'],
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: dispatchType['error'],
                payload: err
            });
        })
}


// Fetch : Post file API 
export function PostFileFetch(dispatch, URL, data, dispatchType, token = null) {
    const config = {
        method: "POST",
        body: data,
    }

    if (token !== null) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    fetch(HOST + URL, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: dispatchType['success'],
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: dispatchType['error'],
                payload: err
            });
        })
}