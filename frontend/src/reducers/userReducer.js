import {
    USER_LOGGING_IN,
    USER_LOGGED_IN,
    USER_LOGIN_ERROR,
    PROFILE_LOADED,
    PASSWORD_CHANGE,
    USER_LOGOUT
} from "../actions/types";

const initState = {
    user: null,
    authenticated: JSON.parse(sessionStorage.getItem('auth')),
    isLoading: false,
    error: '',
    password_changed: null
}
export default function (state = initState, action) {


    switch (action.type) {

        case USER_LOGOUT:
            return {
                ...state,
                isLoading: false,
                authenticated: false

            }
        case USER_LOGGING_IN:
            return {
                ...state,
                isLoading: true,
                authenticated: false
            }
        case PROFILE_LOADED:
            return {
                ...state,
                password_changed: action.payload.password_changed
            }
        case USER_LOGGED_IN:

            return {
                ...state,
                ...action.payload,
                isLoading: false,
                authenticated: true,
                error: ''
            }
        case PASSWORD_CHANGE:
            return {
                ...state,
                password_changed: '1'
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