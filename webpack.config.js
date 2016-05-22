'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';

let config = require('nconf');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let precss       = require('precss');
let autoprefixer = require('autoprefixer');

config.argv().env().file({ file: './polarvargen.json' });


module.exports = {
	context: __dirname + config.get('sourceFolder'),

	entry: {
		baseSass: './scss/views/base',
		baseLess: './less/app',
		baseStyl: './stylus/app',
    },

    output: {
    	path: __dirname + config.get('distFolder'),
        publicPath: config.get('publicPath'),
        filename: `${config.get('jsPath')}/[name].js`,
        library: "[name]",
    },

    resolve: {
    	extensions: ['', '.js', '.scss', '.less', '.styl']
    },

    resolveLoader: {
    	modulesDirectories: ['node_modules'],
    	moduleTemplates: ['*-loader'],
    	extensions: ['', '.js']
    },

    module: {
    	loaders: [
	    	{
	    		test: /\.less$/,
	    		loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!less')
	    	},
	    	{
	    		test: /\.scss$/,
	    		loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!sass')
	    	},
	    	{
	    		test: /\.styl$/,
	    		loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!stylus')
	    	},
    	]
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins:[
    	new ExtractTextPlugin(`${config.get('cssPath')}/[name].css`, {allChunks: true}),
    ],

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

    watch: true,
}