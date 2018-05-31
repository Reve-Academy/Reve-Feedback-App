import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* scheduleSaga(){
    yield takeEvery('FETCH_PROGRAM_WEEKS', programWeekSaga);
    yield takeEvery('ADD_SCHEDULE', addScheduleSaga);
    yield takeEvery('FETCH_FOCUS_INFO', focusInfoSaga);
    yield takeEvery('ADD_FOCUS', addFocusSaga);
}

//saga for getting weeks for that program
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
        console.log('ERROR IN programWeekSaga: ', err);
    }
}

//saga for posting schedules to database
function* addScheduleSaga(action){
    try{
        //dispatch call to post to database
        yield call(axios.post, '/api/instructorSchedule', action.payload);
    } catch (err) {
        console.log('ERROR IN addScheduleSaga: ', err);
    }
}

//saga for getting all focus info
function* focusInfoSaga(action){    
    try{
       //dispatch call to get focus info from database 
       const focusResponse = yield call(axios.get, '/api/instructorSchedule/focus');
       yield put({
           type: 'SET_FOCUS_INFO',
           payload: focusResponse.data
       })
    } catch (err) {
        console.log('ERROR IN focusInfoSaga: ', err);
    }
}

//saga for posting new focus 
function* addFocusSaga(action){
    try{
        //dispatch call to post focus to database
        yield call(axios.post, '/api/instructorSchedule', action.payload);
        yield put({
            type: 'FETCH_FOCUS_INFO',
        })
    } catch (err) {
        console.log('ERROR IN focusInfoSaga: ', err);
    }
} 

export default scheduleSaga;