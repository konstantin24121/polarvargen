'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';

const config            = require('nconf');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');
const path              = require("path");
const merge             = require('merge');

config.argv().env().file({ file: './polarvargen.json' });


module.exports = {
	context: path.join(__dirname, config.get('sourceFolder')),

	entry: merge(config.get('entryCss'),config.get('entryJs')),

     output: {
        path: path.join(__dirname , config.get('distFolder')),
        publicPath: config.get('publicPath'),
        filename: `${config.get('jsPath')}/[name].js`,
        library: "[name]",
    },

    resolve: {
    	extensions: ['', '.css', '.js', '.coffee', '.scss', '.less', '.styl']
    },

    resolveLoader: {
    	modulesDirectories: [path.join(__dirname, 'node_modules')],
    	moduleTemplates: ['*-loader'],
    	extensions: ['', '.js']
    },

    module: {
    	loaders: [
            { 
                test: /\.coffee$/,
                loader: "coffee" 
            },
            {
                test: /\.(coffee\.md|litcoffee)$/, 
                loader: "coffee-loader?literate"
            },
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
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: `url?limit=100000`
            }
    	]
    },

    postcss: function () {
        return [precss, autoprefixer];
    },

    plugins:[
    	new ExtractTextPlugin(`${config.get('cssPath')}/[name].css`, {allChunks: true}),
    ],

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
}