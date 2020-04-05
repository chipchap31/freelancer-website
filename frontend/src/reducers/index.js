import { combineReducers } from 'redux';
import userReducer from './userReducer';
import quoteReducer from './quoteReducer';
export default combineReducers({
    userReducer,
    quoteReducer
})