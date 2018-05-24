import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import home_AllProgramPageReducer from './home_AllProgramsReducer';
import manageAccountsReducer from './manageAccountsReducer';
import studentListReducer from './studentListReducer';
import instructorFeedBackReducer from './instructorFeedBackReducer';


const store = combineReducers({
  user,
  login,
  home_AllProgramPageReducer,
  manageAccountsReducer,
  studentListReducer,
  instructorFeedBackReducer,
});
//hello
export default store;
