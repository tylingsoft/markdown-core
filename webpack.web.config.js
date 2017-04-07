import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const webRules = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            'targets': {
              'browsers': ['last 2 versions']
            }
          }]
        ]
      }
    }
  }
]

const config = {
  target: 'web',
  entry: {
    'web': './dist/index.js'
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].bundle.js'
  },
  module: { rules: webRules },
  plugins: [
    new ExtractTextPlugin('index.bundle.css')
  ]
}

export default [config]
