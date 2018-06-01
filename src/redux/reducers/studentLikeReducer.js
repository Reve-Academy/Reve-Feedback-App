import { combineReducers } from 'redux';

const studentLikeReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_COMMENT_LIKE_REDUCER':
			return action.payload;
		default:
			return state;
	}
};

const getLikeReducer = (state = [], action) => {
	switch (action.type) {
		case 'FETCH_COMMENT_LIKE_REDUCER':
			return action.payload;
		default:
			return state;
	}
};

const unlikeReducer = (state = [], action) => {
	switch (action.type) {
		case 'DELETE_LIKE_REDUCER':
			return action.payload;
		default:
			return state;
	}
};

export default combineReducers({
    studentLikeReducer,
    getLikeReducer
});
