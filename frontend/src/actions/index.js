import { QUOTE_LOGO_EDIT } from '../actions/types'
export const onChangeLogoQuote = data => {
    return dispatch => {
        dispatch({
            type: QUOTE_LOGO_EDIT,
            payload: data
        })
    }
}










