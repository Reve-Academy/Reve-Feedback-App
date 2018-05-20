import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* home_AllProgramSaga(){
    yield takeEvery('GET_PROGRAMS_SAGA', getProgramSaga);
}

function* getProgramSaga(action){
    try{
        const programResponse = yield call(axios.get, `/api/program/${action.payload.name}`)
        console.log('action payload of getProgramSaga', action.payload);
        yield put({
            type:'SET_PROGRAM_REDUCER',
            payload: programResponse.data,
        })
    } catch(error){
        console.log('error in getting program', error);
    }
}

export default home_AllProgramSaga;