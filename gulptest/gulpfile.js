const gulp = require('gulp');
const log = console.log;
var del = require('del');
var stylish = require('jshint-stylish');
const $ = require('gulp-load-plugins')();
var runSequence=require('run-sequence');
gulp.task('copy', function () {
     gulp.src('src/*.js')
        .pipe($.filelog())
        .pipe(gulp.dest('lib/js'))
        .pipe(gulp.dest('bulid'));
    gulp.src('src/*.css')
        .pipe($.filelog())
        .pipe(gulp.dest('lib/css'))
})

gulp.task('echo', function () {
    console.log("Gulp is running!" + new Date());
});
gulp.task('clean', function () {
    del([
        'lib', 'bulid', 'rev','bulit'
    ]);
    log('wancheng');
});
gulp.task('revreplace', ['rev'], function () {
    var festJson =gulp.dest('rev/**/.json');
    return gulp.src('src/one.html')
            .pipe($.revReplace({
                manifest:festJson
            }))
            .pipe(gulp.dest('lib'))
});

gulp.task('watch', function () {
    gulp.watch(['gulpfile.js', 'src/**/*.js'], ['jscheck', 'echo']);
});
gulp.task('default', ['watch']);

gulp.task('js', function () {
   gulp.src('src/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(stylish))
        .pipe($.rev())
        .pipe(gulp.dest('bulid/js'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('rev/js'));
    return      console.log('js');
});

gulp.task('css',function(){
    return gulp.src('src/*.css')
        .pipe($.rev())
        .pipe(gulp.dest('bulid/css'))
        .pipe($.rev.manifest())
        .pipe(gulp.dest('rev/css'));
        console.log('css');
});
gulp.task('all',['clean'],function(callback){
        runSequence(['css','js'],callback);
})
gulp.task('collector',['css','js'],function(){
    return gulp.src(['rev/**/*.json','src/one.html','src/two.html'])
               .pipe($.revCollector({
                   replaceReved:true,
                   dirReplacements: {
                    'css': '/bulid/css',
                    'js': '/bulid/js/'
                    }
               }))
               .pipe(gulp.dest('lib'));
});
var rev = require('gulp-rev-append');
gulp.task('rev', function() {
  gulp.src('src/one.html')
    .pipe(rev())
    .pipe(gulp.dest('bulid'));
});
gulp.task('imgmin',function(){
    gulp.src('src/*.gif')
        .pipe($.imagemin())
        .pipe(gulp.dest('lib'))
})