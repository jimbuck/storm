
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
  root: './',
  src: './src/',
  dist: './dist/*'
};

gulp.task('clean', function () {
  return del([
    paths.dist,
    paths.root + '_references.js*'
  ]);
});

function compileTypescript() {
  return shell.task('tsc');
}

gulp.task('compile', compileTypescript());

gulp.task('build', ['clean'], compileTypescript());

gulp.task('default', ['build']);