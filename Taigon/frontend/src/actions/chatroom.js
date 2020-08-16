import { GetFetch } from './globalfunction';

export const GET_ROOM_MSG = 'GET_ROOM_MSG';
export const GET_ROOM_MSG_ERROR = 'GET_ROOM_MSG_ERROR';
export const SEND_IMG_MSG = 'SEND_IMG_MSG';
export const SEND_IMG_MSG_ERROR = 'SEND_IMG_MSG_ERROR';
export const GET_ROOM_MEMBER = 'GET_ROOM_MEMBER';
export const GET_ROOM_MEMBER_ERROR = 'GET_ROOM_MEMBER_ERROR';
export const GET_ROOM_IMAGE = 'GET_ROOM_IMAGE';
export const GET_ROOM_IMAGE_ERROR = 'GET_ROOM_IMAGE_ERROR';


const HOST = window.location.origin;

// Get Old Messages
export const getRoomMessages = (currentRoomId) => (dispatch) => {
    const dispatchType = {
        'success': GET_ROOM_MSG,
        'error': GET_ROOM_MSG_ERROR
    }

    GetFetch(dispatch, `/api/message?room=${currentRoomId}`, dispatchType);
}

// Send New Message
export const sendImgMessage = (formdata, chatSocket) => (dispatch) => {
    const config = {
        method: "POST",
        body: formdata,
    }

    fetch(HOST + '/api/message', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else { throw ({ status: res.status, msg: res.statusText }); }
        })
        .then(res => {
            chatSocket.send(JSON.stringify({ 'msgtype': 'IMG' }));
            dispatch({ type: SEND_IMG_MSG, payload: res })
        })
        .catch(err => {
            dispatch({ type: SEND_IMG_MSG_ERROR })
        })
}

// Get Room Member
export const getRoomMember = (currentRoomId) => (dispatch) => {
    const dispatchType = {
        'success': GET_ROOM_MEMBER,
        'error': GET_ROOM_MEMBER_ERROR
    }

    GetFetch(dispatch, `/api/roommember?room=${currentRoomId}`, dispatchType);
}

// Get Room Image
export const getRoomImage = (roomID) => (dispatch) => {
    const dispatchType = {
        'success': GET_ROOM_IMAGE,
        'error': GET_ROOM_IMAGE_ERROR
    }

    GetFetch(dispatch, `/api/chatroom?room=${roomID}`, dispatchType)
}