import { combineReducers } from 'redux';

const allCommentsReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_COMMENT_FEEDBACK':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    allCommentsReducer
  });