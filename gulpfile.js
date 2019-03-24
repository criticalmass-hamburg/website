let gulp = require('gulp');
let minify = require('gulp-minify');
let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');
let urlAdjuster = require('gulp-css-replace-url');
let flatten = require('gulp-flatten');
let sass = require('gulp-sass');
sass.compiler = require('node-sass');

/* Leaflet */

gulp.task('leaflet-images', function () {
    return gulp.src('node_modules/leaflet/dist/images/*')
        .pipe(gulp.dest('public/img/leaflet'));
});

gulp.task('leaflet-css', [], function() {
    return gulp.src('node_modules/leaflet/dist/leaflet.css')
        .pipe(urlAdjuster({
            replace: ['images/','/img/leaflet/'],
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('build-leaflet', ['leaflet-images', 'leaflet-css']);


/* Leaflet-Extramarkers */

gulp.task('extramarkers-images', function () {
    return gulp.src('node_modules/leaflet-extra-markers/dist/img/*')
        .pipe(gulp.dest('public/img/leaflet-extra-markers'));
});

gulp.task('extramarkers-css', [], function() {
    return gulp.src('node_modules/leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css')
        .pipe(urlAdjuster({
            replace: ['../img/','/img/leaflet-extra-markers/'],
        }))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('extramarkers-js', function () {
    return gulp.src('node_modules/leaflet-extra-markers/dist/js/leaflet.extra-markers.js')
        .pipe(gulp.dest('public/js/'));
});

gulp.task('build-leaflet-extramarkers', ['extramarkers-images', 'extramarkers-css', 'extramarkers-js']);


/* Font Awesome */

gulp.task('copy-fontawesome-fonts', function () {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('build-fontawesome', ['copy-fontawesome-fonts']);


/* Assets */

gulp.task('copy-asset-images', function () {
    return gulp.src('assets/img/*/*')
        .pipe(gulp.dest('public/img/'));
});

gulp.task('build-assets', ['copy-asset-images']);


/* CSS */

gulp.task('sass', function () {
    return gulp.src('assets/scss/criticalmass.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/css'));
});

gulp.task('compress-css', ['leaflet-css', 'extramarkers-css', 'sass'], function () {
    return gulp.src([
            'assets/css/*.css',
        ])
        .pipe(cleanCSS())
        .pipe(concat('criticalmass.min.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('build-css', ['sass', 'compress-css']);


/* Javascript */

gulp.task('copy-js-modules', function () {
	return gulp.src([
		'assets/js/**/**/**/*.js',
	    ])
        .pipe(flatten())
		.pipe(gulp.dest('public/js/'));
});

gulp.task('copy-js-external', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/leaflet/dist/leaflet.js',
        'node_modules/requirejs/require.js',
    ])
        .pipe(gulp.dest('public/js/'));
});

gulp.task('compress-js', ['copy-js'], function () {
	return gulp.src([
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
});

gulp.task('copy-js', ['copy-js-modules', 'copy-js-external']);

gulp.task('build-js', ['compress-js']);

gulp.task('build', ['build-leaflet', 'build-leaflet-extramarkers', 'build-fontawesome', 'build-assets', 'build-js', 'build-css'], function () {});

gulp.task('default', ['build']);
