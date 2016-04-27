
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
  root: './',
  lib: './lib/'
};

gulp.task('clean', function () {
  return del([
    paths.lib + '**/*.js*',
    '!' + paths.lib + '**/*.spec.js',
    paths.root + '_references.js*'
  ]);
});

function compileTypescript() {
  return shell.task('tsc');
}

gulp.task('compile', compileTypescript());

gulp.task('build', ['clean'], compileTypescript());

gulp.task('default', ['build']);