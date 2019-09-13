const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./FileListPlugin");

const getConfig = options => {
  const config = {
    entry: options.entry,
    output: options.output,
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(options.HtmlWebpackPluginOptions),
      new FileListPlugin({ options: true })
    ],
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          include: [path.resolve(__dirname, "src")],
          loader: "babel-loader",
          options: {
            plugins: ["syntax-dynamic-import"],
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            priority: -10,
            test: /[\\/]node_modules[\\/]/
          }
        },
        chunks: "async",
        minChunks: 1,
        minSize: 30000,
        name: true
      }
    },
    devServer: {
      open: true,
      port: 9000
    }
  };
};

module.exports = {
  getConfig
};
