import { createReducer } from 'redux-create-reducer';
import { ACTIONS } from './constants';

const initialState = {
	data: {},
	error: null,
	fetching: false,
	pageInfo: {},
};

const fetchPosts = state => ({
  ...state,
  fetching: true,
});

const fetchPostsSuccess = (state, { data }) => {
	const posts = data.edges.reduce((obj, { node }) => {
		const { createdAt, ...restNode } = node;
		if (!obj[node.id]) {
			obj[node.id] = {
				...restNode,
				createdAt: createdAt.split('T')[0],
				url: `/post/${node.id}`
			};
		}
		return obj;
	},{});
	return {
		...state,
		data: posts,
		pageInfo: data.pageInfo,
		fetching: false,
	}
};

const fetchPostsError = (state, { error }) => ({
  ...state,
	error,
	fetching: false,
});

const fetchSinglePostSuccess = (state, { data }) => {
	return ({
		...state,
		data: {
			...state.data,
			[data[0].id]: {
				...data[0],
				createdAt: data[0].createdAt.split('T')[0]
			},
		},
		fetching: false,
	});
}

const clearPosts = () => ({
	...initialState
});

const handlers = {
	[ACTIONS.FETCH_POSTS]: fetchPosts,
	[ACTIONS.FETCH_POSTS_SUCCESS]: fetchPostsSuccess,
	[ACTIONS.FETCH_POSTS_ERROR]: fetchPostsError,
	[ACTIONS.FETCH_SINGLE_POST]: fetchPosts,
	[ACTIONS.FETCH_SINGLE_POST_SUCCESS]: fetchSinglePostSuccess,
	[ACTIONS.FETCH_SINGLE_POST_ERROR]: fetchPostsError,
	[ACTIONS.RESET_POSTS]: clearPosts,
};

export default createReducer(initialState, handlers);