/*
 * Initial setting
 * */
var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var del = require('del');
var dirs = {
	deploy	:	'deploy',
	release	:	'_release',
	src		:	'src'
};

gulp.task('clean:allRelease', function(cb) {
	del([dirs.release], cb);
});

gulp.task('copy:toRelease', function() {
	return gulp
		.src(
			[dirs.deploy + '/**'],
			{base: dirs.deploy}
		)
		.pipe(gulp.dest(dirs.release));
});

gulp.task('watch', function () {
	gulp.watch(dirs.src +  '/**', ['deploy']);
});

/*
 * Custom setting
 * */
gulp.task('common:before', function(cb) {
	runSequence(
		/* Common tasks here */
		cb);
});

gulp.task('deploy', function(cb) {
	runSequence('common:before',
		/* Deploy tasks here */
		cb);
});

gulp.task('release', function(cb) {
	runSequence(
		'common:before',
		'clean:allRelease',
		'copy:toRelease',
		/* Release tasks here */
		cb);
});

gulp.task('default', ['release']);

