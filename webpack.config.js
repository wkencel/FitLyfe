const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
     
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html',
    }),
  ],
  resolve: { extensions: ['.js', '.jsx'] },
};
