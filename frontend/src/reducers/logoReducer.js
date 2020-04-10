import { QUOTE_LOGO_EDIT } from '../actions/types';
import moment from 'moment';
/* Initialize a first ever state for getting the logo quote */
const initState = {
    firstname: '',
    lastname: '',
    email: '',
    companyName: '',
    prototypeAmount: 1,
    deadline: false,
    deadlineDate: false,
    estimate: 125,
    submitDisable: true,
    deadlineDateInvalid: true
}
const dateNow = moment(new Date);


function calculateEstimate(data) {
    // check if a date is selected

    const initialPrice = 100;
    const prototypePriceMultiplier = 25;

    const prototypePrice = initialPrice + (prototypePriceMultiplier * data.prototypeAmount);

    const dateExist = data.deadlineDate || false;

    const dateInput = dateExist ? moment(data.deadlineDate) : false

    // set the difference in date from now to zero if no date is set

    const dateDiff = data.deadlineDate ? dateInput.diff(dateNow, 'days') : 0;

    const dateDiffMult = 10 - dateDiff;

    const deadlineExistPrice = prototypePrice + ((dateDiffMult >= 0 ? dateDiffMult : 0) * 50);

    if (!data.deadline) {
        return prototypePrice;
    } else if (data.deadlineDate) {
        if (deadlineExistPrice > 0) {
            return deadlineExistPrice
        } else {
            return prototypePrice
        }
    } else {
        return prototypePrice
    }
}



export default (state = initState, action) => {
    switch (action.type) {
        case QUOTE_LOGO_EDIT:
            const dateDiff = action.payload.deadlineDate ? moment(action.payload.deadlineDate).diff(dateNow, 'days') : 0
            return {
                ...state,
                ...action.payload,
                deadlineDate: action.payload.deadline ? action.payload.deadlineDate : false,
                estimate: calculateEstimate(action.payload),
                buyDisable: action.payload.companyName && action.payload.email ? false : true,
                deadlineDateInvalid: dateDiff > 2 ? false : true
            }


        default:
            return state
    }
}