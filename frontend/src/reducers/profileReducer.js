import {
    PROFILE_ERROR,
    PROFILE_LOADING,
    PROFILE_LOADED
} from '../actions/types';

/* Initialize a first ever state for getting the quote */



export default (state = {}, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return state

        case PROFILE_LOADED:
            return { ...action.payload }
        default:
            return state
    }
}





