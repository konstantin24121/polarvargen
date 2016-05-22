var assert = require('chai').assert;
var fs = require("fs")

describe('All entry points are compiled successfully', function() {
	describe('styles', function () {
		it('should return true when file exist', function () {
			path = './public/css/baseSass.css';
			css = fs.statSync(path).isFile();
			assert.equal(true, css);
		});
	});
});