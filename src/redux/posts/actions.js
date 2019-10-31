import { createAction } from 'redux-create-action';
import { ACTIONS } from './constants';

export const fetchPosts = (id, page=1, searchQuery="") => ({
  type: ACTIONS.FETCH_POSTS,
  params: { id, page, query: searchQuery }
});

export const fetchPostsSuccess = createAction(ACTIONS.FETCH_POSTS_SUCCESS, 'data');
export const fetchPostsError = createAction(ACTIONS.FETCH_POSTS_ERROR, 'error');

export const fetchSinglePost = id => ({
  type: ACTIONS.FETCH_SINGLE_POST,
  params: { id }
});

export const fetchSinglePostSuccess = createAction(ACTIONS.FETCH_SINGLE_POST_SUCCESS, 'data');
export const fetchSinglePostError = createAction(ACTIONS.FETCH_SINGLE_POST_ERROR, 'error');

export const clearPosts = createAction(ACTIONS.RESET_POSTS);