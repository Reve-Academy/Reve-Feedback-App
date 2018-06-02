import { combineReducers } from 'redux';

const studentProgramReducer = (state = [], action) =>{
    switch(action.type){
        case 'SET_PROGRAM_INFO':
            return action.payload[0]
        default:
            return state
    }
}

export default combineReducers({
    studentProgramReducer
});