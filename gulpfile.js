'use strict';

var gulp = require('gulp');
var jeditor = require('gulp-json-editor');
var merge = require('merge-stream');
var zip = require('gulp-zip');

var xpiName = 'jiracanned-responses.xpi';
var zipName = 'jira-canned-responses.zip';

gulp.task('default', function () {
  var files = ['src/*', '!src/manifest.json'];
  var manifest = gulp.src('src/manifest.json');
  var dest = gulp.dest('bin/');

  merge(gulp.src(files), manifest)
    .pipe(zip(zipName))
    .pipe(dest);

  manifest = manifest.pipe(jeditor({
    'applications': {
      'gecko': {
        'id': 'jira-canned-responses@example'
      }
    }
  }));

  merge(gulp.src(files), manifest)
    .pipe(zip(xpiName))
    .pipe(dest);
});
