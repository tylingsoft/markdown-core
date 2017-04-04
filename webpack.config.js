import path from 'path'
import nodeExternals from 'webpack-node-externals'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const nodeRules = [
  {
    test: /\.css$/,
    use: { loader: 'ignore-loader' }
  },
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            'targets': {
              'node': 4.2
            }
          }]
        ]
      }
    }
  }
]

const nodeConfig = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'index': './src/index-node.js'
  },
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: { rules: nodeRules }
}

const webRules = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  },
  {
    test: /\.(ttf|eot|svg|woff2?)(\?v=.+?)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }
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

const webConfig = {
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
    new ExtractTextPlugin('[name].bundle.css')
  ]
}

export default [nodeConfig, webConfig]
