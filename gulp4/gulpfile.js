var gulp = require('gulp');
var $ =require('gulp-load-plugins')();
var del=require('del');
var runSequence=require('run-sequence');
var lazypipe=require('lazypipe');
gulp.task('hello', gulp.series(function(done){
    console.log('hello world');
    done();
}));
gulp.task('copy', function(){
      return gulp.src(['src/*'])
      .pipe($.debug({title: 'unicorn:'}))
      .pipe(gulp.dest('lib'));
        
});
function clean(done){
    del(['lib','rev','bulid','dist']);
    done();
}
gulp.task('clean',clean);
gulp.task('js1',function(){
    
})
gulp.task('jscon',()=>{
        return gulp.src('src/**/*.js')
            .pipe($.plumber())
            .pipe(gulp.dest('bulid'))
                .pipe($.sourcemaps.init())
                .pipe($.plumber())
                .pipe($.uglify())
                .pipe($.sourcemaps.write('maps'))
                .pipe($.rev())
                .pipe(gulp.dest('lib'))
                .pipe($.rev.manifest())
                .pipe(gulp.dest('./rev'))
});
gulp.task('watch',function(){
    gulp.watch('src/**/*.js',gulp.series('jscon'));
});
gulp.task('rev',function(){
    return gulp.src(['rev/**/*.json','lib/*.html'])
           .pipe($.revCollector(
               {repalceReved:true}
           ))
           .pipe(gulp.dest('bulid'));
});

gulp.task('usemin',function(){
    return gulp.src('src/*.html')
        .pipe(
            $.usemin({
                css: [ $.rev() ],
                js: [ $.uglify(), $.rev() ],
                inlinejs: [ $.uglify() ],
                inlinecss: [ $.cleanCss(), 'concat' ]
              })
        )
        .pipe(gulp.dest('./bulid'))
});
gulp.task('use', function() {
    return gulp.src('./src/index.html')
        .pipe($.useref())
      .pipe($.useref({}, lazypipe().pipe($.sourcemaps.init, { loadMaps: true })))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.js', $.rev()))
      .pipe($.if('*.css', $.cleanCss()))
      .pipe($.if('*.css', $.rev()))
      .pipe($.revReplace())
      .pipe($.sourcemaps.write('maps'))
      .pipe(gulp.dest('dist/'));
  });
gulp.task('rev-born',gulp.series('clean',gulp.parallel('jscon','copy'),'rev'));
gulp.task('default',gulp.series('clean','copy'))

gulp.task('revCollector',['rev'],function(){
    gulp.src(['rev/*.json','src/*.html'])
        .pipe($.revCollector({
            replaceReved:true
        }))
        .pipe(gulp.dest('lib'))
})