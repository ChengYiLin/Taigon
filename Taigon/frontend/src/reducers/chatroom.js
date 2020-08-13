import {
    GET_ROOM_MSG,
    GET_ROOM_MSG_ERROR,
    SEND_IMG_MSG,
    SEND_IMG_MSG_ERROR,
    GET_ROOM_MEMBER,
    GET_ROOM_MEMBER_ERROR,
    GET_ROOM_IMAGE,
    GET_ROOM_IMAGE_ERROR,
} from '../actions/chatroom';

const initialState = {
    message: null,
    member: null,
    roomInform: null
}

function chatroom(state = initialState, action) {
    switch (action.type) {
        case GET_ROOM_MSG:
        case SEND_IMG_MSG:
            return ({
                ...state,
                message: action.payload
            })

        case GET_ROOM_MEMBER:
            return ({
                ...state,
                member: action.payload
            })

        case GET_ROOM_IMAGE:
            return ({
                ...state,
                roomInform: action.payload
            })

        case GET_ROOM_MSG_ERROR:
        case SEND_IMG_MSG_ERROR:
        case GET_ROOM_MEMBER_ERROR:
        case GET_ROOM_IMAGE_ERROR:
            console.log(`GET_ERROR : ${action.payload}`)
            return ({
                ...state,
            })

        default:
            return state
    }
}

export default chatroom;