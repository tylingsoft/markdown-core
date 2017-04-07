import path from 'path'
import nodeExternals from 'webpack-node-externals'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const nodeRules = [
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
              'node': 'current'
            }
          }]
        ]
      }
    }
  }
]

const config = {
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

export default [config]
