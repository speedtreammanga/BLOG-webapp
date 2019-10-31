import React from "react";
import ReactDom from "react-dom";
// import {  } from 'react-router'
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, ConnectedRouter } from 'react-router-redux';
import "./styles/global.scss";
import App from "./pages/_app";
import * as serviceWorker from "./serviceWorker";
import { initializeStore } from './redux/store';

const store = initializeStore();
const history = createBrowserHistory();
// const history = syncHistoryWithStore(browserHistory, store)

ReactDom.render(
	<Provider store={store}>
		{/* <ConnectedRouter history={history}> */}
			<App />
		{/* </ConnectedRouter> */}
	</Provider>,
	document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
