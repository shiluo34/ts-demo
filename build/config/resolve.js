const helpers = require('./helpers');

module.exports = (env) => {
    return {
        extensions: ['.js','.ts', '.vue', '.json', '.css', '.scss'],
        alias: {
          vue$: 'vue/dist/vue.common.js',
          '@': helpers.resolve('src'),
      }
    };
};
