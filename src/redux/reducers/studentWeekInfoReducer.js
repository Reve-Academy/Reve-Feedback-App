import { combineReducers } from 'redux';

const studentWeekInfoReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_WEEK_INFO_REDUCER':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
   studentWeekInfoReducer
  });