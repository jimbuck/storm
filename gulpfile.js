
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
  root: './',
  src: './src/',
  dist: './dist/*'
};

gulp.task('clean', function () {
  return del([ paths.dist ]);
});

function compileTypescript() {
  return shell.task('tsc');
}

gulp.task('build', compileTypescript());

gulp.task('rebuild', ['clean'], compileTypescript());

gulp.task('default', ['build']);