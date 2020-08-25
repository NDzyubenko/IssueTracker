import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

import { App } from './app.jsx';
import * as pages from './pages';
import * as routes from './constants';
import { rootReducer } from './reducers';
import { tokenInjector } from './services';


const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const createStoreWithMiddleware = applyMiddleware(
  middleware,
  tokenInjector,
  apiMiddleware,
  thunk,
)(createStore);

const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('root'),
);
