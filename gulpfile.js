const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const prefix      = require('gulp-autoprefixer');

// [gulp-sass] error message in file_name on line 1

var prefixerOptions = {
browsers: ['last 2 versions']
};

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest('src/css'))
})

gulp.task('default', ['js','serve', 'fa', 'fonts']);
