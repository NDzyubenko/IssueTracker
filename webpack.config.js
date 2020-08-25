const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const TARGET = process.env.TARGET;

const entry = TARGET === 'server' ? './server/server.js' : './client/index.js';
const filename = TARGET === 'server' ? 'server.js' : 'client.js';
const target = TARGET === 'server' ? 'node' : 'web';
const node = TARGET === 'server' ? { __dirname: false } : undefined;
const externals = TARGET === 'server' ? nodeExternals() : undefined;

console.log(TARGET, entry, filename, target);

module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'compiled'),
    filename: filename,
    publicPath: './compiled',
  },
  target: target,
  node: node,
  externals: externals,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            require.resolve('babel-preset-react'),
            'react',
            'es2015',
          ],
          plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
        }
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../'
          }
        }]
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
        }),
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`,
      },
    }),
    new ExtractTextPlugin('public/css/styles.css'),
  ],
};