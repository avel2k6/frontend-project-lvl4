// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: [
    `${__dirname}/src/index.js`,
  ],
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // optimization: {
  //   minimize: true,
  //   removeAvailableModules: true,
  //   mergeDuplicateChunks: true,
  //   concatenateModules: true,
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //     }),
  //   ],
  // },
};
