import {
    PROFILE_ERROR,
    PROFILE_LOADING,
    PROFILE_LOADED
} from '../actions/types';

/* Initialize a first ever state for getting the quote */

const init = {
    first_name: '',
    last_name: '',
    email: '',
    county: '',
    mobile: '',
    city: '',
    address_line1: '',
    address_line2: ''


}

export default (state = init, action) => {
    console.log(action);

    switch (action.type) {
        case PROFILE_LOADING:
            return state

        case PROFILE_LOADED:
            return { ...action.payload }

        case PROFILE_ERROR:
            return init
        default:
            return state
    }
}





