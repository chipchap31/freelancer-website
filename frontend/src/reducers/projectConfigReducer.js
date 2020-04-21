import { LOADED_CONFIG, LOADING_CONFIG } from '../actions/types';
const initState = {
    accept_project: JSON.parse(localStorage.getItem('accept_project')),
    isLoading: false
}

export default function (state = initState, action) {



    switch (action.type) {
        case LOADING_CONFIG:

            return { ...state, isLoading: true }


        case LOADED_CONFIG:
            localStorage.setItem('accept_project', action.payload.accept_project)
            return { ...state, ...action.payload, isLoading: false }
        default:
            return state
    }
}