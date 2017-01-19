const
    gulp = require("gulp"),
    config = require("./config"),
    connect = require("gulp-connect"),
    stylus = require("gulp-stylus"),
    nib = require("nib"),
    watchify = require("watchify"),
    babelify = require("babelify"),
    reactify = require("reactify"),
    underscore = require("underscore"),
    gulpUtil = require("gulp-util"),
    gulpIf = require("gulp-if"),
    gulpStreamify = require("gulp-streamify"),
    gulpUglify = require("gulp-uglify"),
    source = require("vinyl-source-stream"),
    browserify = require("browserify");

gulp.task("dev:server", () => {
    connect.server({
    port: config.dev_port,
    root: "public",
    livereload: true
  })
})

gulp.task("reload", () => {
    return gulp.src('./public/index.html')
        .pipe(connect.reload())
})

gulp.task("watch:html", () => {
    return gulp.watch("public/*.html", ["reload"]);
})

gulp.task("build:styles", () => {
    return gulp.src("public/*.styl")
        .pipe(stylus({
            compress: false,
            "include css": true,
            use: nib()
        }))
        .pipe(gulp.dest("public/"))
        .pipe(connect.reload());
})

gulp.task("watch:styles", () => {
    gulp.watch("public/**/*.styl", ["build:styles", "reload"]);
})

var createBundler = (entries) => {
   bundler = browserify(Object.assign({}, watchify.args, {
       debug: config.debug
   }))
   bundler.add(entries)
   bundler.transform(babelify, {presets: ["es2015", "react", "stage-2"]})
   bundler.transform(reactify)
   return bundler
}

var bundle = (bundler, output) => {
  process.env.NODE_ENV = config.env;
  return bundler.bundle()
       .on("error", () => {
           return gulpUtil.log(arguments)
       })
       .pipe(gulpIf(false, gulpStreamify(gulpUglify()))) // Check this if it minimize js with true
       .pipe(source(output.file))
       //.pipe(gulpStreamify(gulpUglify()))
       .pipe(gulp.dest(output.directory))
}

var buildAndWatch = (bundler, output, done, onUpdate, onBuild) => {
   onceDone = underscore.once(done)
   watchifiedBundler = watchify(bundler)
   bundle(watchifiedBundler, output)
   watchifiedBundler
       .on("update", () => {
           if (onUpdate)
               onUpdate()
           bundle(watchifiedBundler, output)
       })
       .on("time", (time) => {
           if (onBuild)
               onBuild()
           onceDone()
           gulpUtil.log(output.file + " built in " + (time / 1000) + " seconds")
       })
}

indexJsBundler = createBundler("./public/index.js")
indexJsBuilt = {
   directory: "./public", 
   file: "index.min.js"
}

gulp.task("build:scripts", () => {
   bundle(indexJsBundler, indexJsBuilt)
})

gulp.task("build-and-watch:scripts", (done) => {
    buildAndWatch(
        indexJsBundler,
        indexJsBuilt,
        done,
        () => {
            gulp.src('./public/index.html')
                .pipe(connect.reload())
        }
    )
})

gulp.task("default", ["watch:html", "watch:styles", "build:styles", "build-and-watch:scripts", "dev:server"]);
gulp.task("build", ["build:styles", "build:scripts"]);