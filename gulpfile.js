"use strict";

const gulp = require('gulp');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const urlAdjuster = require('gulp-css-replace-url');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');


/* Leaflet-Extramarkers */

function extramarkersImages() {
    return gulp
        .src('node_modules/leaflet-extra-markers/dist/img/*')
        .pipe(gulp.dest('public/img/leaflet-extra-markers'));
}

function extramarkersCss() {
    return gulp
        .src('node_modules/leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css')
        .pipe(urlAdjuster({
            replace: ['../img/','/img/leaflet-extra-markers/'],
        }))
        .pipe(gulp.dest('assets/css'));
}

function extramarkersJs() {
    return gulp
        .src('node_modules/leaflet-extra-markers/dist/js/leaflet.extra-markers.js')
        .pipe(gulp.dest('public/js/'));
}

const buildExtramarkers = gulp.series(extramarkersImages, extramarkersCss, extramarkersJs);

/* Font Awesome */

function copyFontawesomeFonts() {
    return gulp
        .src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts'));
}

const buildFontawesome = gulp.series(copyFontawesomeFonts);

/* Assets */

function copyAssetImages() {
    return gulp
        .src('assets/img/*/*')
        .pipe(gulp.dest('public/img/'));
}

const buildAssets = gulp.series(copyAssetImages);

/* CSS */

function sassCss() {
    return gulp
        .src('assets/scss/criticalmass.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
}

function compressCss() {
    return gulp
        .src([
            'assets/css/*.css',
        ])
        .pipe(cleanCSS())
        .pipe(concat('criticalmass.min.css'))
        .pipe(gulp.dest('public/css/'));
}

//gulp.task('compress-css', ['leaflet-css', 'extramarkers-css', 'sass'], function () {

//});

const buildCss = gulp.series(sassCss, compressCss);

const build = gulp.series(buildExtramarkers, copyAssetImages, buildCss, buildFontawesome);

exports.default = build;
