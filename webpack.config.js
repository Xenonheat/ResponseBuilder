// Webpack specific modules
const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const WebpackNodeExternalsPlugin = require('webpack-node-externals')

// Define current directory
const CWD = process.cwd()

// Location based constants
const BUILD = path.resolve(CWD, 'build/main')
const CORE = path.resolve(CWD, 'Core')
const PRODUCTION = process.env.NODE_ENV === 'production'
const STAGE = process.env.STAGE || 'development'

// Webpack Plugins
const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.EnvironmentPlugin({
    STAGE,
    CONFIG: fs.readFileSync(path.resolve(CWD, `Configuration/${STAGE}/config.json`), 'utf-8'),
  })
]

const webpackConfiguration = {
  context: CWD,
  entry: `${CORE}/server/index.js`,
  devtool: 'source-map',
  externals: [
    WebpackNodeExternalsPlugin({
      whitelist: [/\.yml/]
    })
  ],
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.json$/,
      use: ['json-loader']
    }, {
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader']
    }, {
      test: /\.yml$/,
      use: ['json-loader', 'yaml-loader']
    }]
  },
  output: {
    filename: '[name].js',
    path: BUILD,
    libraryTarget: 'umd'
  },
  mode: PRODUCTION ? 'production' : 'development',
  resolve: {
    alias: {
      config: `${CORE}/config`,
      constant: `${CORE}/constant`,
      media: `${CORE}/media`,
      helper: `${CORE}/helper`,
      middleware: `${CORE}/middleware`,
      modules: `${CORE}/modules`,
      route: `${CORE}/route`,
      service: `${CORE}/service`
    }
  },
  plugins: plugins,
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  }
}

// Webpack Definition
module.exports = webpackConfiguration
