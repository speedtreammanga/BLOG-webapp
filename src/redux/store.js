import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { fork, all } from 'redux-saga/effects';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import blogsSaga from './blogs/sagas';
import blogsReducers from './blogs/reducers';
import postsSaga from './posts/sagas';
import postsReducers from './posts/reducers';
import userReducers from './user/reducers';
import userSagas from './user/sagas';

const reducers = combineReducers({
	blogs: blogsReducers,
	posts: postsReducers,
	user: userReducers,
});

function* rootSaga() {
  yield all([
    fork(blogsSaga),
    fork(postsSaga),
    fork(userSagas),
  ]);
}

const middlewares=[];
const sagaMiddleware = createSagaMiddleware();

export const initializeStore = (initialState=undefined, history) => {
	middlewares.push(routerMiddleware(history));
	middlewares.push(sagaMiddleware);

	const middleware = applyMiddleware(...middlewares);

	const store = createStore(
		reducers,
		initialState,
		composeWithDevTools(middleware)
	)
	sagaMiddleware.run(rootSaga, store.dispatch);
	return store;
};
