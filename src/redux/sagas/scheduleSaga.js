import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* scheduleSaga(){
    yield takeEvery('FETCH_PROGRAM_WEEKS', programWeekSaga);
    yield takeEvery('UPDATE_SCHEDULE', updateScheduleSaga);
    yield takeEvery('FETCH_FOCUS_INFO', focusInfoSaga);
    yield takeEvery('ADD_FOCUS', addFocusSaga);
    yield takeEvery('DELETE_FOCUS', deleteFocusSaga);
    yield takeEvery('GET_INFO', getInfoSaga); 
}

//saga for getting weeks for that program
function* programWeekSaga(action){
    console.log(action.payload);
    
    try{
        //dispatch action to get specific weeks that are related to program
        const weekResponse = yield call(axios.get, `/api/instructorSchedule/weeks/?id=${action.payload.program_id}`)

        //dispatch action to set reducer 
        yield put({
            type: 'SET_WEEKS',
            payload: weekResponse.data
        })

        yield put({
            type: 'THIS_WEEK',
            payload: weekResponse.data[0].id
        })

        yield put({
            type: 'SET_DEFAULT_WEEK_NUMBER',
            payload: weekResponse.data[0].number
        })

        yield put({
            type: 'WEEK_THEME', 
            payload: weekResponse.data[0].theme
        })

        yield put({
            type: 'WEEK_DESCRIPTION', 
            payload: weekResponse.data[0].description
        })
        yield put({
            type: 'DEFAULT_ID',
            payload: weekResponse.data[0].id
        })
    
    } catch (err) {
        console.log('ERROR IN programWeekSaga: ', err);
    }
}

//saga for posting schedules to database
function* updateScheduleSaga(action){
    try{
        //dispatch call to post to database
        yield call(axios.put, '/api/instructorSchedule', action.payload);

        //dispatch get to update dom display
        yield put({
            type: 'FETCH_FOCUS_INFO'
        })
    } catch (err) {
        console.log('ERROR IN updateScheduleSaga: ', err);
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
        //dispatch call to run get request
        yield put({
            type: 'FETCH_FOCUS_INFO',
        })
    } catch (err) {
        console.log('ERROR IN focusInfoSaga: ', err);
    }
}

//saga for deleting focus
function* deleteFocusSaga(action){
    try{
        //dispatch call to delete focus from db
        yield call(axios.delete, `/api/instructorSchedule/${action.payload.item.f_id}`);
        //dispatch call to run get request
        yield put({
            type: 'FETCH_FOCUS_INFO'
        })
    } catch (err) {
        console.log('ERROR IN deleteFocusSaga: ', err);
        
    }
}

//saga for getting focus info
function* getInfoSaga(action){
    try{
        //dispatch call to get info for that specific focus
        let infoResponse = yield call(axios.get, `/api/instructorSchedule/info/?id=${action.payload.item.f_id}`);
        //dispatch action to set reducer
        yield put({
            type: 'SET_STRATEGY_INFO',
            payload: infoResponse.data
        })
    } catch(err) {
        console.log('ERROR IN getInfoSaga: ', err);    
    }
}



export default scheduleSaga;