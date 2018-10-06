'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_IP: '"http://localhost:3000/"',
  APP_ID: '"884618848377974"',
  VERSION: '"v2.11"',
  MAP_KEY: '"AIzaSyA1AQBCGcc9tniQ_lTKSZH7V_AUo_YXOK0"',
  MAP_VERSION: '"3.26"'
})
