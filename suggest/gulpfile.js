var gulp = require('gulp');

var wrap = require("gulp-wrap");

var uglify = require('gulp-uglify');

var rename = require("gulp-rename");
var open = require("gulp-open");
var serve = require("gulp-serve");

var minifyCSS = require('gulp-minify-css');

gulp.task('serve', serve('./'));


gulp.task('build', function() {
  gulp.src('./src/**/*.js')
    .pipe(wrap('!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b(require,exports,module):a.sug=b()}(this,function(){<%= contents %>});'))
    .pipe(uglify({
      "output": {
        "beautify": true
      }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({
      "mangle": true
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'));

  gulp.src('./src/**/*.css')
    .pipe(gulp.dest('./dist/'))
    .pipe(minifyCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('default', ['serve', 'open']);