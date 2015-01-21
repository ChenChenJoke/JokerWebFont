var gulp = require('gulp');

var rename = require("gulp-rename");

var minifyCSS = require('gulp-minify-css');

var concat = require('gulp-concat');

gulp.task('build', function() {
  gulp.src('./src/**/*.css')
    .pipe(concat('ui.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['build']);