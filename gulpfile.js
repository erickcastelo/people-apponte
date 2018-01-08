var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    replace = require('gulp-html-replace'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    browser = require('browser-sync');


gulp.task('default', ['sass']);

gulp.task('copy', ['clean'], function () {
    return gulp.src('public/**/*')
        .pipe(gulp.dest('dist'))
});

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean())
});

gulp.task('build-js', ['copy'], function () {
    return gulp.src([
            'dist/js/lib/angular.min.js',
            'dist/js/lib/angular-route.min.js',
            'dist/js/main.js',
            'dist/js/controllers/principal-controller.js',
            'dist/js/services/PeopleService.js',
        ])
        .pipe(concat('all.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('build-html', ['build-js'], function () {
    return gulp.src('dist/**/*.html')
        .pipe(replace({
            js: 'js/all.min.js',
            css: 'css/all.min.css'
        }))
        .pipe(gulp.dest('dist'))
});


gulp.task('sass', ['build-html'], function() {
    return gulp.src('dist/sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('server', function () {
    browser.init({
        server: {
            proxy: "localhost:3000"
        }
    });

    gulp.watch('src/**/*').on('change', browser.reload);
});

gulp.task('watch', function() {
    gulp.watch( 'public/**/*', ['sass'] );
});