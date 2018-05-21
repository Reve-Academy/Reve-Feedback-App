import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* manageAccountsSaga(){
    yield takeEvery('GET_ACCOUNT_SAGA', getAccountSaga);
    yield takeEvery('UPDATE_ADMIN_STATUS', updateAdminStatusSaga);
    yield takeEvery('UPDATE_ACTIVE_STATUS', updateActivationStatusSaga);
    yield takeEvery('DELETE_ACCOUNT', deleteAccountSaga);
    yield takeEvery('POST_ACCOUNT', postAccountSaga);
}

function* postAccountSaga(action){
    try{
        console.log('post Account payload: ', action.payload);
        yield call(axios.post, '/api/manage', action.payload)
        yield put({
            type: 'GET_ACCOUNT_SAGA'
        })
    } catch (error){
        console.log(`error on post: `, error);
    }
}

function* deleteAccountSaga(action){
    try{   
        console.log('delete Account payload is', action.payload)
        yield call(axios.delete, `/api/manage/${action.payload.id}`)
        yield put({
            type: 'GET_PROGRAM_SAGA',
        })
    }catch (error){
        console.log('delete program error: ', error)
    }
}

function* getAccountSaga(){
    try{
        const accountResponse = yield call(axios.get, `/api/manage`)
        yield put({
            type:'SET_ACCOUNT_REDUCER',
            payload: accountResponse.data,
        })
    } catch(error){
        console.log('get program error: ', error);
    }
}

function* updateAdminStatusSaga(action){
    try{
        console.log('update adminstatus payload: ', action.payload)
        yield call(axios.put, `/api/manage/admin/${action.payload.id}`, action.payload )
        yield put({
            type:'GET_ACCOUNT_SAGA'
        })
    } catch (error) {
        console.log('update admin error: ', error)
    }
}

function* updateActivationStatusSaga(action){
    try{
        console.log('update active status payload: ', action.payload)
        yield call(axios.put, `/api/manage/activate/${action.payload.id}`, action.payload )
        yield put({
            type:'GET_ACCOUNT_SAGA'
        })
    } catch (error) {
        console.log('update program error: ', error)
    }
}


export default manageAccountsSaga;