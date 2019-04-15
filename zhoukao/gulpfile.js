var gulp = require("gulp");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var html = require("gulp-htmlmin");
var rename = require("gulp-rename");
var img = require("gulp-imagemin");
var webserver = require("gulp-webserver");
var url = require("url");
var fs = require("fs");
var path = require("path");

//js合并 压缩
gulp.task("js", function() {
    return gulp.src('./src/js*.js')
        .pipe(concat("all.js")) //合并
        .pipe(uglify()) //压缩
        .pipe(rename({ //更改名字添加后缀名
            suffix: ".min"
        }))
        .pipe(gulp.dest("./dist/js/"))
})

//压缩sass
gulp.task("sass", function() {
        return gulp.src("./src/sass*.scss")
            .pipe(sass())
            .pipe(gulp.dest("./src/sass"))
    })
    //压缩图片
gulp.task("img", function() {
        return gulp.src("./src/images/*.{png,jpg,jpej}")
            .pipe(img())
            .pipe(gulp.dest("./src/images/imgin/"))
    })
    //创建服务器
gulp.task("webserver", function() {
    return gulp.src('./src/')
        .pipe(webserver({
            port: 8080,
            host: "169.254.19.111",
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.path(req.url).path.name;
                console.log(pathname);
            }
        }))
})

//监听sass文件 编译scss
gulp.task("watch", function() {
    gulp.watch("./src/sass*.scss", gulp.series("sass"))
})

//注册开发任务
gulp.task("dev", gulp.series("sass", "webserver", "watch"));
//注册上线任务
gulp.task("build", gulp.porallel("img", "js"));