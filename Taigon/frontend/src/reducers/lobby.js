import {
    GET_CHATROOM,
    GET_CHATROOM_ERROR
} from '../actions/lobby';

const initialState = {
    chatroomList: ''
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

        default:
            return state
    }
}

export default lobby;