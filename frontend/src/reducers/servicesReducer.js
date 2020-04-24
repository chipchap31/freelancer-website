import { SERVICES_LOADING, SERVICES_LOADED } from '../actions/types';
export default function (state = [], action) {

    switch (action.type) {


        case SERVICES_LOADING:
            return []

        case SERVICES_LOADED:
            return [...state, ...action.payload]
        default:
            return state
    }
}