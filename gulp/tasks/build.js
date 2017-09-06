var gulp = require('gulp'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

gulp.task('previewDist', function() {
  browserSync.init({
      notify: false,
      server: {
          baseDir: "theme"
      }
    });
});

gulp.task('deleteDistFolder', function() {
  return del("./theme");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function(){
  var pathsToCopy = [
    './**/*',
    '!./app/index.html',
    '!./bin',
    '!./bin/**',
    '!./gulp',
    '!./gulp/**',
    '!./node_modules',
    '!./node_modules/**',
    '!./static/images',
    '!./static/images/**',
    '!./static/sass',
    '!./static/sass/**',
    '!./tests',
    '!./tests/**',
    '!./app/temp',
    '!./app/temp/**'
  ]
  return gulp.src(pathsToCopy)
  .pipe(gulp.dest("./theme"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin");
});

gulp.task('usemin', ['styles'], function() {
  return gulp.src('./app/index.html')
  .pipe(usemin({
    css: [function() {return rev()}, function() {return cssnano()}],
    js: [function() {return rev()}, function() {return uglify()}]
  }))
  .pipe(gulp.dest("./theme"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'useminTrigger']);
