const path = require('path')

const loaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    query: {
      presets: [
        ['env', {
          'targets': {
            'browsers': ['last 2 versions']
          }
        }]
      ]
    }
  }
]

module.exports = [
  {
    entry: {
      'markdown-core': './markdown-core-browser.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].min.js',
      library: 'mdc',
      libraryTarget: 'umd'
    },
    module: { loaders }
  },
  {
    entry: {
      'index': './test/index.js'
    },
    output: {
      path: path.join(__dirname, 'test'),
      filename: '[name].bundle.js'
    },
    module: { loaders }
  }
]
