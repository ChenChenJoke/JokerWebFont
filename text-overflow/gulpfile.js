var gulp = require('gulp');

var rename = require("gulp-rename");

var minifyCSS = require('gulp-minify-css');

gulp.task('build', function() {
  gulp.src('./src/text_overflow.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'))

  gulp.src('./src/text_overflow.rtl.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['build']);