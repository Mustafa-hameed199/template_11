const {src, dest, watch, task} = require("gulp");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const prefix = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
const map = require("gulp-sourcemaps");
const connect = require("gulp-connect");

// min & move imgs to dist
function imgTask() {
    return src(["./src/img/*","./src/img/*/*"])
            .pipe(dest("./dist/assets/img"))
}
exports.imgTask = imgTask

//move html
function moveHtml() {
    return src("src/*.html")
            .pipe(dest("dist/assets"))
            .pipe(connect.reload())
}

// compile scss to css & prefix & min & source map
function scss() {
    return src(["./src/scss/style.scss"])
            .pipe(map.init())
            .pipe(sass())
            .pipe(prefix())
            .pipe(map.write("."))
            .pipe(dest("./dist/assets/css"))
            .pipe(connect.reload())
}
exports.scss = scss;

// move js to one file 
function js() {
    return src("src/js/scripts/*.js")
            .pipe(map.init())
            .pipe(concat("main.js"))
            .pipe(map.write("."))
            .pipe(dest("dist/assets/js"))
            .pipe(connect.reload())
}
exports.js = js

// move icon file
function fontAwesome() {
    return src("src/icon/*.css")
            .pipe(dest("dist/assets/css"))
}
function webFont() {
    return src(["src/icon/**","!src/icon/*.css"])
            .pipe(dest("dist/assets"))
}

// localhost server 
function localhost() {
    connect.server({
        root: "dist/assets",
        livereload: true,
    })
}

// watch changes
function watcher() {
    localhost()
    imgTask()
    fontAwesome()
    webFont()
    watch("./src/scss/**/*.*", scss)
    watch("src/*.html", moveHtml)
    watch("src/js/scripts/*.js", js)
}
exports.watch = watcher
exports.default = watcher
