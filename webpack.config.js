const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = webpackEnv => {
  const isEnvProduction = webpackEnv.env === 'product';
  const isEnvAnalyze= webpackEnv.env === 'analyze';

  const outputFilename = isEnvProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js';

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
    }),
  ];
  if (isEnvAnalyze) {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(__dirname, 'dist/analyze.html'),
      openAnalyzer: false,
    }))
  }

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js|ts|tsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.tsx']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: outputFilename,
      chunkFilename: outputFilename
    },
    plugins,
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true
    }
  }
};