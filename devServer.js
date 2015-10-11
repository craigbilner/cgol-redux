'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackdm = require('webpack-dev-middleware');
const webpackhm = require('webpack-hot-middleware');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(webpackdm(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackhm(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', (err) => {
  let message = err || 'Listening at http://localhost:3000';

  console.log(message);
});