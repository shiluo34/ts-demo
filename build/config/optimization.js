const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, module) => {
	return {
		runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
    	    new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    safe: true
                }
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                }
            }
        }
	}
};