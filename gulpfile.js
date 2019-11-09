"use strict";

const gulp = require('gulp');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const urlAdjuster = require('gulp-css-replace-url');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

/* Leaflet */

function leafletImages() {
    return gulp
        .src('node_modules/leaflet/dist/images/*')
        .pipe(gulp.dest('public/img/leaflet'));
}

function leafletCss() {
    return gulp
        .src('node_modules/leaflet/dist/leaflet.css')
        .pipe(urlAdjuster({
            replace: ['images/','/img/leaflet/'],
        }))
        .pipe(gulp.dest('assets/css'));
}

const buildLeaflet = gulp.series(leafletImages, leafletCss);

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

const buildCss = gulp.series(sassCss, compressCss);

/* Javascript */

function copyJsModules() {
    return gulp
        .src([
            'assets/js/**/**/**/*.js',
        ])
        .pipe(flatten())
        .pipe(gulp.dest('public/js/'));
}

function copyJsExternal() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/leaflet/dist/leaflet.js',
            'node_modules/requirejs/require.js',
        ])
        .pipe(gulp.dest('public/js/'));
}

function compressJs() {
    return gulp
        .src([
            'public/js/*.js',
        ])
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true,
            ignoreFiles: ['*.min.js']
        }))
        .pipe(gulp.dest('public/js/'));
}

const buildJs = gulp.series(copyJsModules, copyJsExternal, compressJs);

const build = gulp.series(buildLeaflet, buildExtramarkers, copyAssetImages, buildCss, buildFontawesome, buildJs);

exports.default = build;
