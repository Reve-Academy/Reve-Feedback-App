import { combineReducers } from 'redux';

const studentListReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_STUDENT_LIST_REDUCER':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    studentListReducer
  });