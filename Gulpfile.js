var NwBuilder = require('nw-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('nw', function () {

    var nw = new NwBuilder({
        version: '0.12.0',
        files: './src/**',
        macIcns: './icons/ripple-logo.icns',
        macPlist: {mac_bundle_id: 'myPkg'},
        platforms: ['linux32', 'linux64', 'win32', 'win64', 'osx32', 'osx64']
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('nw-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('nw-builder', err);
    });
});

gulp.task('default', ['nw']);
