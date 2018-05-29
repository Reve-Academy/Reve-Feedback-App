import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* studentFeedbackSaga(){
    // yield takeEvery('ADD_COMMENT', addCommentSaga);
    yield takeEvery('GET_STUDENT_COMMENTS', getStudentCommentSaga);
}





function* getStudentCommentSaga(action){
    try{
        const studentCommentResponse = yield call(axios.get, `/api/instructorFeedback/comment`);
        console.log(studentCommentResponse);
        yield put({
            type:'SET_STUDENT_FEEDBACK',
            payload: studentCommentResponse.data,
        })
    } catch(error){
        console.log('error in getting comment: ', error);
    }
}

export default studentFeedbackSaga;