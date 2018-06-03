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
        case 'SET_FOCUS_INFO':
            return action.payload;
        case 'CLEAR_SCHEDULE':
            return [];
        default:
            return state;
    }
}

const thisWeekReducer = (state = {weekId: 0}, action) => {
    switch(action.type){
        case 'THIS_WEEK':
            return {weekId: action.payload};
        default: 
            return state;
    }
}

const viewFocusInfo = (state = [], action) => {
    switch(action.type){
        case 'SET_STRATEGY_INFO':
            return action.payload;
        default:
            return state;
    }
}

const weekNumberReducer = (state = {weekNumber: 1}, action) => {
    switch(action.type){
        case 'WEEK_NUMBER':
            return {weekNumber: action.payload};
        case 'SET_DEFAULT_WEEK_NUMBER':
            return {weekNumber: action.payload};
        default:
            return state;
    }
}



const weekThemeReducer = (state = {weekTheme: 'Brainstorming'}, action) => {
    switch(action.type){
        case 'WEEK_THEME':
            return {weekTheme: action.payload};
        default:
            return state;
    }
}

const weekDescriptionReducer = (state = {weekDescription: 'description'}, action) => {
    switch(action.type){
        case 'WEEK_DESCRIPTION':
            return {weekDescription: action.payload};
        default:
            return state;
    }
}

export default combineReducers({
    weekReducer,
    focusReducer,
    thisWeekReducer,
    viewFocusInfo,
    weekNumberReducer, 
    weekThemeReducer,
    weekDescriptionReducer
})