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