/* eslint-disable */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'RSS агрегатор',
      template: 'index.html',
    }),
    new miniCssExtractPlugin(),
  ],
};