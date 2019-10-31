import { createAction } from 'redux-create-action';
import { ACTIONS } from './constants';

export const fetchBlogAndPosts = createAction(ACTIONS.FETCH_BLOG_POSTS);
export const fetchBlogAndPostsSuccess = createAction(ACTIONS.FETCH_BLOG_POSTS_SUCCESS, 'data');
export const fetchBlogAndPostsError = createAction(ACTIONS.FETCH_BLOG_POSTS_ERROR, 'error');

export const clearUser = createAction(ACTIONS.RESET_USER);

export const editRecord = createAction(ACTIONS.EDIT_RECORD, 'record', 'recordType');
export const editRecordSubmit = createAction(ACTIONS.EDIT_RECORD_SUBMIT, 'data');
export const editRecordSubmitSuccess = createAction(ACTIONS.EDIT_RECORD_SUBMIT_SUCCESS, 'updatedRecord');
export const editRecordSubmitError = createAction(ACTIONS.EDIT_RECORD_SUBMIT_ERROR, 'error');

export const closeEditRecord = createAction(ACTIONS.CLOSE_EDIT_RECORD);

export const deleteRecord = createAction(ACTIONS.DELETE_RECORD, 'id', 'recordType');
export const deleteRecordSuccess = createAction(ACTIONS.DELETE_RECORD_SUCCESS, 'id', 'recordType');
export const deleteRecordError = createAction(ACTIONS.DELETE_RECORD_ERROR, 'error');