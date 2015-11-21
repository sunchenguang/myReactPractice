/**
 *  babel
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    bs = require('browser-sync').create();

var reload = bs.reload,
    runSequence = require('run-sequence').use(gulp),
    src = './src', //源目录路径
    dist = './dist'; //输出路径


gulp.task('babel', function() {
    return gulp.src('./src/*.jsx')
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});


// Start the server
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
    gulp.watch(src + '/**/*.jsx', function() {
        runSequence('babel', reload);
    });
});
gulp.task('lint', function() {
    return gulp.src('./dist/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});
