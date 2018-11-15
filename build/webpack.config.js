const path = require('path');

module.exports = () => {
  const env = process.env.NODE_ENV;

  let build = {
    mode: env,
    entry: {
      'bundle': './src/index.ts'
    },
    output: require('./config/output')(env),
    optimization: require('./config/optimization')(env),
    module: require('./config/module')(env),
    resolve: require('./config/resolve')(env),
    plugins: require('./config/plugins')(env),
  };

  if (env === 'development') {
    build['devServer'] = {
      contentBase: path.join(__dirname, `./dist`),
      inline: true,
      historyApiFallback: true,
      hot: true,
      progress: true,
      compress: true,
      proxy: {
        '/api': {
          // target: 'http://192.168.20.193:8080',
          target: 'http://dev.pmssaas.com',
          // target: 'http://dev-me.otosaas.com',
          changeOrigin: true
        }
      }
    }

    build['devtool'] = '#source-map';
  }

  return build;
};