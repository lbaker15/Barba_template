const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
//https://sgom.es/posts/2018-01-18-multiple-routes-webpack/
module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    contentBasePublicPath: '/app',
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  entry: {
    main: './src/index.js',
    about: './src/about.js'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/index.html'), // template file
      filename: 'index.html', // output file
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
        title: 'webpack Boilerplate2',
        template: path.resolve(__dirname, './src/about.html'), // template file
        filename: 'about.html', // output file
        chunks: ['main', 'about']
    }),
    new CleanWebpackPlugin(),
    
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};