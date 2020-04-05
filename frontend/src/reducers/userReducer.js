import { FETCH_USERS } from '../actions/types';
export default function (state = null, action) {

    switch (action.type) {


        case FETCH_USERS:
            return { id: action.payload || null }
        default:
            return state
    }
}