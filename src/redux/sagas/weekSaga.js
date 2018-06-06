import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* weekSaga() {
	yield takeEvery('UPDATE_WEEK_SAGA', putWeekSaga);
	yield takeEvery('GET_UPDATED_WEEK_SAGA', getUpdatedWeekSaga);
}

function* putWeekSaga(action) {
    console.log('this is putWeekSaga', action.payload);
    
	try {
        yield call(axios.put, `/api/instructorschedule/weeks/update/${action.payload.weekId}`, action.payload);
		yield put({
            type: 'GET_UPDATED_WEEK_SAGA',
            payload: action.payload,
		});
	} catch (error) {
		console.log('get studentList error: ', error);
	}
}

function* getUpdatedWeekSaga(action) {
	try{
		//dispatch action to get specific weeks that are related to program
        const weekResponse = yield call(axios.get, `/api/instructorSchedule/weeks/?id=${action.payload.program_id}`)

        //dispatch action to set reducer 
        yield put({
            type: 'SET_WEEKS',
            payload: weekResponse.data
		})
		yield put({
			type: 'WEEK_THEME',
			payload: action.payload.updatedWeek.theme
		})
		yield put({
			type: 'WEEK_DESCRIPTION',
			payload: action.payload.updatedWeek.description
		})
	} catch (error) {
		console.log('ERROR IN GET UPDATED WEEKS: ', error);
	}
}

export default weekSaga;