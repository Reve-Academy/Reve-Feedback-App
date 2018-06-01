import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import home_AllProgramSaga from './home_AllProgramsSaga';
import newProgramSaga from'./newProgramSaga';
import instructorFeedBackSaga from './instructorFeedBackSaga';
import studentListSaga from './studentListSaga';
import getStudentCommentCountSaga from './studentListSaga';
import manageAccountsSaga from './manageAccountsSaga';
import scheduleSaga from './scheduleSaga';
import studentFeedbackSaga from './studentFeedbackSaga';
import forgotPasswordSaga from './forgotPasswordSaga'
import weekSaga from './weekSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    home_AllProgramSaga(),
    newProgramSaga(),
    instructorFeedBackSaga(),
    studentFeedbackSaga(),
    studentListSaga(),
    manageAccountsSaga(),
    weekSaga(),
    scheduleSaga(),
    // watchIncrementAsync()
    studentFeedbackSaga(),
    forgotPasswordSaga()
  ]);
}
