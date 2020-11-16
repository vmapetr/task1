// Load plugins
var clean = require('gulp-clean');
var gulpClient = require('gulp');
var gulpRunner = require('gulp-run');

// Purge generated files
gulpClient.task('clean', function() {
    return  gulpClient.src(['./dist', './output'], {read: false, allowEmpty: true}).pipe(clean());
});

// Generate ts source
gulpClient.task('build', function() {
    return  gulpRunner('tsc && node dist/app.js').exec();
});

// Generate js bundle via Webpack
gulpClient.task('bundle', function() {
    return  gulpRunner('webpack --config output/webpack.config.js').exec();
});

// Execute all tasks
gulpClient.task('run', gulpClient.series('clean', 'build', 'bundle', function(done) {
    done();
}));