'use strict'

const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;

const markers = require('./src/markers.json');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    /*
    hot: true,
    watchOptions: {
      poll: true
    }
    */
    contentBase: path.join(__dirname, 'dist'),
    
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: { loader: 'vue-loader',
          options: {
          transformToRequire: {
            iframe: 'src',
          },
        }},
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(wav|ogg|mp3)$/,
        use: 'file-loader'
      },
      {
        test: /(map|sklik)\.html$/,
        use: 'file-loader'
      },
      {
        test: /\.ico$/, use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // https://git.coolaj86.com/coolaj86/btoa.js/src/branch/master/index.js
      "MARKERS": JSON.stringify(Buffer.from(encodeURIComponent(JSON.stringify(markers)), 'binary').toString('base64')),
    }),
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    //new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      favicon: 'assets/favicon.ico',
      inject: true
    })].concat(process.env.NODE_ENV === 'development' ? [] : 
    [new PrerenderSpaPlugin({
      // Path to compiled app
      staticDir: path.join(__dirname, 'dist'),
      // List of endpoints you wish to prerender
      routes: [ '/' ],
      // Optional minification.
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },

      renderer: new Renderer({
        renderAfterDocumentEvent: 'render-event',
        headless: true,
      })
    }),
  ])
};