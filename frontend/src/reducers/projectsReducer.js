import {
    PROJECTS_ERROR,
    PROJECTS_LOADED,
    PROJECTS_LOADING
} from '../actions/types';

/* Initialize a first ever state for getting the quote */



export default (state = [], action) => {
    switch (action.type) {
        case PROJECTS_LOADING:
            return state

        case PROJECTS_LOADED:
            return [...action.payload]

        default:
            return state
    }
}





