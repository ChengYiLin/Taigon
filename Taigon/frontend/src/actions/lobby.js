export const GET_CHATROOM = 'GET_CHATROOM';
export const GET_CHATROOM_ERROR = 'GET_CHATROOM';
export const GET_NOW_ROOM = 'GET_NOW_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const CREATE_CHATROOM_ERROR = 'CREATE_CHATROOM_ERROR';
export const GET_ROOM_CATEGORIES = 'GET_ROOM_CATEGORIES';
export const GET_ROOM_CATEGORIES_ERROR = 'GET_ROOM_CATEGORIES_ERROR';

const HOST = window.location.origin;

// Get the chatroom
export const getChatRoom = () => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    fetch(HOST + '/api/chatroom', config)
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

// Create Chat Room
export const createChatRoom = (roomName, roomBgImg, category, owner) => (dispatch) => {
    let formData = new FormData();
    formData.append('roomname', roomName);
    formData.append('bgimage', roomBgImg);
    formData.append('category', category);
    formData.append('owner', owner);

    const config = {
        method: "POST",
        body: formData,
    }

    console.log(formData);

    fetch(HOST + '/api/chatroom', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: CREATE_CHATROOM,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: CREATE_CHATROOM_ERROR,
                payload: err.status
            });
        })
}

// Get the chatroom categories
export const getChatroomCategories = () => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    fetch(HOST + '/api/roomcategory', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: GET_ROOM_CATEGORIES,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ROOM_CATEGORIES_ERROR,
                payload: err.status
            });
        })
}