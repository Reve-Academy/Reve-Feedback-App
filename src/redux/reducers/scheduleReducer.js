import { combineReducers } from 'redux';

const weekReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_WEEKS':
            return action.payload;
        default:
            return state
    }
}

const FocusReducer = (state= [], action) => {
    switch(action.type){
        case 'ADD_FOCUS':
            return [...state, action.payload];
        default:
            return state
    }
}

export default combineReducers({
    weekReducer,
    FocusReducer
})