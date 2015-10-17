'use strict';

import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from '../../reducers/index';
import App from '../app/app-component';
import { initGrid } from '../../action-creators';

const store = compose(
  applyMiddleware(thunk)
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
      </div>
    );
  }
}

RootComponent.propTypes = {};

RootComponent.defaultProps = {};

