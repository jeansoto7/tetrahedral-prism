var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var prefix        = require('gulp-autoprefixer');
var cp            = require('child_process');
var gulpPug       = require('gulp-pug');
var gulpJade      = require('gulp-jade');
const plumber     = require('gulp-plumber');
const newer       = require('gulp-newer');
const pug         = require('pug');
const jade        = require('jade');
const jfm         = require('jstransformer-jade-jekyll');
var imagemin      = require('gulp-imagemin');
var imageminSvgo  = require('imagemin-svgo');
var imageop       = require('gulp-image-optimization');
var rename        = require('gulp-rename');
var minify        = require('gulp-minify');


var jekyll      = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var checkDeps   = require('gulp-check-deps');
var resolveDependencies = require('gulp-resolve-dependencies');
var concat      = require('gulp-concat');
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Pug Configurations
 */
pug.filters.jfm = jfm.render;


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});


/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});


/**
 * Javascript Minifyer
 */
// gulp.task('compress', function() {
//   gulp.src('lib/*.js')
//     .pipe(minify({
//         ext:{
//             src:'-debug.js',
//             min:'.js'
//         },
//         exclude: ['tasks'],
//         ignoreFiles: ['.combo.js', '-min.js']
//     }))
//     .pipe(gulp.dest('dist'))
// });


/**
 * Automatic Image Compressor
 */
//gulp.task('image', function(){
    //gulp.src('images/*')
        //.pipe(imagemin())
        //.pipe(gulp.dest('assets/img'))
//});


//imagemin(['images/*.svg'], 'build/images', {
//    use: [
//        imageminSvgo({
//            plugins: [
//                {removeViewBox: false}
//            ]
//        })
//    ]
//}).then(() => {
//    console.log('Images optimized');
//});


//gulp.task('images', function(cb) {
//    gulp.src(['images/*.png','images/*.jpg','images/*.gif','images/*.jpeg']).pipe(imageop({
//        optimizationLevel: 5,
//        progressive: true,
//        interlaced: true
//    })).pipe(gulp.dest('assets/img')).on('end', cb).on('error', cb);
//});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});


/**
 * Jade Compiler
 */
gulp.task('jade', () => {
  gulp.src('_jadefiles/**/*.jade')
  .pipe(plumber())
  .pipe(gulpJade({
    pretty: true,
    jade: jade
  }))
  .pipe(gulp.dest('_includes'));
});

/**
 * Pug Compiler
 */
gulp.task('pug', () => {
  gulp.src('_pugfiles/**/*.pug')
  .pipe(plumber())
  .pipe(gulpPug({
    pretty: true,
    pug: pug
  }))
  .pipe(gulp.dest('_includes'));
});

/*
*Jade
*/
// gulp.task('jade', function(){
//     return gulp.src('_jadefiles/**/*.jade')
//     .pipe(jade())
//     .pipe(gulp.dest('_includes'));
// });




/*
*Pug
*/
// gulp.task('pug', function(){
//     return gulp.src('_pugfiles/**/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('_includes'));
// });


// gulp.task('pug', function (){
//     return gulp.src('_pugfiles/**/*.pug')
//     .pipe(plumber())
//     .pipe(pug({
//       pretty: true,
//       pug: pug
//     }))
//     .pipe(gulp.dest('_includes'));
// });



// jade.filters.jfm  = jfm.render;
//
// gulp.task('gulpJade', () => {
//   gulp.src('_jadefiles/**/*.jade')
//   .pipe(plumber())
//   .pipe(gulpJade({
//     pretty: true,
//     jade: jade
//   }))
//   .pipe(gulp.dest('_includes'));
// });



/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
 gulp.task('watch', function () {
     gulp.watch('assets/css/**', ['sass']);
     gulp.watch('assets/js/**', ['jekyll-rebuild']);
     gulp.watch(['/*.html', '_layouts/*.html', '_includes/**/*.html','assets/**/*', '_posts/*', '_config.yml'], ['jekyll-rebuild']);
     gulp.watch(['assets/js/**'], ['jekyll-rebuild']);
     gulp.watch('_jadefiles/**/*.jade', ['jade']);
     gulp.watch('_pugfiles/**/*.pug', ['pug']);
 });



//gulpfile.js

gulp.task('check:deps', function() {
    return gulp.src('package.json').pipe(checkDeps());
});


gulp.task('js', function(){
  gulp.src(['app/assets/js/main.js'])
    .pipe(resolveDependencies({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
        .on('error', function(err) {
            console.log(err.message);
        })
    .pipe(concat())
    .pipe(gulp.dest('dest/assets/js/'));
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
