import { combineReducers } from 'redux';

const weekReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_WEEKS':
            return action.payload;
        default:
            return state
    }
}

export default combineReducers({
    weekReducer
})