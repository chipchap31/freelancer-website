import { LOGO_QUOTE, POSTER_QUOTE, WEBSITE_QUOTE } from '../actions/types';





export default (state = {}, action) => {


    switch (action.type) {
        case LOGO_QUOTE:


            return {
                ...state,

            }
        case POSTER_QUOTE:
            return action.payload
        case WEBSITE_QUOTE:
            return action.payload
        default:
            return state

    }


}