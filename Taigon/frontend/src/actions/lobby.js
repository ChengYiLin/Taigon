import { GetFetch, PostFetch, PostFileFetch, DeleteFetch } from './globalfunction';

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
    const dispatchType = {
        'success': GET_CHATROOM,
        'error': GET_CHATROOM_ERROR
    }

    GetFetch(dispatch, '/api/chatroom', dispatchType)
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
    const dispatchType = {
        'success': CREATE_CHATROOM,
        'error': CREATE_CHATROOM_ERROR
    }

    let formData = new FormData();
    formData.append('roomname', roomName);
    formData.append('bgimage', roomBgImg);
    formData.append('category', category);
    formData.append('owner', owner);

    PostFileFetch(dispatch, '/api/chatroom', formData, dispatchType)
}

// Get the chatroom categories
export const getChatroomCategories = () => (dispatch) => {
    const dispatchType = {
        'success': GET_ROOM_CATEGORIES,
        'error': GET_ROOM_CATEGORIES_ERROR
    }

    GetFetch(dispatch, '/api/roomcategory', dispatchType)
}

// Get the User own chatroom
export const getUserOwnChatroom = (user) => (dispatch) => {
    const dispatchType = {
        'success': GET_USER_CHATROOM,
        'error': GET_USER_CHATROOM_ERROR
    }

    GetFetch(dispatch, `/api/roommember?user=${user}`, dispatchType)
}

// Check Room Member or not
export const checkRoomMember = (user, roomID) => (dispatch) => {
    const dispatchType = {
        'success': CHECK_ROOM_MEMBER,
        'error': CHECK_ROOM_MEMBER_ERROR
    }

    const data = {
        "user": user,
        "roomname": roomID
    }

    PostFetch(dispatch, `/api/roommember`, data, dispatchType)
}

// Get the chatroom by category
export const getChatRoomByCategory = (category_ID) => (dispatch) => {
    const dispatchType = {
        'success': GET_CHATROOM_BY_CATEGORY,
        'error': GET_CHATROOM_BY_CATEGORY_ERROR
    }

    GetFetch(dispatch, `/api/chatroom?category=${category_ID}`, dispatchType)
}

// Delete the chatroom from mine room
export const deleteChatRoom = (user, roomID) => (dispatch) => {
    const dispatchType = {
        'success': DELETE_CHATROOM,
        'error': DELETE_CHATROOM_ERROR
    }

    DeleteFetch(dispatch, `/api/roommember?user=${user}&room=${roomID}`, dispatchType)
}