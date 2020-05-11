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
    QUOTE_REQUEST_LOADED,
    USER_LOGGING_IN,
    USER_LOGGED_IN,
    USER_LOGIN_ERROR,
    PROJECTS_LOADING,
    PROJECTS_LOADED,
    PROJECTS_ERROR,
    PROFILE_ERROR,
    PROFILE_LOADING,
    PROFILE_LOADED
} from '../actions/types'
import { postRequest, getRequest } from '../utils/requests';


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
        return dispatch({ type: LOADED_CONFIG, payload: { accept_project: false } })
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
        const response = await getRequest({
            url: '/api/services/fetch', auth: false
        });
        return dispatch({ type: SERVICES_LOADED, payload: response });
    } catch (error) {
        return dispatch({ type: SERVICES_ERROR })
    }





}




export const handleQuoteRequest = data => async dispatch => {
    dispatch({ type: QUOTE_REQUEST_LOAD });




    try {
        const response = await postRequest({
            url: '/api/payment/quote',
            body: data
        });




        return dispatch({ type: QUOTE_REQUEST_LOADED, payload: response })




    } catch (error) {
        console.log(error);

    }
}

export const handleProfileFetch = user_id => async dispatch => {
    dispatch({ type: 'PROFILE_LOADING' });
    try {
        const response = await getRequest({
            url: `/api/profile/${user_id}`,
            auth: true
        })


        dispatch({ type: 'PROFILE_LOADED', payload: response })
    } catch (error) {
        dispatch({ type: 'PROFILE_ERROR', payload: error })
    }

}

export const handleAuthentication = () => async dispatch => {
    dispatch({ type: USER_LOGGING_IN });
    try {
        const response = await getRequest({
            url: '/api/auth/user', auth: true
        });
        return dispatch({
            type: USER_LOGGED_IN, payload: {
                authenticated: true,

                user: response
            }
        })
    } catch (error) {
        return dispatch({ type: USER_LOGIN_ERROR, payload: { error: error.message } })
    }
}

export const handleLogin = data => async dispatch => {
    dispatch({ type: USER_LOGGING_IN })



    try {

        const response = await postRequest({
            url: '/api/auth/login',
            body: data
        });
        sessionStorage.setItem('token', response.token)
        sessionStorage.setItem('auth', response.user.id)
        dispatch({
            type: USER_LOGGED_IN, payload: {
                authenticated: true,
                user: response.user

            }
        })
        return true
    } catch (error) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('auth')
        console.log(error);

        return dispatch({ type: USER_LOGIN_ERROR, payload: { error: error.message } })
    }


}


export const handleUserProfile = data => async dispatch => {
    dispatch({ type: QUOTE_REQUEST_LOAD })
    try {
        const response = getRequest({
            url: `/api/user/profile/${data}`,
            auth: true
        })

    } catch (error) {
        console.log(error);

    }

}






export const handleProjectsFetch = () => async dispatch => {
    dispatch({ type: PROJECTS_LOADING });

    try {
        const response = await getRequest({
            url: '/api/projects',
            auth: true
        });

        dispatch({ type: PROJECTS_LOADED, payload: response });
    } catch (error) {
        dispatch({ type: PROJECTS_ERROR, payload: error });
    }
}