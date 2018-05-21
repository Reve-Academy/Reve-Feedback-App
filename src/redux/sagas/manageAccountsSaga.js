import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* manageAccountsSaga(){
    
    
}

function* getAccountSaga(action){
    try{
        const accountResponse = yield call(axios.get, `/api/manage/${action.payload.name}`)
        console.log('action payload of getProgramSaga', action.payload);
        yield put({
            type:'SET_PROGRAM_REDUCER',
            payload: programResponse.data,
        })
    } catch(error){
        console.log('get program error: ', error);
    }
}

export default manageAccountsSaga;