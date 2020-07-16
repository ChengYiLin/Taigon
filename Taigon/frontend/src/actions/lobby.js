export const GET_CHATROOM = 'GET_CHATROOM';
export const GET_CHATROOM_ERROR = 'GET_CHATROOM';


export const getChatRoom = () => (dispatch) => {
    const config = {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
    }

    fetch('http://localhost:8000/api/chatroom', config)
        .then(res => {
            if (res.ok) { return res.json() }
            else {
                throw ({ status: res.status, msg: res.statusText });
            }
        })
        .then(res=>{
            dispatch({
                type: GET_CHATROOM,
                payload: res
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CHATROOM_ERROR,
                payload: err.status
            });
        })
}