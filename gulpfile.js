var gulp = require('gulp');
var gzip = require('gulp-gzip');

gulp.task('compresscontainer', function() {
  return gulp.src(['./dist/container/browser/*.css','./dist/container/browser/*.js'])
    .pipe(gzip())
    .pipe(gulp.dest('./dist/container/browser/'));
});
