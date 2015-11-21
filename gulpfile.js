/**
 *  babel
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bs = require('browser-sync').create();
var reload = bs.reload,
    runSequence = require('run-sequence').use(gulp),
    src = './assets', //开发环境目录
    build = './build'; //用于生产环境的目录
//编译ES6语法的js
gulp.task('babel', function() {
    return gulp.src(src + '/jsx/**/*.jsx')
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(src + '/js/'));
});
// browserSync start the server
gulp.task('bs', function() {
    var files;
    files = [
        src + '/**/*.+(html|php|js|css|png|jpg|svg|gif)'
    ];
    bs.init(files, {
        server: {
            baseDir: './'
        }
    });
});
gulp.task('server', ['babel', 'bs'], function() {
    gulp.watch(src + '/jsx/**/*.jsx', function() {
        runSequence('babel', reload);
    });
});
//处理脚本文件
gulp.task('script', function() {
    return gulp.src(src + '/js/**/*.js')
        //先进行js hint
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'))
        //再进行压缩
        .pipe($.uglify())
        //修改扩展名
        .pipe($.rename(function(path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest(build + '/js/'))
        .pipe($.notify('Script process success!!!'));
});
//处理样式文件
gulp.task('style', function() {
    return gulp.src(src + '/sass/**/*.scss')
        //scss编译
        .pipe($.sass().on('error', $.sass.logError))
        //添加浏览器前缀
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(src + '/css/'))
        //css压缩
        .pipe($.minifyCss({
            compatibility: 'ie8'
        }))
        //修改扩展名
        .pipe($.rename(function(path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest(build + '/css/'))
        .pipe($.notify('Style process success!!!'));
});
