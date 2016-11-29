var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var less = require('gulp-less-sourcemap');
var ghPages = require('gulp-gh-pages');

// GH Pages
gulp.task('deploy', function() {
    return gulp.src('./public/**/*')
        .pipe(ghPages({
            branch: "gh-pages"
        }));
});

// Static Server
gulp.task('serve', function() {
    browserSync.init({
        server: "."
    });
});

// Watching scss/less/html files
gulp.task('watch', ['serve', 'sass', 'less'], function() {
    gulp.watch("public/scss/*.scss", ['sass']);
    gulp.watch("public/less/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("public/scss/*.scss")
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'scss'
        }))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});

// Compile LESS into CSS & auto-inject into browsers
gulp.task('less', function() {
    return gulp.src("public/less/*.less")
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: './public/less' // Optional absolute or relative path to your LESS files
            }
        }))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
gulp.task('server', ['serve']);
gulp.task('dev', ['watch']);
