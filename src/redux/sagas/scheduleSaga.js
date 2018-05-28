import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* scheduleSaga(){
    yield takeEvery('FETCH_PROGRAM_WEEKS', programWeekSaga)
}

function* programWeekSaga(action){
    try{
        //dispatch action to get specific weeks that are related to program
        const weekResponse = yield call(axios.get, `/api/instructorSchedule/weeks/?id=${action.payload.program_id}`)

        //dispatch action to set reducer 
        yield put({
            type: 'SET_WEEKS',
            payload: weekResponse.data
        })
    } catch (err) {
        console.log('ERROR IN programWeekSaga: ', err)
    }
}

export default scheduleSaga;