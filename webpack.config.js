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
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.(ttf|eot|svg|woff2?)(\?v=.+?)?$/,
    loader: 'url-loader?limit=1000000'
  }
]

module.exports = [
  {
    entry: {
      'markdown-core': './index-browser.js'
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].bundle.js',
      library: 'mdc',
      libraryTarget: 'umd'
    },
    module: { loaders }
  },
  {
    entry: {
      'index': './public/index.js'
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: '[name].bundle.js'
    },
    module: { loaders }
  }
]
