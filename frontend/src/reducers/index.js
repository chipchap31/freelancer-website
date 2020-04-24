import { combineReducers } from 'redux';
import quoteReducer from './quoteReducer';
import projectConfigReducer from './projectConfigReducer';
import servicesReducer from './servicesReducer';
export default combineReducers({
    quoteReducer,
    servicesReducer,
    projectConfigReducer
})