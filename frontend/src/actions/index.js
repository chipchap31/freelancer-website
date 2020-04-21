import {
    QUOTE_EDIT,
    LOADING_CONFIG,
    LOADED_CONFIG
} from '../actions/types'

// reusable post fn  


export const handleQuoteChange = data => {
    return dispatch => {
        dispatch({
            type: QUOTE_EDIT,
            payload: data
        })
    }
}

// register user after paying

export const handleUserRegister = data => async dispatch => {
    const url = '/api/auth/register'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    const payload = await response.json();

}

export const handleAcceptingProject = () => async dispatch => {
    dispatch({ type: LOADING_CONFIG })
    const url = '/api/config';
    try {
        const response = await fetch(url);
        const payload = await response.json();


        if (response.status !== 200) {
            dispatch({ type: ERROR_CONFIG })
        }

        dispatch({ type: LOADED_CONFIG, payload })

    } catch (error) {
        throw new Error(error)
    }



}



