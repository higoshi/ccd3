const {src, dest, parallel} = require('gulp');
const babel = require('gulp-babel');
const cleanCss = require('gulp-clean-css');

const buildJs = () => src('src/**/*.js')
  .pipe(babel())
  .pipe(dest('dist'));

const buildCss = () => src('src/**/*.css')
  .pipe(cleanCss())
  .pipe(dest('dist'));

module.exports = {
  buildJs,
  buildCss,
  default: parallel(buildJs, buildCss),
};
