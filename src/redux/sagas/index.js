import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import home_AllProgramSaga from './home_AllProgramsPage'


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    home_AllProgramSaga(),
    // watchIncrementAsync()
  ]);
}
