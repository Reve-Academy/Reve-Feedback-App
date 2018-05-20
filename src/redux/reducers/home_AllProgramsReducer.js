import { combineReducers } from 'redux';

const allProgramsReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_PROGRAM_REDUCER':
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    allProgramsReducer
  });