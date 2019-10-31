import { createAction } from 'redux-create-action';
import { FETCH_BLOGS, FETCH_BLOGS_SUCCESS, FETCH_BLOGS_ERROR, FETCH_SINGLE_BLOG } from './constants';

export const fetchBlogs = (page=1, searchQuery="") => ({
  type: FETCH_BLOGS,
  params: { page, query: searchQuery }
});

export const fetchBlogsSuccess = createAction(FETCH_BLOGS_SUCCESS, 'data');
export const fetchBlogsError = createAction(FETCH_BLOGS_ERROR, 'error');

export const fetchSingleBlog = createAction(FETCH_SINGLE_BLOG, 'id');