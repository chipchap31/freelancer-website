/** 
    * 
    */
import {
    QUOTE_EDIT,
    LOADING_CONFIG,
    LOADED_CONFIG,
    SERVICES_LOADING,
    SERVICES_LOADED,
    SERVICES_ERROR,
    QUOTE_REQUEST_LOAD,
    QUOTE_REQUEST_LOADED
} from '../actions/types'
import { postRequest } from '../utils/requests'

/** 
    * @function handleQuoteChange 
    * @param {Object} payload  onChange value when called i.e. { type: 'icon' }
    * @description - to be called when there is a change on input 
    * within the quote modules i.e. QuoteHome.js
    */
export const handleQuoteChange = payload => {
    return dispatch => { dispatch({ type: QUOTE_EDIT, payload }) }
}

/** 
    * @function handleAcceptingProject 
    */
export const handleAcceptingProject = () => async dispatch => {
    dispatch({ type: LOADING_CONFIG })

    try {
        const url = '/api/config/1';
        const response = await fetch(url);
        const payload = await response.json();

        if (response.status !== 200) {
            return dispatch({ type: ERROR_CONFIG })
        }

        return dispatch({ type: LOADED_CONFIG, payload })

    } catch (error) {
        console.log(error)
    }



}

/** 
    * 
    * @function handleServicesFetch 
    * @returns { Array } Arrays with objects 
    * @description Returns the services entered by the application admin.
    */
export const handleServicesFetch = () => async dispatch => {

    dispatch({ type: SERVICES_LOADING });

    try {
        const res = await fetch('/api/services/fetch');
        const payload = await res.json();

        if (res.status !== 200) {
            return dispatch({ type: SERVICES_ERROR })
        }

        return dispatch({ type: SERVICES_LOADED, payload });
    } catch (error) {
        return dispatch({ type: SERVICES_ERROR })
    }





}




export const handleQuoteRequest = (history, data) => async dispatch => {
    dispatch({ type: QUOTE_REQUEST_LOAD })


    const opt = {
        url: '/api/quote/request',
        body: data
    }
    try {
        const { data, status } = await postRequest({ ...opt });
        if (status != 200) {
            return
        }
        history.push('/get-quote/result')
        return dispatch({ type: QUOTE_REQUEST_LOADED, payload: data })
    } catch (error) {
        console.log(error);

    }




}