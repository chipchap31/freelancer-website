import { combineReducers } from 'redux';
import quoteReducer from './quoteReducer'
import projectConfigReducer from './projectConfigReducer'
export default combineReducers({
    quoteReducer,

    projectConfigReducer
})