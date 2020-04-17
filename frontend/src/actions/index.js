import { QUOTE_EDIT } from '../actions/types'
export const handleQuoteChange = data => {
    return dispatch => {
        dispatch({
            type: QUOTE_EDIT,
            payload: data
        })
    }
}










