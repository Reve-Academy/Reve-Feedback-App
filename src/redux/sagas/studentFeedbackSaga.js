import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* studentFeedbackSaga() {
	yield takeEvery('ADD_STUDENT_COMMENT', postCommentSaga);
	yield takeEvery('GET_STUDENT_COMMENT', getStudentCommentSaga);
	yield takeEvery('ADD_STUDENT_COMMENT_LIKE', postLikeSaga);
	yield takeEvery('GET_STUDENT_COMMENT_LIKE', getLikeSaga);
	yield takeEvery('REMOVE_COMMENT_LIKE', deleteLikeSaga);
	yield takeEvery('GET_WEEK_INFO', getWeekInfo);


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
			type: 'FETCH_COMMENTS'
		});
	} catch (error) {
		console.log('error on post addComment: ', error);
	}
}

function* getLikeSaga() {
	try {
		const likeInfoResponse = yield call(axios.get, `/api/studentFeedback/likes/`);
		yield put({
			type: 'SET_COMMENT_LIKE_REDUCER',
			payload: likeInfoResponse.data
		});
	} catch (error) {
		console.log('error in getting comment: ', error);
	}
}

function* postLikeSaga(action) {
	try {
		const studentCommentLike = yield call(axios.post, `/api/studentFeedback/likes/`, action.payload);
		yield put({
			type: 'GET_STUDENT_COMMENT_LIKE'
		});
	} catch (error) {
		console.log('error in getting comment: ', error);
	}
}


function* deleteLikeSaga(action) {
	try {
		const unlikeComment = yield call(axios.delete, `/api/studentFeedback/likes/${action.payload}`);
		yield put({
			type: 'GET_STUDENT_COMMENT_LIKE'
		});
	} catch (error) {
		console.log(' error in deleting like:', error);
	}
}

export default studentFeedbackSaga;