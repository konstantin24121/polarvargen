'use strick';

const gulp        = require('gulp');
const livereload  = require('gulp-livereload');
const config      = require('nconf');
const path        = require("path");
const merge       = require('merge');
const gulpSlash   = require('gulp-slash');

config.argv().env().file({ file: './polarvargen.json' });

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch([
            '../**/*.php',
            gulpSlash(path.join('.', config.get('distFolder'), config.get('cssPath'), '*.css')),
            gulpSlash(path.join('.', config.get('distFolder'),config.get('jsPath'), '*.js')),
            gulpSlash(path.join('!.', config.get('distFolder'),config.get('jsPath'), '*Style.js'))
            ])
        .on('change', function(file) {
              gulp.src(file).pipe(livereload());
         });
});