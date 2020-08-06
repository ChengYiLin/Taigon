import {
    CHANGE_NOW_CATEGORY,
    GET_CHATROOM,
    GET_CHATROOM_ERROR,
    GET_CHATROOM_CATEGORY,
    GET_CHATROOM_CATEGORY_ERROR,
} from '../actions/lobby';

const initialState = {
    now_category: 1,
    room_category: null,
    room_list: null,
    error_message: ''
}

function lobby(state = initialState, action) {
    switch (action.type) {
        case CHANGE_NOW_CATEGORY:
            return ({
                ...state,
                now_category: action.payload
            })

        case GET_CHATROOM_CATEGORY:
            return ({
                ...state,
                room_category: action.payload
            })

        case GET_CHATROOM:
            return ({
                ...state,
                room_list: action.payload
            })

        case GET_CHATROOM_ERROR:
        case GET_CHATROOM_CATEGORY_ERROR:
            return ({
                ...state,
                error_message: action.payload,
            })

        default:
            return state
    }
}

export default lobby;