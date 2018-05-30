import { combineReducers } from 'redux';

const weekReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_WEEKS':
            return action.payload;
        default:
            return state
    }
}


const focusReducer = (state= [], action) => {
    switch(action.type){
        case 'ADD_FOCUS':
            return [...state, action.payload];
        default:
            return state;
    }
}

const thisWeekReducer = (state = {}, action) => {
    switch(action.type){
        case 'THIS_WEEK':
            return {weekId: action.payload};
        default: 
            return state;
    }
}

export default combineReducers({
    weekReducer,
    focusReducer,
    thisWeekReducer
})