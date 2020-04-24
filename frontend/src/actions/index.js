import {
    QUOTE_EDIT,
    LOADING_CONFIG,
    LOADED_CONFIG
} from '../actions/types'
import { postRequest } from '../utils/requests'


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




    console.log();

}

export const handleAcceptingProject = () => async dispatch => {
    dispatch({ type: LOADING_CONFIG })
    const url = '/api/config/1';
    try {
        const response = await fetch(url);
        const payload = await response.json();


        if (response.status !== 200) {
            return dispatch({ type: ERROR_CONFIG })
        }

        return dispatch({ type: LOADED_CONFIG, payload })

    } catch (error) {
        throw new Error(error)
    }



}



