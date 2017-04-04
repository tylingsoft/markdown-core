import path from 'path'
import nodeExternals from 'webpack-node-externals'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonRules = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }
]

const nodeRules = [
  ...commonRules,
  {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            'targets': {
              'node': 'current'
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
  module: { rules: nodeRules },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ]
}

const webRules = [
  ...commonRules,
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
    new ExtractTextPlugin('index.bundle.css')
  ]
}

export default [nodeConfig, webConfig]
