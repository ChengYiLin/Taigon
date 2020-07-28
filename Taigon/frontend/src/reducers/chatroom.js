import {
    GET_ROOM_MSG,
    GET_ROOM_MSG_ERROR,
    SEND_NEW_MSG,
    SEND_NEW_MSG_ERROR,
    GET_ROOM_MEMBER,
    GET_ROOM_MEMBER_ERROR
} from '../actions/chatroom';

const initialState = {
    message: null,
    member: null
}

function chatroom(state = initialState, action) {
    switch (action.type) {
        case GET_ROOM_MSG:
        case SEND_NEW_MSG:
            return ({
                ...state,
                message: action.payload
            })

        case GET_ROOM_MEMBER:
            return({
                ...state,
                member: action.payload
            })

        case GET_ROOM_MSG_ERROR:
        case SEND_NEW_MSG_ERROR:
        case GET_ROOM_MEMBER_ERROR:
            console.log(`GET_ERROR : ${action.payload}`)
            return ({
                ...state,
            })

        default:
            return state
    }
}

export default chatroom;