'use strict';

import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from '../reducers/index';
import App from './app';
import { initGrid } from '../action-creators';

const store = compose(
  applyMiddleware(thunk, logger()),
  devTools()
)(createStore)(allReducers);

store.dispatch(initGrid({
  rows: 17,
  columns: 17
}));

export default class RootComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Provider store={store}>
          <App />
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

RootComponent.propTypes = {};

RootComponent.defaultProps = {};

