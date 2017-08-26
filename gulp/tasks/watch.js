var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

gulp.task('watch', function () {

    browserSync.init({
        notify: false,
        proxy: {
            target: "cakery.dev"
        }
    });

    watch('./*.php, ./templates/**/*.twig', function () {
        browserSync.reload();
    });

    watch('./static/sass/**/*.scss', function () {
        gulp.start('cssInject');
    });

    watch('./static/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });
});

gulp.task('cssInject', ['styles'], function () {
    return gulp.src('./style.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function() {
    browserSync.reload();
});
