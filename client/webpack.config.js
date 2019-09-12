const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./FileListPlugin')

module.exports = (env, argv) => {
  let config = {
    entry: {
      start: './src/start.js',
      personal: './src/personal.js',
      confirmation: './src/confirmation.js',
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, '../public/js/dist'),
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        host: 'http://localhost:3000/',
        title: 'My Awesome application',
        myPageHeader: 'Hello World',
        template: './src/index.html',
      }),
      new FileListPlugin({ options: true }),
    ],
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          include: [path.resolve(__dirname, 'src')],
          loader: 'babel-loader',
          options: {
            plugins: ['syntax-dynamic-import'],
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                },
              ],
            ],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/,
          },
        },
        chunks: 'async',
        minChunks: 1,
        minSize: 30000,
        name: true,
      },
    },
    devServer: {
      open: true,
      port: 9000,
    },
  }

  if (argv.mode === 'development') {
    console.log('mode: development')
  }

  if (argv.mode === 'production') {
    console.log('mode:production')
  }

  return config
}
