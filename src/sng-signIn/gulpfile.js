'use strict';

var gulp = require('gulp');
var sass = require("gulp-sass");
var insert = require("gulp-insert");   
var rename = require("gulp-rename");   
var async = require('async');
var wct = require('web-component-tester').test;


gulp.task('test', function() {
  wct();
});

gulp.task('styles', () => {
  var sources = gulp.src('*.scss');
  var filename;

  async.series([
    (next) => {
      sources
          .pipe(sass())
          .pipe(rename( (path) => {
            filename = path.basename;
            path.basename += "-styles"
            path.extname = ".html"
          }))
          .pipe(gulp.dest('.'))
          .on('end', next);
    },
    () => {
      gulp.src(filename + '-styles.html')
        .pipe(insert.wrap('<dom-module id="' + filename + '-styles"><template><style>\n', '\n</style></template></dom-module>'))
        .pipe(gulp.dest('.'));
    }
  ]);
});

gulp.task('default', ['styles'], function(){});