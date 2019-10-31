import { all, takeLatest, call, put, takeLeading } from 'redux-saga/effects';
import { fetchPostsSuccess, fetchPostsError, fetchSinglePostError, fetchSinglePostSuccess } from './actions';
import { ACTIONS } from './constants';
import api from '../../api';

function* fetchPostsSaga({ params }) {
  try {
    const config = {
      method: 'get',
      url: '/blog/posts',
      params,
    };
    const response = yield call(api, config);
    yield put(fetchPostsSuccess(response.data));
  } catch (err) {
    yield put(fetchPostsError(err));
  }
}

function* fetchSinglePostSaga({ params }) {
  try {
    const config = {
      method: 'get',
      url: '/post',
      params,
    };
    const response = yield call(api, config);
    yield put(fetchSinglePostSuccess(response.data));
  } catch (err) {
    yield put(fetchSinglePostError(err));
  }
}

export default function* rootSaga() {
  yield all([
    takeLeading(ACTIONS.FETCH_POSTS, fetchPostsSaga),
    takeLatest(ACTIONS.FETCH_SINGLE_POST, fetchSinglePostSaga),
  ])
}