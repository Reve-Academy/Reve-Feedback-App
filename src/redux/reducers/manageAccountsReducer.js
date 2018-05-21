import { combineReducers } from 'redux';

const allAccountsReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_ACCOUNT_REDUCER':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    allAccountsReducer
  });