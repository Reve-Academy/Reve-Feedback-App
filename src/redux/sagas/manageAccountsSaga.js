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
    console.log('in post account saga')
    try{
        console.log('post Account payload: ', action.payload);
        yield call(axios.post, '/api/manage', action.payload)
        yield put({
            type: 'GET_ACCOUNT_SAGA'
        })
    } catch (error){
        console.log(`error on posting a started account that will require verification:`, error);
    }
}


//SAGA TO DELETE ACCOUNT
function* deleteAccountSaga(action){
    try{   
        console.log('delete Account payload is', action.payload)
        yield call(axios.delete, `/api/manage/${action.payload.id}`)
        yield put({
            type: 'GET_ACCOUNT_SAGA',
        })
    }catch (error){
        console.log('delete account error: ', error)
    }
}

//SAGA TO GET ALL ACCOUT INFORMATION
function* getAccountSaga(){
    try{
        const accountResponse = yield call(axios.get, `/api/manage`)
        yield put({
            type:'SET_ACCOUNT_REDUCER',
            payload: accountResponse.data,
        })
    } catch(error){
        console.log('get account error: ', error);
    }
}

//SAGA TO UPDATE ACCOUNT ADMIN STATUS
function* updateAdminStatusSaga(action){
    action.payload.instructor= !action.payload.instructor
    try{
        console.log('update adminstatus payload: ', action.payload)
        yield call(axios.put, `/api/manage/${action.payload.id}`, action.payload )
        yield put({
            type:'GET_ACCOUNT_SAGA'
        })
    } catch (error) {
        console.log('update admin error: ', error)
    }
}

//SAGA TO UPDATE ACCOUNT ACTIVE STATUS
function* updateActivationStatusSaga(action){
    action.payload.active= !action.payload.active
    try{
        console.log('update active status payload: ', action.payload)
        yield call(axios.put, `/api/manage/${action.payload.id}`, action.payload )
        yield put({
            type:'GET_ACCOUNT_SAGA'
        })
    } catch (error) {
        console.log('update account error: ', error)
    }
}


export default manageAccountsSaga;