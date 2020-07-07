import { GET_ALLACCOUNT, GET_ALLACCOUNT_ERROR } from '../actions/account';

const initialState = {
    accounts: [],
    ajax_error: {}
}

function accounts(state = initialState, action) {
    switch (action.type) {
        case GET_ALLACCOUNT:
            return {
                ...state,
                accounts: action.payload
            }
        case GET_ALLACCOUNT_ERROR:
            return {
                ...state,
                ajax_error:{
                    status: action.payload.status,
                    msg: action.payload.msg
                }
            }
        default:
            return state;
    }
}

export default accounts