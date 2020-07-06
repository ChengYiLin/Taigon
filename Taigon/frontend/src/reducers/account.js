import { GET_ALLACCOUNT } from '../actions/account';

const initialState = {
    accounts: []
}

function accounts(state = initialState, action) {
    switch (action.type) {
        case GET_ALLACCOUNT:
            return {
                ...state,
                accounts: action.payload
            }
        default:
            return state;
    }
}

export default accounts