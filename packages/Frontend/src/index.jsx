/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/firestore';
import AppContainer from './containers/AppContainer';
import app from './reducers';

firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
});

const store = createStore(
  app,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const render = (Component) => {
  ReactDOM.render(
    <HotReloadContainer>
      <Provider store={store} >
        <Router>
          <Component />
        </Router>
      </Provider>
    </HotReloadContainer>,
    document.getElementById('app'),
  );
};

render(AppContainer);
if (module.hot) {
  module.hot.accept('./containers/AppContainer', () => { render(AppContainer); });
}
