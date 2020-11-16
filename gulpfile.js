// Load plugins
var gulp = require('gulp');
var clean = require('gulp-clean');
var run = require('gulp-run');

// Purge generated filed
gulp.task('clean', function() {
    return  gulp.src(['./dist', './output'], {read: false, allowEmpty: true})
                .pipe(clean());
});
// Generate ts source
gulp.task('build', function() {
    return  run('tsc && node dist/app.js').exec()                              
});

// Generate js bundle via Webpack
gulp.task('bundle', function() {
    return  run('npx webpack --config output/webpack.config.js').exec() 
});

// Execute all tasks
gulp.task('run', gulp.series('clean', 'build', 'bundle', function (done) {
    done();
}));