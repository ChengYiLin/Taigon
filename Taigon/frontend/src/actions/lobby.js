export const GET_CHATROOM = 'GET_CHATROOM';
export const GET_CHATROOM_ERROR = 'GET_CHATROOM';
export const GET_NOW_ROOM = 'GET_NOW_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';

// Get the chatroom
export const getChatRoom = () => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    fetch('http://localhost:8000/api/chatroom', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: GET_CHATROOM,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CHATROOM_ERROR,
                payload: err.status
            });
        })
}

// Get the Room Name Now
export const getNowRoom = (roomName, id) => (dispatch) => {
    dispatch({
        type: GET_NOW_ROOM,
        payload: [id, roomName]
    })
}

// Go to Lobby
export const leaveChatRoom = () => (dispatch) => {
    dispatch({
        type: LEAVE_ROOM,
        payload: null
    })
}