import { combineReducers } from 'redux';




const studentProgramReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_STUDENT_PROGRAM':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    studentProgramReducer
  });