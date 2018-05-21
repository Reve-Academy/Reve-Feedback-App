import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* home_AllProgramSaga(){
    yield takeEvery('GET_PROGRAM_SAGA', getProgramSaga);
    yield takeEvery('DELETE_PROGRAM_SAGA', deleteProgramSaga);
    yield takeEvery('UPDATE_PROGRAM_SAGA', updateProgramSaga);
}

function* getProgramSaga(){
    try{
        const programResponse = yield call(axios.get, `/api/program`)
        yield put({
            type:'SET_PROGRAM_REDUCER',
            payload: programResponse.data,
        })
    } catch(error){
        console.log('get program error: ', error);
    }
}

function* deleteProgramSaga(action){
    try{   
        console.log('delete Program payload is', action.payload)
        yield call(axios.delete, `/api/program/${action.payload.id}`)
        yield put({
            type: 'GET_PROGRAM_SAGA',
        })
    }catch (error){
        console.log('delete program error: ', error)
    }
}

function* updateProgramSaga(action){
    try{
        console.log('update Program payload is: ', action.payload)
        yield call(axios.put, `/api/program/${action.payload.id}`, action.payload )
        yield put({
            type:'GET_PROGRAM_SAGA'
        })
    } catch (error) {
        console.log('update program error: ', error)
    }

}

export default home_AllProgramSaga;