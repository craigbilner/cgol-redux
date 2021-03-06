'use strict';

import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import allReducers from '../../reducers/index';
import App from '../app/app-component';
import { initGrid } from '../../action-creators';

const store = compose(
  applyMiddleware(thunk, logger()),
  devTools()
)(createStore)(allReducers);

let rows = 12;
let columns = 12;

if (window.matchMedia("(min-width: 768px)").matches) {
  rows = 17;
  columns = 17;
}

store.dispatch(initGrid({
  rows,
  columns
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
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      </div>
    );
  }
}

RootComponent.propTypes = {};

RootComponent.defaultProps = {};

