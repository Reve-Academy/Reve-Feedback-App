import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* instructorFeedBackSaga(){
    yield takeEvery('ADD_COMMENT', addCommentSaga);
    yield takeEvery('DELETE_COMMENT', deleteCommentSaga);
    yield takeEvery('GET_COMMENTS', getAllCommentSaga);
}

function* getAllCommentSaga(action){
    try{
        const commentResponse = yield call(axios.get, `/api/instructorFeedback`);
        console.log(commentResponse);
        yield put({
            type:'SET_COMMENT_FEEDBACK',
            payload: commentResponse.data,
        })
    } catch(error){
        console.log('error in getting comment: ', error);
    }
}

function* addCommentSaga(action){
    try{
        console.log('post comment payload: ', action.payload);
        yield call(axios.post, '/api/instructorFeedback', action.payload);
    } catch(error){
        console.log('error on post addComment: ', error);
    }
}

function* deleteCommentSaga(action){
    try{
        console.log('deleting comment id number: ', action.payload.comment.id);
        yield call(axios.delete, `/api/instructorFeedback/${action.payload.comment.id}`)
        yield put({
            type: 'GET_COMMENTS',
        })
    } catch(error){
        console.log('Error in delete comment saga: ', error)
    }
}





export default instructorFeedBackSaga;