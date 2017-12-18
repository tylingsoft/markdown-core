import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

const configCreator = () => ({
  target: 'web',
  entry: {
    'index': './dist/index.js'
  },
  externals: 'fs', // in order to make mermaid work
  output: {
    path: path.join(__dirname, './dist/'),
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
  ]
})

const config = configCreator()

const coreConfig = configCreator()
coreConfig.entry.index = './src/index-node.js'
coreConfig.externals = [nodeExternals()]
coreConfig.output.filename = '[name].core.bundle.js'

export default [config, coreConfig]
