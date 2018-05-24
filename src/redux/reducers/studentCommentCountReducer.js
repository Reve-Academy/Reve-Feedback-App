import { combineReducers } from 'redux';


const studentCommentCountReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_COMMENT_COUNT_REDUCER':
            return action.payload
        default:
            return state
    }
}









export default combineReducers({
    studentCommentCountReducer
  });




