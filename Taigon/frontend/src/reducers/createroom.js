import {
    TOGGLE_CREATEROOM
} from '../actions/createroom';

const initialState = {
    showCreateRoom: false,
}

function createRoom(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_CREATEROOM:
            return ({
                ...state,
                showCreateRoom: !state.showCreateRoom
            })

        default:
            return state
    }
}

export default createRoom;