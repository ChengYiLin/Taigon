export const GET_ROOM_MSG = 'GET_ROOM_MSG';
export const GET_ROOM_MSG_ERROR = 'GET_ROOM_MSG_ERROR';
export const SEND_NEW_MSG = 'SEND_NEW_MSG';
export const SEND_NEW_MSG_ERROR = 'SEND_NEW_MSG_ERROR';

// Get Old Messages
export const getRoomMessages = (currentRoomId) => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    Standard_Fetch(dispatch, `http://localhost:8000/api/message?room=${currentRoomId}`, config, GET_ROOM_MSG, GET_ROOM_MSG_ERROR);
}

// Send New Message
export const sendNewMessage = (author, currentRoomId, textmessage) => (dispatch) => {
    const data = {
        "author": author,
        "chatroom": currentRoomId,
        "textmessage": textmessage
    }

    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    fetch(`http://localhost:8000/api/message?room=${currentRoomId}`, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: SEND_NEW_MSG,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: SEND_NEW_MSG_ERROR,
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