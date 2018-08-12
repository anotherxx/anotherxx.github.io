"use strict";

var gulp = require('gulp'),
		fileinclude = require("gulp-file-include"),
		sass = require('gulp-sass'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		prefix = require('gulp-autoprefixer'),
		imagemin = require('gulp-imagemin'),
		browserSync = require('browser-sync').create();


var useref = require('gulp-useref'),
		gulpif = require('gulp-if'),
		cssmin = require('gulp-clean-css'),
		//uglify = require('gulp-uglify'),
	    jsminify = require('gulp-minify'),
		rimraf = require('rimraf'),
		notify = require('gulp-notify');

var paths = {
			blocks: 'blocks/',
			devDir: 'app/',
			outputDir: 'build/'
		};


/*********************************
		Developer tasks
*********************************/

//html compile
gulp.task('html', function() {
	return gulp.src(paths.blocks + 'index.html')
		.pipe(plumber())
		.pipe(fileinclude({
			prefix: "@@"
		}))
		.pipe(gulp.dest(paths.devDir))
		.pipe(browserSync.stream())
});

//sass compile
gulp.task('scss', function() {
	return gulp.src(paths.blocks + 'main.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 10 versions'],
			cascade: true
		}))
		.pipe(gulp.dest(paths.devDir + 'css/'))
		.pipe(browserSync.stream());
});

//js compile
gulp.task('scripts', function() {
	return gulp.src([
			paths.blocks + '**/*.js',
			'!' + paths.blocks + '_assets/**/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.devDir + 'js/'))
		.pipe(browserSync.stream());
});

//watch
gulp.task('watch', function() {
	gulp.watch(paths.blocks + '**/*.html', ['html']);
	gulp.watch(paths.blocks + '**/*.scss', ['scss']);
	gulp.watch(paths.blocks + '**/*.js', ['scripts']);
});

//server
gulp.task('browser-sync', function() {
	browserSync.init({
		port: 3000,
		server: {
			baseDir: paths.devDir
		}
	});
});


/*********************************
		Production tasks
*********************************/

//clean
gulp.task('clean', function(cb) {
	rimraf(paths.outputDir, cb);
});

//css + js
gulp.task('build', ['clean'], function () {
	return gulp.src(paths.devDir + '*.html')
		.pipe( useref())
		.pipe( gulpif('*.js', jsminify({
			ext: {
                src: '-source.js',
                min: '.js'
			}
		}) ))
		.pipe( gulpif('*.css', cssmin() ))
		.pipe( gulp.dest(paths.outputDir) )
});

//copy images to outputDir
gulp.task('imgBuild', ['clean'], function() {
	return gulp.src(paths.devDir + 'img/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest(paths.outputDir + 'img/'));
});

//copy fonts to outputDir
gulp.task('fontsBuild', ['clean'], function() {
	return gulp.src(paths.devDir + '/fonts/**/*')
		.pipe(gulp.dest(paths.outputDir + 'fonts/'));
});


//default
gulp.task('default', ['browser-sync', 'watch', 'html', 'scss', 'scripts']);

//production
gulp.task('prod', ['build', 'imgBuild', 'fontsBuild']);
