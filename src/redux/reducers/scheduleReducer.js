import { combineReducers } from 'redux';

const weekReducer = (state = [], action) => {
    switch(action.type){
        case 'SET_WEEKS':
            return action.payload;
        default:
            return state
    }
}


let dummyArray = [{ name: 'blue', x: 0, y: 0, w: 2, h: 1 }, { name: 'red', x: 2, y: 5, w: 2, h: 1 }, { name: 'green', x: 4, y: 0, w: 1, h: 1 }, { name: 'orange', x: 3, y: 0, w: 1, h: 1 }, { name: 'magenta', x: 2, y: 0, w: 1, h: 1}]
const focusReducer = (state= [], action) => {
    switch(action.type){
        case 'ADD_FOCUS':
            return [...state, action.payload];
        default:
            return state;
    }
    // return dummyArray;
}

export default combineReducers({
    weekReducer,
    focusReducer
})