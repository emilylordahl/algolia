var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var less = require('gulp-less-sourcemap');
var ghPages = require('gulp-gh-pages');

// GH Pages
gulp.task('deploy', function() {
<<<<<<< HEAD
  return gulp.src('./public/**/*')
    .pipe(ghPages({
      branch: "gh-pages"
    }));
=======
    return gulp.src('./public/**/*')
        .pipe(ghPages({
            branch: "master"
        }));
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
});

// Static Server
gulp.task('serve', function() {
<<<<<<< HEAD
  browserSync.init({
    server: "."
  });
=======
    browserSync.init({
        server: "."
    });
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
});

// Watching scss/less/html files
gulp.task('watch', ['serve', 'sass', 'less'], function() {
<<<<<<< HEAD
  gulp.watch("public/scss/*.scss", ['sass']);
  gulp.watch("public/less/*.less", ['less']);
  gulp.watch("*.html").on('change', browserSync.reload);
=======
    gulp.watch("public/scss/*.scss", ['sass']);
    gulp.watch("public/less/*.less", ['less']);
    gulp.watch("*.html").on('change', browserSync.reload);
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
});

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
<<<<<<< HEAD
  return gulp.src("public/scss/*.scss")
    .pipe(sass({
      sourceComments: 'map',
      sourceMap: 'scss'
    }))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
=======
    return gulp.src("public/scss/*.scss")
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'scss'
        }))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
});

// Compile LESS into CSS & auto-inject into browsers
gulp.task('less', function() {
<<<<<<< HEAD
  return gulp.src("public/less/*.less")
    .pipe(less({
      sourceMap: {
        sourceMapRootpath: './public/less' // Optional absolute or relative path to your LESS files
      }
    }))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
=======
    return gulp.src("public/less/*.less")
        .pipe(less({
            sourceMap: {
                sourceMapRootpath: './public/less' // Optional absolute or relative path to your LESS files
            }
        }))
        .pipe(gulp.dest("public/css"))
        .pipe(browserSync.stream());
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
});


gulp.task('default', ['serve']);
gulp.task('server', ['serve']);
<<<<<<< HEAD
gulp.task('dev', ['watch']);
=======
gulp.task('dev', ['watch']);
>>>>>>> parent of cde0e25... Update 2016-12-06T05:50:29.868Z
