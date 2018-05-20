import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import home_AllProgramPageReducer from './home_AllProgramsReducer'

const store = combineReducers({
  user,
  login,
  home_AllProgramPageReducer
});

export default store;
