import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* newProgramSaga(){

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