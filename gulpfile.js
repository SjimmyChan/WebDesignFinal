var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import');


gulp.task('default', function(){
  console.log('Hello !');
});

gulp.task('html', function(){
  console.log('HTML task..888.');
});

gulp.task('styles', function(){
  return gulp.src('./css/style.css')
  .pipe(postcss([cssvars, nested, autoprefixer]))
  .pipe(gulp.dest('./css/temp'));
});

gulp.task('watch', function(){
  watch('index.html', function(){
    gulp.start('html');
  });

  watch('css/*.css', function(){
    gulp.start('styles');
  });
});
