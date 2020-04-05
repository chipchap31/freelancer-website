import { ICON_QUOTE } from '../actions/types'
export default (state = {}, action) => {
    switch (action.type) {
        case ICON_QUOTE:
            return action.payload
        default:
            return state

    }
}