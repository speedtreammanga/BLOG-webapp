import { createReducer } from 'redux-create-reducer';
import { removeValueFromObj, getRecordType, updateEditedPost } from './helpers';
import { ACTIONS, RECORD_TYPES } from './constants';

const initialState = {
	blog: {},
	posts: {},
	error: null,
	fetching: false,
	editing: {
		type: null,
		submitting: false,
		error: null,
		record: null,
		updatedRecord: null,
		deleting: false,
	},
};

const fetchData = state => ({
  ...state,
  fetching: true,
});

const fetchDataSuccess = (state, { data }) => {
	if (!data.blog) {
		return {
			...initialState,
			fetching: false,
		}
	}

	const { posts, ...restBlog } = data.blog;
	let postsObj = posts.reduce((obj, post) => {
		if (!obj[post.id]) {
			const {updatedAt, ...rest} = post;
			obj[post.id] = {
				...rest,
				updatedAt: updatedAt.split('T')[0],
			};
		}
		return obj;
	},{});

	return {
		...state,
		blog: restBlog,
		posts: postsObj,
		fetching: false,
	}
};

const fetchDataError = (state, { error }) => ({
  ...state,
	error,
	fetching: false,
});

const clearUser = state => ({
	...initialState,
	error: state.error,
	editing: {
		...state.editing,
		error: state.editing.error,
	}
});

const editRecord = (state, { record, recordType }) => ({
	...state,
	editing: {
		...state.editing,
		record,
		type: recordType
	},
});

const editRecordSubmitting = state => ({
	...state,
	editing: {
		...state.editing,
		submitting: true,
	},
});

const editRecordSubmitSuccess = (state, { updatedRecord }) => {
	const recordType = getRecordType(state.editing.type);
	const updatedObj = state.editing.type === RECORD_TYPES.BLOG
		? updatedRecord
		: updateEditedPost(state.posts, updatedRecord);
	return {
		...state,
		error: null,
		editing: {
			...state.editing,
			submitting: false,
			deleting: false,
			updatedRecord,
		},
		[recordType]: updatedObj,
	};
};

const editRecordSubmitError = (state, { error }) => ({
	...state,
	editing: {
		...state.editing,
		submitting: false,
		deleting: false,
		error,
	}
});

const closeEditRecord = state => ({
	...state,
	editing: initialState.editing,
});


const deleteRecord = state => ({
	...state,
	editing: {
		...state.editing,
		submitting: false,
		deleting: true,
	}
});

const deleteRecordSuccess = (state, { id, recordType: type }) => {
	let updatedObj = {};
	const recordType = getRecordType(type);
	if (type === RECORD_TYPES.POST) {
		updatedObj = removeValueFromObj(state.posts, obj => obj.id !== id);
	}
	return {
		...state,
		error: null,
		editing: {
			...state.editing,
			deleting: false,
		},
		[recordType]: updatedObj,
	};
};

const handlers = {
	[ACTIONS.FETCH_BLOG_POSTS]: fetchData,
	[ACTIONS.FETCH_BLOG_POSTS_SUCCESS]: fetchDataSuccess,
	[ACTIONS.FETCH_BLOG_POSTS_ERROR]: fetchDataError,
	[ACTIONS.RESET_USER]: clearUser,
	[ACTIONS.EDIT_RECORD]: editRecord,
	[ACTIONS.EDIT_RECORD_SUBMIT]: editRecordSubmitting,
	[ACTIONS.EDIT_RECORD_SUBMIT_SUCCESS]: editRecordSubmitSuccess,
	[ACTIONS.EDIT_RECORD_SUBMIT_ERROR]: editRecordSubmitError,
	[ACTIONS.CLOSE_EDIT_RECORD]: closeEditRecord,
	[ACTIONS.DELETE_RECORD]: deleteRecord,
	[ACTIONS.DELETE_RECORD_SUCCESS]: deleteRecordSuccess,
	[ACTIONS.DELETE_RECORD_ERROR]: editRecordSubmitError,
};

export default createReducer(initialState, handlers);