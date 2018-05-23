import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* studentListSaga(){
    yield takeEvery('GET_STUDENT_LIST_SAGA', getStudentListSaga);

}


function* getStudentListSaga(){
    console.log('from Student list reducer')
    try{
        const listResponse = yield call(axios.get, `/api/instructorStudentList`)
        console.log(listResponse)
        yield put({
            type:'SET_STUDENT_LIST_REDUCER',
            payload: listResponse.data,
        })
    } catch(error){
        console.log('get studentList error: ', error);
    }
}

function* getStudentCommentCountSaga(){
    try{
        const commentResponse = yield call(axios.get, `/api/instructorStudentList`)
        console.log(commentResponse)
        yield put({
            type:'SET-STUDENT_LIST_REDUCER',
            payload: commentResponse.data,
        })
    }catch(error){
        console.log('getComment error', error);
    }
}

export default studentListSaga;