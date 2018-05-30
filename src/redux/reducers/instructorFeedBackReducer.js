import { combineReducers } from 'redux';

const allCommentsReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_COMMENT_FEEDBACK':
            return action.payload
        default:
            return state
    }
}

const weekIdReducer = (state =[1], action) =>{
    switch(action.type){
        case 'ID_FOR_THE_WEEK':
            return action.payload
        default:
            return state
    }
}

const weekNumberReducer = (state = {week: 1}, action) =>{
    switch(action.type){
        case 'WEEK_ID_LOCALSTATE':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    allCommentsReducer,
    weekNumberReducer,
    weekIdReducer
  });