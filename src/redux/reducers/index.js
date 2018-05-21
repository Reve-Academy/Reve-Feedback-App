import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import home_AllProgramPageReducer from './home_AllProgramsReducer';
import manageAccountsReducer from './manageAccountsReducer';
import Home_AllProgramsPage from '../../components/Home/Home_AllProgramsPage';

const store = combineReducers({
  user,
  login,
  home_AllProgramPageReducer,
  manageAccountsReducer,
});
//hello
export default store;
