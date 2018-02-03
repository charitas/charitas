/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer as HotReloadContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import app from './reducers';

const store = createStore(app);

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
