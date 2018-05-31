import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* studentFeedbackSaga() {
	// yield takeEvery('ADD_COMMENT', addCommentSaga);
	yield takeEvery('GET_STUDENT_COMMENT', getStudentCommentSaga);
	yield takeEvery('SET_COMMENT_LIKE', postLikeSaga);
	yield takeEvery('REMOVE_COMMENT_LIKE', deleteLikeSaga);
	yield takeEvery('GET_WEEK_INFO', getWeekInfo);
}

function* getStudentCommentSaga() {
	try {
		const studentCommentResponse = yield call(axios.get, `/api/studentFeedback`);
		yield put({
			type: 'SET_STUDENT_COMMENT_REDUCER',
			payload: studentCommentResponse.data
		});
	} catch (error) {
		console.log('error in getting comment: ', error);
	}
}

function* getWeekInfo() {
	try {
		const weekInfoResponse = yield call(axios.get, `/api/studentFeedback/weeks/`);
		yield put({
			type: 'SET_WEEK_INFO_REDUCER',
			payload: weekInfoResponse.data
		});
	} catch (error) {
		console.log('error in getting comment: ', error);
	}
}

function* postCommentSaga(action) {
	try {
		console.log('post comment payload: ', action.payload);
		yield call(axios.post, '/api/studentFeedback', action.payload);
		yield put({
			type: 'GET_COMMENTS'
		});
	} catch (error) {
		console.log('error on post addComment: ', error);
	}
}

function* postLikeSaga(action) {
    
	try {
        const studentCommentLike = yield call(axios.post, `/api/studentFeedback/likes/`, action.payload);
		yield put({
			type: 'SET_LIKE_COMMENT_REDUCER',
			payload: studentCommentLike.data
		});
	} catch (error) {
		console.log('error in getting comment: ', error);
	}
}

function* deleteLikeSaga(action) {
	try {
		const unlikeComment = yield call(axios.delete, `/api/studentFeedback/likes/`, action.payload.comment_id);
		yield put({
			type: 'DELETE_LIKE_REDUCER',
			payload: unlikeComment.data
		});
	} catch (error) {
		console.log(' error in getting comment:', error);
	}
}

export default studentFeedbackSaga;
