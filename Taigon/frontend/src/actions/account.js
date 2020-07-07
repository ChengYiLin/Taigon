export const GET_ALLACCOUNT = "GET_ALLACCOUNT";
export const GET_ALLACCOUNT_ERROR = "GET_ALLACCOUNT_ERROR";

export const getAccounts = () => dispatch => {
    fetch('http://localhost:8000/api/account/')
        .then(res => {
            if (res.ok) { return res.json() }
            throw ({ status: res.status, msg: res.statusText });
        })
        .then(data => {
            dispatch({
                type: GET_ALLACCOUNT,
                payload: data
            });
        })
        .catch((error) => {
            dispatch(getAccountsError(error.status, error.msg));
        })

};

const getAccountsError = (status, msg) => ({
    type: GET_ALLACCOUNT_ERROR,
    payload: {status: status, msg: msg}
})