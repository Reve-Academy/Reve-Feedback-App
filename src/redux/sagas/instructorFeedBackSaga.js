import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* instructorFeedBackSaga(){
    yield takeEvery('GET_FIRST_COMMENT', getFirstCommentSaga);
    yield takeEvery('ADD_COMMENT', addCommentSaga);
    yield takeEvery('DELETE_COMMENT', deleteCommentSaga);
    yield takeEvery('GET_COMMENTS', getAllCommentSaga);
}

function* getFirstCommentSaga(action){
    try{
        const firstResponse = yield call(axios.get, `/api/instructorFeedback/first/?id=${action.payload}` );
        yield put({
            type: 'SET_COMMENT_FEEDBACK',
            payload: firstResponse.data,
        })
    } catch(error){
        console.log('error in getting first comment: ', error);
    }
}

function* getAllCommentSaga(action){
    try{ 
        const commentResponse = yield call(axios.get, `/api/instructorFeedback/comment/?id=${action.payload}`);
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
        yield call(axios.post, '/api/instructorFeedback', action.payload);
        yield put({
            type:'GET_COMMENTS',
            payload: action.payload.week
        })
    } catch(error){
        console.log('error on post addComment: ', error);
    }
}

function* deleteCommentSaga(action){
    try{
        yield call(axios.delete, `/api/instructorFeedback/${action.payload.item.id}`)
        yield put({
            type: 'GET_COMMENTS',
            payload: action.payload.item.week_id,
        })
    } catch(error){
        console.log('Error in delete comment saga: ', error)
    }
}




export default instructorFeedBackSaga;