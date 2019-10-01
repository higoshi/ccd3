const {src, dest, parallel, series} = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

const buildJs = () => src('./src/**/*.js')
  .pipe(babel())
  .pipe(dest('./dist/'));

const minifyJs = () => src(['./dist/**/*.js', '!./dist/**/*.min.js'])
  .pipe(terser({
    mangle: false,
  }))
  .pipe(rename({extname: '.min.js'}))
  .pipe(dest('./dist/'));

const buildCss = () => src('./src/**/*.css')
  .pipe(dest('./dist/'));

const minifyCss = () => src(['./dist/**/*.css', '!./dist/**/*.min.css'])
  .pipe(rename({extname: '.min.css'}))
  .pipe(cleanCss())
  .pipe(dest('./dist/'));

module.exports = {
  buildJs,
  buildCss,
  build: parallel(buildJs, buildCss),
  minifyJs,
  minifyCss,
  minify: parallel(minifyCss, minifyJs),
  default: series(parallel(buildJs, buildCss), parallel(minifyCss, minifyJs)),
};
