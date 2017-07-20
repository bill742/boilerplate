var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    concatCss = require('gulp-concat-css'),
    // cleanCSS = require('gulp-clean-css'),
    minify = require('gulp-minify-css'),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    merge = require('merge-stream');

var sassSources,
    cssSources,
    jsSources,
    coffeeSources;

sassSources = ['assets/sass/*.sass'];
cssSources = ['assets/css/*.css'];
jsSources = ['assets/js/*.js'];
coffeeSources = ['assets/coffee/*.coffee'];

gulp.task('css', function(){
  // Prefix and concat SASS files
  var sassStream = gulp.src(sassSources)
    .pipe(sass())
    .pipe(concat('sass-files.sass'));

  // Concat and minify all .css files
  var cssStream = gulp.src(cssSources)
    .pipe(concat('css-files.css'));

  var mergedStream = merge(sassStream, cssStream)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('main.css'))
    .pipe(minify())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
  return mergedStream;
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
    .pipe(coffee({bare: true}))
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function(){
	gulp.src('*.html')
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function(){
	gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'));
});

gulp.task('misc', function(){
	gulp.src(['js/*.json'])
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'js', 'css'], function(){
  gulp.watch(sassSources, ['css']);
  gulp.watch(cssSources, ['css']);
  gulp.watch('*.html', ['html']);
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch('js/*.js', ['coffee']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
  });
});

gulp.task('default', ['css', 'js', 'html', 'misc', 'watch']);
