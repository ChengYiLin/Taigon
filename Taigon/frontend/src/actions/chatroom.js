export const GET_ROOM_MSG = 'GET_ROOM_MSG';
export const GET_ROOM_MSG_ERROR = 'GET_ROOM_MSG_ERROR';
export const SEND_NEW_MSG = 'SEND_NEW_MSG';
export const SEND_NEW_MSG_ERROR = 'SEND_NEW_MSG_ERROR';
export const GET_ROOM_MEMBER = 'GET_ROOM_MEMBER';
export const GET_ROOM_MEMBER_ERROR = 'GET_ROOM_MEMBER_ERROR';
export const GET_ROOM_IMAGE = 'GET_ROOM_IMAGE';
export const GET_ROOM_IMAGE_ERROR = 'GET_ROOM_IMAGE_ERROR';


const HOST = window.location.origin;

// Get Old Messages
export const getRoomMessages = (currentRoomId) => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    Standard_Fetch(dispatch, HOST + `/api/message?room=${currentRoomId}`, config, GET_ROOM_MSG, GET_ROOM_MSG_ERROR);
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

    Standard_Fetch(dispatch, HOST + `/api/message?room=${currentRoomId}`, config, SEND_NEW_MSG, SEND_NEW_MSG_ERROR);
}

// Get Room Member
export const getRoomMember = (currentRoomId) => (dispatch) =>{
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    Standard_Fetch(dispatch, HOST + `/api/roommember?room=${currentRoomId}`, config, GET_ROOM_MEMBER, GET_ROOM_MEMBER_ERROR);
}

// Get Room Image
export const getRoomImage = (roomID) => (dispatch) =>{
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    Standard_Fetch(dispatch, HOST + `/api/chatroom?room=${roomID}`, config, GET_ROOM_IMAGE, GET_ROOM_IMAGE_ERROR);
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