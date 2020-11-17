// Load plugins
var clean = require('gulp-clean');
var fs = require('fs');
var gulpClient = require('gulp');
var gulpRunner = require('gulp-run');

// Purge generated files
gulpClient.task('clean', function() {
    return  gulpClient.src(['./dist', './output'], {read: false, allowEmpty: true}).pipe(clean());
});

// Generate ts source
gulpClient.task('build', function() {
    return gulpRunner(`tsc && node dist/app.js`).exec();
});

// Generate js bundle via Webpack
gulpClient.task('bundle', function() {
    let webpackPath = "output/webpack.config.js"

    if (fs.existsSync(webpackPath)) {
        return gulpRunner(`webpack --config ${webpackPath}`).exec();
    } else {
        return Promise.resolve(console.error(`Missing ${webpackPath}! Run 'gulp build'`));
    }
});

// Execute all tasks
gulpClient.task('run', gulpClient.series('clean', 'build', 'bundle'), function(done) {
    done();
});