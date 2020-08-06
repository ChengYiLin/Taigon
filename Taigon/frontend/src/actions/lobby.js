import { GetFetch, PostFetch } from './global_function';

export const CHANGE_NOW_CATEGORY = 'CHANGE_NOW_CATEGORY';
export const GET_CHATROOM = 'GET_CHATROOM';
export const GET_CHATROOM_ERROR = 'GET_CHATROOM_ERROR';
export const GET_CHATROOM_CATEGORY = 'GET_CHATROOM_CATEGORY';
export const GET_CHATROOM_CATEGORY_ERROR = 'GET_CHATROOM_CATEGORY_ERROR';



// Get Categories
export const getCategories = () => (dispatch) => {
    const dispatchType = {
        'success': GET_CHATROOM_CATEGORY,
        'error': GET_CHATROOM_CATEGORY_ERROR
    }

    GetFetch(dispatch, '/api/roomcategory/', dispatchType)
}

// Change Now Category
export const changeNowCategory = (clickId) => (dispatch, getState) => {
    dispatch({ type: CHANGE_NOW_CATEGORY, payload: clickId })

    // ??????????????????????????
    // getChatroomByCategory(getState().lobby.now_category)
    // --- Get New Room after change
    const dispatchType = {
        'success': GET_CHATROOM,
        'error': GET_CHATROOM_ERROR
    }

    GetFetch(dispatch, `/api/chatroom?category=${getState().lobby.now_category}`, dispatchType)
}

// Get Chatroom by Category
export const getChatroomByCategory = (categoryId) => (dispatch) => {
    const dispatchType = {
        'success': GET_CHATROOM,
        'error': GET_CHATROOM_ERROR
    }

    GetFetch(dispatch, `/api/chatroom?category=${categoryId}`, dispatchType)
}