import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* instructorFeedBackSaga(){
    yield takeEvery('ADD_COMMENT', addCommentSaga);
}

function* addCommentSaga(action){
    try{
        console.log('post comment payload: ', action.payload);
        yield call(axios.post, '/api/instructorFeedback', action.payload);
    } catch(error){
        console.log('error on post addComment: ', error);
    }
}



export default instructorFeedBackSaga;