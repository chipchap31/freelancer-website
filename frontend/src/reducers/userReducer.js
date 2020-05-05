import {
    USER_LOGGING_IN,
    USER_LOGGED_IN,
    USER_LOGIN_ERROR
} from "../actions/types";

const initState = {
    user: null,
    authenticated: false,
    isLoading: false,
    error: ''
}
export default function (state = initState, action) {


    switch (action.type) {


        case USER_LOGGING_IN:
            return {
                ...state,
                isLoading: true,
                authenticated: false
            }

        case USER_LOGGED_IN:

            return {
                ...state,
                ...action.payload,
                isLoading: false,
                authenticated: true
            }


        case USER_LOGIN_ERROR:

            return {
                ...state,
                ...action.payload,
                isLoading: false,
                authenticated: false
            }
        default:
            return state
    }
}