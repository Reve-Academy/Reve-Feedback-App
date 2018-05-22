import { call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* newProgramSaga(){
    yield takeEvery('POST_NEW_PROGRAM', postProgramSaga);
}

function* postProgramSaga(action){
    try{
        console.log('post Account payload: ', action.payload);
        yield call(axios.post, '/api/newProgram', action.payload)
    } catch (error){
        console.log(`error on post newProgram: `, error);
    }
}

export default newProgramSaga;