import { combineReducers } from 'redux';




const studentCommentReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_STUDENT_COMMENT_REDUCER':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    studentCommentReducer
  });