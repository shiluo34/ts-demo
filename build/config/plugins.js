const webpack = require('webpack');
const os = require('os');
const path = require('path');
const helpers = require('./helpers');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})

module.exports = (env) => {
  const htmlTemplateOptions = {
    filename: env !== 'production' ? './index.html' : helpers.root(`../dist/index.html`),
    template: path.join('static', 'template', 'index.ejs'),
    env,
  };
  const extractOptions = {
    filename: env !== 'production' ? 'css/style.css' : 'css/style.[hash].css',
    chunkFilename: env !== 'production' ? 'css/style.css' : 'css/style.[hash].css'
  };
  const analyzerOptions = {
    analyzerMode: 'server',
    analyzerPort: 8888,
    reportFilename: 'report.html',
    defaultSizes: 'parsed',
    openAnalyzer: true,
    generateStatsFile: false,
    statsFilename: 'stats.json',
    statsOptions: null,
    logLevel: 'info'
  };
  const cleanOptions = {
    root: __dirname,
    verbose: true,
    dry: false,
    allowExternal: true
  };

  let plugins = [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'happy-ts',
      loaders: ['ts-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'happy-vue',
      loaders: ['vue-loader?cacheDirectory=true'],
      threadPool: happyThreadPool
    }),
    new CleanWebpackPlugin([
      path.join(__dirname, `../../dist/`)
    ], cleanOptions),
    new MiniCssExtractPlugin(extractOptions),
    new HtmlWebpackPlugin(htmlTemplateOptions),
    new ProgressBarPlugin()
  ];

  if (env === 'development') {
    plugins = plugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      })
    ])
  } else {
    plugins = plugins.concat([
      new webpack.NamedModulesPlugin(),
      new BundleAnalyzerPlugin(analyzerOptions),
    ]);
  }

  return plugins;
};
