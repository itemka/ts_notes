const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/11.webpack/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist/11.webpack'),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    // use it for production
    // new CleanWebpackPlugin(),
  ]
}