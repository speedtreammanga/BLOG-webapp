import { createReducer } from 'redux-create-reducer';
import { FETCH_BLOGS, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_ERROR } from './constants';

const initialState = {
	data: [],
	error: null,
	fetching: false,
	pageInfo: {},
};

const fetchBlogs = state => ({
  ...state,
  fetching: true,
});

const fetchBlogsSuccess = (state, { data }) => {
	let blogs = {};
	if (data.edges) {
		blogs = data.edges.reduce((obj, { node }) => {
			if (!obj[node.id]) {
				obj[node.id] = { ...node, url: `/blog/${node.id}` };
			}
			return obj;
		},{});
	} else { //single blog fetch...
		blogs = {
			[data[0].id]: {
				...data[0],
				createdAt: data[0].createdAt.split('T')[0],
				url: `/blog/${data[0].id}`
			}
		}
	}

	return {
		...state,
		data: blogs,
		fetching: false,
		pageInfo: data.pageInfo || {},
	}
};

const fetchBlogsError = (state, { error }) => ({
  ...state,
	error,
	fetching: false,
});

const handlers = {
	[FETCH_BLOGS]: fetchBlogs,
	[FETCH_BLOGS_SUCCESS]: fetchBlogsSuccess,
	[FETCH_BLOGS_ERROR]: fetchBlogsError,
};

export default createReducer(initialState, handlers);