const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = webpackEnv => {
  const isEnvAnalyze= webpackEnv.env === 'analyze';

  const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ];
  if (isEnvProduction) {
    plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.resolve(
        __dirname,
        'dist/analyze.html'
      ),
      openAnalyzer: false,
    }))
  }

  return {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    devtool: 'source-map',
    module: {
      rules: [
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
      filename: 'bundle.js'
    },
    plugins,
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true
    }
  }
};