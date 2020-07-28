import {
    GET_CHATROOM,
    GET_CHATROOM_ERROR,
    GET_NOW_ROOM,
    LEAVE_ROOM,
    CREATE_CHATROOM,
    CREATE_CHATROOM_ERROR,
    GET_ROOM_CATEGORIES,
    GET_ROOM_CATEGORIES_ERROR,
    GET_USER_CHATROOM,
    GET_USER_CHATROOM_ERROR
} from '../actions/lobby';

const initialState = {
    chatroomList: '',
    currentRoom: null,
    currentRoomId: null,
    categories: null,
    mineChatrooms:''
}

function lobby(state = initialState, action) {
    switch (action.type) {
        case GET_CHATROOM:
        case CREATE_CHATROOM:
            return ({
                ...state,
                chatroomList: action.payload
            })

        case GET_CHATROOM_ERROR:
        case CREATE_CHATROOM_ERROR:
        case GET_ROOM_CATEGORIES_ERROR:
        case GET_USER_CHATROOM_ERROR:
            return ({
                ...state,
            })

        case GET_NOW_ROOM:
            return ({
                ...state,
                currentRoomId: action.payload[0],
                currentRoom: action.payload[1]
            })

        case GET_ROOM_CATEGORIES:
            return ({
                ...state,
                categories: action.payload,
            })

        case GET_USER_CHATROOM:
            return ({
                ...state,
                mineChatrooms: action.payload
            })

        case LEAVE_ROOM:
            return ({
                ...state,
                currentRoom: action.payload,
                currentRoomId: action.payload
            })

        default:
            return state
    }
}

export default lobby;