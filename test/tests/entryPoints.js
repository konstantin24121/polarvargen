var assert = require('chai').assert;
var fs = require("fs");
var config = require('nconf');
var path = require("path");
config.argv().env().file({ file: './polarvargen.json' });


describe('All entry points are compiled successfully', function() {
	describe('style entry points', function () {
		entryCss = config.get('entryCss');

		for(var pointCss in entryCss) { 
			pathCss = path.join('.', config.get('distFolder'), config.get('cssPath'), pointCss+'.css');

			(function(path){
				it('should return true when '+path+' file exist', function () {
					fs.stat(path, function(err, data) { 
	                   	if (err)
							throw err;       
						done();
		            }); 
				});
			})(pathCss);
		}
	});
	
	describe('script entry points', function () {
		entryJs = config.get('entryJs');

		for(var pointJs in entryJs) { 
		    pathJs = path.join('.', config.get('distFolder'), config.get('jsPath'), pointJs+'.js');     

			(function(path){
		        it('should return true when '+path+' file exist', function () { 
		            fs.stat(path, function(err, data) { 
	                   	if (err)
							throw err;       
						done();
		            }); 
		         });
		    })(pathJs);
		}
	});
});