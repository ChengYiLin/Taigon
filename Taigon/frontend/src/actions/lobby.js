export const GET_CHATROOM = 'GET_CHATROOM';
export const GET_CHATROOM_ERROR = 'GET_CHATROOM';
export const GET_NOW_ROOM = 'GET_NOW_ROOM';
export const LEAVE_ROOM = 'LEAVE_ROOM';
export const CREATE_CHATROOM = 'CREATE_CHATROOM';
export const CREATE_CHATROOM_ERROR = 'CREATE_CHATROOM_ERROR';
export const GET_ROOM_CATEGORIES = 'GET_ROOM_CATEGORIES';
export const GET_ROOM_CATEGORIES_ERROR = 'GET_ROOM_CATEGORIES_ERROR';
export const GET_USER_CHATROOM = 'GET_USER_CHATROOM';
export const GET_USER_CHATROOM_ERROR = 'GET_USER_CHATROOM_ERROR';
export const CHECK_ROOM_MEMBER = 'CHECK_ROOM_MEMBER';
export const CHECK_ROOM_MEMBER_ERROR = 'CHECK_ROOM_MEMBER_ERROR';
export const GET_CHATROOM_BY_CATEGORY = 'GET_CHATROOM_BY_CATEGORY';
export const GET_CHATROOM_BY_CATEGORY_ERROR = 'GET_CHATROOM_BY_CATEGORY_ERROR';
export const DELETE_CHATROOM = 'DELETE_CHATROOM';
export const DELETE_CHATROOM_ERROR = 'DELETE_CHATROOM_ERROR';

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

// Get the User own chatroom
export const getUserOwnChatroom = (user) => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        }
    }

    fetch(HOST + `/api/roommember?user=${user}`, config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res => {
            dispatch({
                type: GET_USER_CHATROOM,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: GET_USER_CHATROOM_ERROR,
                payload: err.status
            });
        })
}

// Check Room Member or not
export const checkRoomMember = (user, roomID) => (dispatch) => {
    const data = {
        "user": user,
        "roomname": roomID
    }

    const config = {
        method: "POST",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    Standard_Fetch(dispatch, HOST + `/api/roommember`, config, CHECK_ROOM_MEMBER, CHECK_ROOM_MEMBER_ERROR);
}

// Get the chatroom by category
export const getChatRoomByCategory = (category_ID) => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    Standard_Fetch(dispatch, HOST + `/api/chatroom?category=${category_ID}`, config, GET_CHATROOM_BY_CATEGORY, GET_CHATROOM_BY_CATEGORY_ERROR);
}

// Delete the chatroom from mine room
export const deleteChatRoom = (user, roomID) => (dispatch) => {
    const config = {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
        }
    }

    Standard_Fetch(dispatch, HOST + `/api/roommember?user=${user}&room=${roomID}`, config, DELETE_CHATROOM, DELETE_CHATROOM_ERROR);
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