const path = require('path');
const webpack = require('webpack');
const config = require('./config');

module.exports = function (env) {
	return {
		entry: {
			main: config.appMainJs,
		},
		output: {
			path: config.appDist,
			sourceMapFilename: '[name].map',
			filename: (env === 'dev') ? '[name].js' : '[name].[hash:16].js',
			publicPath: config.publicPath,
		},
		resolve: {
			extensions: ['.ts', '.js', '.json'],
			modules: [config.appSrc, 'node_modules']
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					use: ['babel-loader'],
					exclude: '/node_modules/'
				},
				{
					test: /\.(png|jpg|gif)$/,
					use: ['url-loader?limit=20000&name=images/[hash:16].[ext]'],
					exclude: '/node_modules/'
				},
				{
					test: /\.(less|css)$/,
					use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
					exclude: '/node_modules/',
					include: [config.appStatic]
				},
			],
		},
	}
}