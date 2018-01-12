const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const baseConfig = require('./webpack.base.js');
const config = require('./config.js');

module.exports = function (env) {
	return webpackMerge(baseConfig(env), {
		entry: {
			main: config.appMainJs,
			vendor: config.vendor,
		},
		module: {
			rules: [
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
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader?minimize',
							'less-loader',
							'postcss-loader'
						]
					}),
					exclude: ['/node_modules/', config.appStatic]
				},
				{
					test: /\.(less|css)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader?minimize',
							'less-loader',
							'postcss-loader'
						]
					}),
					include: [config.appStatic]
				}
			],
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					conditionals: true,
					unused: true,
					comparisons: true,
					sequences: true,
					dead_code: true,
					evaluate: true,
					if_return: true,
					join_vars: true,
				},
				output: {
					comments: false,
				},
			}),
			new ExtractTextPlugin({
				filename: 'style.[contenthash:16].css',
				disable: false,
				allChunks: true,
			}),
			new HTMLWebpackPlugin({
				template: config.appHtml
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor', 'manifest']
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production')
				}
			}),
			new webpack.LoaderOptionsPlugin({
				options: {
					postcss() {
						return [precss, autoprefixer];
					}
				}
			})
		]
	})
}