var gulp = require('gulp');

var wrap = require("gulp-wrap");

var uglify = require('gulp-uglify');

var rename = require("gulp-rename");

var minifyCSS = require('gulp-minify-css');

gulp.task('build', function() {
  gulp.src('./src/**/*.js')
    .pipe(wrap('!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b(require,exports,module):b()}(this,function(){<%= contents %>});'))
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
});

gulp.task('default', ['build']);