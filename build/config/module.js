const path = require('path');
const helpers = require('./helpers');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, module) => {
  return {
    rules: [{
        test: /\.(js|vue|ts)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [helpers.resolve('src'), helpers.resolve('static')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: ['sass-loaders'],
          }
        }
      }, //vue加载器z
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'tslint-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourcemap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|PNG|JPE?G|GIF|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]',
            // publicPath: '../img/',
            // outputPath: `${env === 'development' ? '../' : './'}img/`
            outputPath: `../img/`
          }
        }
      }
    ]
  };
};
