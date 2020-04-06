import { FETCH_USER } from './types';

export const fetchUser = () => {

    return (dispatch) => {
        fetch("/api/user/auth", {
            method: "GET",
            headers: {}
        })
            .then(resp => resp.json())
            .then(resp => {

                dispatch({
                    type: FETCH_USER,
                    payload: {
                        token: resp.token
                    }
                })
            })
            .catch((error) => console.error(error))
    }
}



export const loginUser = data => {
    return (dispatch) => {
        fetch('/api/user/', {
            method: 'POST',
            headers: {}
        })
            .then(resp => resp.json())
            .then(resp => {
                dispatch({
                    type: FETCH_USER,
                    payload: {
                        token: resp.token
                    }
                })
            })
    }
}














// Quote action


export const getQuote = data => {


    return dispatch => {
        dispatch({ type: data.type, payload: data })
    }
}