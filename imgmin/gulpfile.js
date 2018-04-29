var gulp =require('gulp');
var $=require('gulp-load-plugins')();
gulp.task('img',function(){
    gulp.src('src/img/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('dist/img'));
});
