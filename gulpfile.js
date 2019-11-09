"use strict";

const gulp = require('gulp');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const urlAdjuster = require('gulp-css-replace-url');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

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


const build = gulp.series(copyAssetImages, buildCss);

exports.default = build;
