import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonRules = [
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
  }
]

const nodeRules = [...commonRules, {
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
}]

const webRules = [...commonRules, {
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
}]

const nodeConfig = {
  target: 'node',
  entry: {
    'index': './src/index-node.js'
  },
  output: {
    path: path.join(__dirname, './dist/fonts/'),
    publicPath: 'fonts/',
    filename: '../[name].bundle.js'
  },
  module: { rules: nodeRules },
  plugins: [
    new ExtractTextPlugin('../[name].bundle.css')
  ]
}

const webConfig = {
  target: 'web',
  entry: {
    'web': './dist/index.js'
  },
  output: {
    path: path.join(__dirname, './dist/fonts/'),
    publicPath: 'fonts/',
    filename: '../[name].bundle.js'
  },
  module: { rules: webRules },
  plugins: [
    new ExtractTextPlugin('../index.bundle.css')
  ]
}

export default [nodeConfig, webConfig]
