var gulp = require('gulp');
var $ =require('gulp-load-plugins')();
var del=require('del');
var runSequence=require('run-sequence');
gulp.task('hello', gulp.series(function(done){
    console.log('hello world');
    done();
}));
gulp.task('copy', function(){
      return gulp.src(['src/*'])
      .pipe($.filelog())
      .pipe(gulp.dest('lib'));
        
});
function clean(done){
    del(['lib']);
    done();
}
gulp.task('clean',clean);
gulp.task('jscon',()=>{
    return gulp.src('src/**/*.js')
                .pipe($.plumber())
                .pipe($.sourcemaps.init())
                .pipe($.concat('index.min.js'))
                .pipe($.uglify())
                .pipe($.sourcemaps.write('../maps/',{addComment: false}))
                .pipe(gulp.dest('lib/js'));
});
gulp.task('watch',function(){
    gulp.watch('src/**/*.js',gulp.series('jscon'));
})
gulp.task('default',gulp.series('clean','copy'))

