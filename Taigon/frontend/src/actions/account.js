export const GET_ALLACCOUNT = "GET_ALLACCOUNT";

export const getAccounts = () => dispatch => {
    fetch('http://localhost:8000/api/account/')
        .then((res) => res.json())
        .then(data => {
            dispatch({
                type: GET_ALLACCOUNT,
                payload: data
            });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};