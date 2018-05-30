import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* forgotPasswordSaga(){
    yield takeEvery('UPDATE_NEW_TOKEN', updatePasswordTokenSaga);

}

//UPDATE TOKEN
function* updatePasswordTokenSaga(action){
    console.log('in update token saga', action)
    try{
        console.log('update token: ', action.payload)
        yield call(axios.put, `/api/resetPassword/${action.payload.username}`)
    } catch (error) {
        console.log('update token error: ', error)
    }
}

export default updatePasswordTokenSaga;

