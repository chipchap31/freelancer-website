import { FETCH_USERS } from '../actions/types';
export default function (state=null, action){
    console.log(action.type);
    switch(action.type){
        
        
        case FETCH_USERS: 
            return { id: action.payload || null }
        default:
            return  state
    }
}