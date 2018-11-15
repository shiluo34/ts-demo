const helpers = require('./helpers');

module.exports = (env) => {
	return {
		path: helpers.root(`../dist/`),
		filename: env === 'development' ? 'js/[name].js' : 'js/[name].[chunkhash].js',
		chunkFilename: env === 'development' ? 'js/[name].js' : 'js/[name].[chunkhash].js'
	};
};
