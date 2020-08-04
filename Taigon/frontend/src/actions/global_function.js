const HOST = window.location.origin;

// Fetch API
export function GetFetch(dispatch, URL, dispatchType) {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
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

export function PostFetch(dispatch, URL, data, dispatchType) {
    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
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