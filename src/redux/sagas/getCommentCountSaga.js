import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* commentCountSaga(){
    yield takeEvery('GET_COMMENT_COUNT_SAGA', getCommentCountSaga)


}



function* getCommentCountSaga(){
    try{
        const commentResponse = yield call(axios.get, `/api/getCommentCount`)
        console.log(commentResponse)
        yield put({
            type:'SET_COMMENT_COUNT_REDUCER',
            payload: commentResponse.data,
        })
    }catch(error){
        console.log('getComment error', error);
    }
}


export default getCommentCountSaga;