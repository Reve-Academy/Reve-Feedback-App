import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import home_AllProgramSaga from './home_AllProgramsSaga';
import newProgramSaga from'./newProgramSaga';
import manageAccountsSaga from './manageAccountsSaga'
import instructorFeedBackSaga from './instructorFeedBackSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    home_AllProgramSaga(),
    newProgramSaga(),
    manageAccountsSaga(),
    instructorFeedBackSaga(),
    // watchIncrementAsync()
  ]);
}
