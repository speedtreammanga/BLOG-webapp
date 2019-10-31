import { all, takeLeading, takeLatest, call, put } from 'redux-saga/effects';
import { fetchBlogsSuccess, fetchBlogsError } from './actions';
import { FETCH_SINGLE_BLOG, FETCH_BLOGS } from './constants';
import { clearPosts } from '../posts/actions';
import api from '../../api';

function* fetchBlogsSaga({ params }) {
  try {
    const config = {
      method: 'get',
      url: '/blogs',
      params,
    };
    const response = yield call(api, config);
    yield put(clearPosts());
    yield put(fetchBlogsSuccess(response.data));
  } catch (err) {
    yield put(fetchBlogsError(err));
  }
}

function* fetchBlogSaga({ id }) {
  try {
    const config = {
      method: 'get',
      url: '/blog',
      params: { id },
    };
    const response = yield call(api, config);
    yield put(fetchBlogsSuccess(response.data));
  } catch (err) {
    yield put(fetchBlogsError(err));
  }
}

export default function* rootSaga() {
  yield all([
    takeLeading(FETCH_BLOGS, fetchBlogsSaga),
    takeLatest(FETCH_SINGLE_BLOG, fetchBlogSaga),
  ])
}