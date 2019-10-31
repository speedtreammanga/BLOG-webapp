import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  fetchBlogAndPostsSuccess,
  fetchBlogAndPostsError,
  editRecordSubmitSuccess,
  editRecordSubmitError,
  closeEditRecord,
  deleteRecordSuccess,
  deleteRecordError
} from './actions';
import { ACTIONS, RECORD_TYPES } from './constants';
import api from '../../api';
import { validateForm } from './helpers';

function* fetchDataSaga() {
  try {
    const config = { method: 'get', url: '/user/posts' }
    const response = yield call(api, config);
    yield put(fetchBlogAndPostsSuccess(response.data));
  } catch (err) {
    yield put(fetchBlogAndPostsError(err));
  }
}

function* submitEditRecordSaga({ data }) {
  try {
    const { id, createdAt, ...restData } = data;
    const recordType = yield select(s => s.user.editing.type);
    const blogId = yield select(s => s.user.blog.id);

    const error = validateForm(recordType, restData);

    if(error.message) {
      yield put(editRecordSubmitError(error));
      return;
    }
  
    const config = {
      method: id ? 'put' : 'post',
      url: (recordType === RECORD_TYPES.BLOG ? '/blog' : '/post'),
      params: { id },
      data: { ...restData, blogId },
    }
    const res = yield call(api, config);
    yield put(editRecordSubmitSuccess(res.data));
    yield put(closeEditRecord());
  } catch (error) {
    yield put(editRecordSubmitError(error));
  }
}

function* deleteRecord({ id, recordType }) {
  try {
    const config = {
      method: 'delete',
      url: (recordType === RECORD_TYPES.BLOG ? '/blog' : '/post'),
      params: { id },
    }
    yield call(api, config);
    yield put(deleteRecordSuccess(id, recordType));
    yield put(closeEditRecord());
  } catch (error) {
    yield put(deleteRecordError(error));
  }
}

export default function* userSagas() {
  yield all([
    takeLatest(ACTIONS.FETCH_BLOG_POSTS, fetchDataSaga),
    takeLatest(ACTIONS.EDIT_RECORD_SUBMIT, submitEditRecordSaga),
    takeLatest(ACTIONS.DELETE_RECORD, deleteRecord),
  ])
}