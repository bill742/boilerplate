var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    autoprefixer = require('gulp-autoprefixer');

var cssSources,
    jsSources;

cssSources = [
  'assets/css/*.sass'
];

jsSources = [
  'assets/js/*.js'
];

gulp.task('sass', function(){
  return gulp.src(cssSources)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', function() {
  gulp.src(jsSources)
      .pipe(concat('scripts.js'))
      .pipe(uglify())
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

gulp.task('misc', function(){
	gulp.src(['js/*.json'])
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'js', 'misc', 'sass'], function(){
  gulp.watch(cssSources, ['sass']);
  gulp.watch('*.html', ['html']);
  gulp.watch(jsSources, ['js']);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
  });
});

gulp.task('default', ['sass', 'js', 'html', 'misc', 'watch']);
