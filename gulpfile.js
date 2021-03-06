const gulp = require('gulp')
const browserSync = require('browser-sync')
const nodemon = require('gulp-nodemon')
const sass = require('gulp-sass')
const reload = browserSync.reload
const babel = require('gulp-babel')


gulp.task('default', ['browser-sync', 'watch'])

gulp.task('browser-sync', ['nodemon'], () => {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
		port: 8080
	})
})

gulp.task('nodemon', cb => {
	let started = false
	return nodemon({
		script: './build/app.js'
	}).on('start', () => {
		if (!started) {
			cb()
			started = true
		}
	})
})

gulp.task('sass', () => {
	gulp.src('sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
})

gulp.task('watch', () => {
	gulp.watch(['sass/*', 'views/*'], ['sass', reload])
	gulp.watch('src/*',['babel'])
})

gulp.task('babel', () => { 
	gulp.src('./src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}).on('error', (err)=>{
			console.log(err)
		}))
		.pipe(gulp.dest('./build'))
})