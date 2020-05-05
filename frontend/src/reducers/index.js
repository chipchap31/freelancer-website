import { combineReducers } from 'redux';
import quoteReducer from './quoteReducer';
import projectConfigReducer from './projectConfigReducer';
import servicesReducer from './servicesReducer';
import userReducer from './userReducer';
/** 
    * @function combineReducers
    * @returns { Object } i.e { quoteReducer: quoteReducer }
    * @description returns the reducers in to one object.
    *
    */
export default combineReducers({
    quoteReducer,
    servicesReducer,
    projectConfigReducer,
    userReducer
})