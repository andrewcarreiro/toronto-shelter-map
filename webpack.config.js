const debug = process.env.NODE_ENV !== 'production';
// const webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './src/index.jsx',
  watchOptions: {
    ignored: /node_modules/,
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'scripts.min.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // plugins: debug ? [] : [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  // ],
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          { loader: 'file-loader' },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },
    ],
  },
};
