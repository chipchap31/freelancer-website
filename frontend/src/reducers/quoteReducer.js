import { QUOTE_EDIT } from '../actions/types';
import moment from 'moment';
/* Initialize a first ever state for getting the logo quote */
const initState = {
    companyName: '',
    conceptAmount: 1,
    deadlineDate: null,
    type: 'icon',
    colors: [],
    height: 16,
    width: 16,
    defaultWidth: {
        icon: 16,
        logo: 250,
        poster: 768
    },
    defaultHeight: {
        icon: 16,
        logo: 250,
        poster: 1632
    },
    current: 0

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
        case QUOTE_EDIT:
            return {
                ...state,
                ...action.payload

            }


        default:
            return state
    }
}