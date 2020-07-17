import {
    GET_CHATROOM,
    GET_CHATROOM_ERROR,
    GET_NOW_ROOM,
    LEAVE_ROOM
} from '../actions/lobby';

const initialState = {
    chatroomList: '',
    currentRoom: null,
    currentRoomId: null
}

function lobby(state = initialState, action) {
    switch (action.type) {
        case GET_CHATROOM:
            return ({
                ...state,
                chatroomList: action.payload
            })

        case GET_CHATROOM_ERROR:
            console.log(`GET_CHATROOM_ERROR : ${action.payload}`)
            return ({
                ...state,
            })

        case GET_NOW_ROOM:
            return ({
                ...state,
                currentRoomId: action.payload[0],
                currentRoom: action.payload[1]
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