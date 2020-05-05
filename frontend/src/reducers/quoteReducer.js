import {
    QUOTE_EDIT,
    SERVICES_LOADED,
    QUOTE_REQUEST_LOAD,
    QUOTE_REQUEST_LOADED
} from '../actions/types';

/* Initialize a first ever state for getting the quote */
const initState = {
    company_name: '',
    concept_amount: 1,
    deadline_date: null,
    meeting_date: null,
    project_type: '',
    colors: ['#EEEE', '#EEEE', '#EEEE', '#EEEE', '#EEEE'],
    height: 0,
    width: 0,
    default_width: {},
    default_height: {},
    current: 0,
    description: '',
    quote_price: 0

}


export default (state = initState, action) => {
    switch (action.type) {
        case QUOTE_EDIT:
            /** 
                * In this case, we run return the action payload
                */
            return {
                ...state,
                ...action.payload
            }
        case SERVICES_LOADED:
            /** 
                * In this case we get extract the default heights and weight 
                * from each project type.
                */


            if (action.payload.length <= 0) {
                // return the current state if admin does not have any services
                return { ...state }
            }

            const project_type = action.payload[0].name

            return {
                ...state,
                project_type,
                default_width: getDefaultDimensions('default_width', [...action.payload]),
                default_height: getDefaultDimensions('default_height', [...action.payload]),
                height: action.payload.length > 0 ? Number(action.payload[0].default_height) : 0,
                width: action.payload.length > 0 ? Number(action.payload[0].default_width) : 0
            }
        case QUOTE_REQUEST_LOAD:
            return {
                ...state
            }
        case QUOTE_REQUEST_LOADED:


            const { quote_price } = action.payload;

            return {
                ...state, quote_price: Number(quote_price)
            }
        default:
            return state
    }
}


/** 
    * @function getDefaultDimensions
    * @param { String } target - the name and key value that we want to extract from 
    * the action.payload array. 
    * @param { Array } arr - the array must be implemented again to avoid errors of array going to zero value
    * @returns { Number } The dimension value of the specific target i.e. target="height" -> 16
    */
function getDefaultDimensions(target, arr) {


    let newArr = arr;
    let obj = {};
    newArr = newArr.map((x, i) => {
        const convertToLowerCase = x.name.toLowerCase();
        obj[convertToLowerCase] = Number(x[target])
    })

    return obj

}


