
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
  root: './',
  src: './src/',
  dist: './dist/'
};
paths.tests = paths.src + '**/*.spec.js';

function buildTests() {
  return function () {
    // Just copy for now...
    return gulp.src(paths.tests)
      .pipe(gulp.dest(paths.dist));
  }
}

function buildSrc() {
  // Just run the tsc via command line...   
  return shell.task('tsc');
}

function clean() {
  return del([ paths.dist + '*' ]);
}

function npmTest() {
  return shell.task('npm test', {ignoreErrors:true});
}

function watchAndTest() {
  return function(){
    gulp.watch([paths.src + '**/*'], ['test']);
  }
}

// Drop the dist folder...
gulp.task('clean', clean);

// Build without cleaning...
gulp.task('quickbuild:tests', buildTests());
gulp.task('quickbuild:src', buildSrc());

// Build with cleaning...
gulp.task('build:tests', ['clean'], buildTests());
gulp.task('build:src', ['clean'], buildSrc());

// Run the basic `npm test` command after a quick build...
gulp.task('test', ['quickbuild'],  npmTest());

// Used for better development (watch with TAP output) (but also because we now are moving more files around)
gulp.task('watch', ['build'], watchAndTest());

gulp.task('quickbuild', ['quickbuild:tests', 'quickbuild:src']);  
gulp.task('build', ['build:tests', 'build:src']);
gulp.task('default', ['build']);