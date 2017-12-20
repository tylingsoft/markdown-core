import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

const configCreator = () => ({
  target: 'web',
  entry: {
    'index': './build/index.js'
  },
  externals: 'fs', // in order to make mermaid work
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js',
    library: 'mdc',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
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
            ],
            plugins: [
              'transform-remove-strict-mode' // in order to make mermaid work
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ],
  devtool: 'source-map'
})

const webConfig = configCreator()

const nodeConfig = configCreator()
nodeConfig.entry.index = './src/index-node.js'
nodeConfig.externals = [nodeExternals()]
nodeConfig.output.path = path.join(__dirname, 'dist')
nodeConfig.output.filename = '[name].js'

export default [webConfig, nodeConfig]
