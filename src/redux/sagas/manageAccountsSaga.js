import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* manageAccountsSaga(){
    yield takeEvery('GET_ACCOUNT_SAGA', getAccountSaga);
}

function* getAccountSaga(action){
    try{
        const accountResponse = yield call(axios.get, `/api/manage/${action.payload.name}`)
        console.log('action payload of getAccountSaga', action.payload);
        yield put({
            type:'SET_ACCOUNT_REDUCER',
            payload: accountResponse.data,
        })
    } catch(error){
        console.log('get program error: ', error);
    }
}

export default manageAccountsSaga;