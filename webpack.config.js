'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';

let config = require('nconf');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

config.argv().env().file({ file: './polarvargen.json' });


module.exports = {
	context: __dirname + config.get('sourceFolder'),

	entry: {
		app: './index',
    },

    output: {
    	path: __dirname + config.get('distFolder'),
        publicPath: config.get('publicPath'),
        filename: "[name].js",
        library: "[name]",
    },

    resolve: {
    	extensions: ['', '.js', '.scss']
    },

    resolveLoader: {
    	modulesDirectories: ['node_modules'],
    	moduleTemplates: ['*-loader'],
    	extensions: ['', '.js']
    },

    module: {
    	loaders: [{
    		test: /\.scss$/,
    		loader: ExtractTextPlugin.extract('css!sass')
    	}]
    },
    plugins:[
    	new ExtractTextPlugin(`${config.get('cssPath')}/[name].css`, {allChunks: true}),
    ],

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

    watch: true,
}