'use strict';

const gulp = require('gulp');
const del = require('del');
const shell = require('gulp-shell');
const args = require('yargs').argv;

const paths = {
  root: './',
  src: './src/',
  dist: './dist/',
  coverage: './coverage'
};
paths.tests = paths.src + '**/*.spec.js';

class Tasks {
  
  static clean() {
    return del([paths.dist + '*', paths.coverage]);
  }

  static get buildSrc() {
    // Just run the tsc via command line...   
    return shell.task('tsc');
  }

  static buildTests() {
    // Just copy for now...
    return gulp.src(paths.tests)
      .pipe(gulp.dest(paths.dist));
  }

  static get test() {
    return shell.task('nyc --color -a ava -v', { ignoreErrors: true });
  }

  static watch() {
    return gulp.watch([paths.src + '**/*'], ['quicktest']);
  }

  static bump(step) {
    return shell.task(`npm version ${step} -m "${(args.m || 'Bump to %s.')}"`);
  }
}

// Drop the dist folder...
gulp.task('clean', Tasks.clean);

// Build without cleaning...
gulp.task('quickbuild:tests', Tasks.buildTests);
gulp.task('quickbuild:src', Tasks.buildSrc);

// Build with cleaning...
gulp.task('build:tests', ['clean'], Tasks.buildTests);
gulp.task('build:src', ['clean'], Tasks.buildSrc);

// Build with either run after cleaning or without...
gulp.task('quickbuild', ['quickbuild:tests', 'quickbuild:src']);  
gulp.task('build', ['build:tests', 'build:src']);

// Run the basic `npm test` command after a quick build...
gulp.task('quicktest', Tasks.test);
gulp.task('test', ['build'],  Tasks.test);

// Used for better development (watch with TAP output) (but also because we now are moving more files around)
gulp.task('watch', ['build'], Tasks.watch);

// Publish script, for custom actions...
gulp.task('publish', ['test'], Tasks.publish);

// Set up the git version helpers...
['patch', 'minor', 'major'].forEach(step => {
  gulp.task('bump:' + step, Tasks.bump(step));
});

// Default task...
gulp.task('default', ['build']);