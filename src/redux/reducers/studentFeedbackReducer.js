import { combineReducers } from 'redux';

const studentFeedbackReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_STUDENT_COMMENTS':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    studentFeedbackReducer
  });