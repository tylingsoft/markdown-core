const path = require('path')

module.exports = {
  entry: {
    'index': './markdown-core-node.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
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
  }
}
