import { combineReducers } from 'redux';

const newTokenReducer = (state = [], action) =>{
    switch(action.type){
        case 'UPDATE_NEW_TOKEN':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    newTokenReducer
  });