import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* studentFeedbackSaga(){
    // yield takeEvery('ADD_COMMENT', addCommentSaga);
    yield takeEvery('GET_STUDENT_COMMENT', getStudentCommentSaga);
    // yield takeEvery('STUDENT_FEEDBACK_PAGE', studentFeedbackPage);
}





function* getStudentCommentSaga(){

    try{
        const studentCommentResponse = yield call(axios.get, `/api/studentFeedback`);
        yield put({
            type:'SET_STUDENT_COMMENT_REDUCER',
            payload: studentCommentResponse.data,
        })
    } catch(error){
        console.log('error in getting comment: ', error);
    }
}


function* postCommentSaga(action){
    try{
        yield call(axios.post, '/api/studentFeedback', action.payload);
        yield put({
            type:'GET_COMMENTS',
        })
    } catch(error){
        console.log('error on post addComment: ', error);
    }
}

// function* studentFeedbackSaga(){
//     try{
//         yield put({ type: USER_ACTIONS.FETCH_USER });
//         yield select()
//     }
// }

// function* getStudentProgram(action){
//     try{
//         yield call(axios.get, '/api/studentFeedback/program', action.payload);
//         yield put({
//             type:'SET_STUDENT_PROGRAM',
//         })
//     } catch (error){
//         console.log('error on get program in feedbacksaga', error);        
//     }
// }

export default studentFeedbackSaga;