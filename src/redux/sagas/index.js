import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import home_AllProgramSaga from './home_AllProgramsSaga';
import newProgramSaga from'./newProgramSaga';
import instructorFeedBackSaga from './instructorFeedBackSaga';
import studentListSaga from './studentListSaga';
import manageAccountsSaga from './manageAccountsSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    home_AllProgramSaga(),
    newProgramSaga(),
    instructorFeedBackSaga(),
    studentListSaga(),
    manageAccountsSaga()
    // watchIncrementAsync()
  ]);
}
