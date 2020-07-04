
const { src, dest, series, parallel, watch } = require('gulp'); //загружаем, подключаем gulp
const sass = require('gulp-sass'); //компилятор в css
const uglify = require('gulp-uglify'); //подкл. пакет минифицирования .js файлов
const concat = require('gulp-concat'); //склеивает файлы, в один
const cleanCSS = require('gulp-clean-css'); //минификация
const del = require('del'); //удаление папки перед сборкой
const imagemin = require('gulp-imagemin'); //оптимизация изображений
const browserSync = require('browser-sync').create();
const reload = browserSync.reload; //перезегрузка сервера
const sourcemaps = require('gulp-sourcemaps'); //позволяет дебажить минифицированный код в браузере

const path = {
	source: {
		html: "app/index.html",
		styles: [
			"app/styles/main.scss",
		],
		js: [
			"app/js/jquery-3.5.1.min.js",
			"app/js/script.js"
		],
		image: "app/img/**/*",
		fonts: "app/fonts/**/*"
	},
	build: {
		html: "build/",
		css: "build/css/",
		js: "build/js/",
		image: "build/img/",
		fonts: "build/fonts/"
	}
};


function html() {
	return src(path.source.html)
		.pipe(dest(path.build.html))
		.pipe(reload({ stream: true })); //перезагрузки сервера
}

function script() {
	return src(path.source.js)
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(dest(path.build.js))
		.pipe(reload({ stream: true }));
}
function scriptProd() {
	return src(path.source.js)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(dest(path.build.js))
		.pipe(reload({stream: true}));
}

function css() {
	return src(path.source.styles)
		.pipe(sourcemaps.init())// активация sourcemaps
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write())// активация sourcemaps
		.pipe(dest(path.build.css))
		.pipe(reload({ stream: true }));
}
function cssProd() {
	return src(path.source.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(cleanCSS())
		.pipe(dest(path.build.css))
		.pipe(reload({stream: true}));
}

function images() {
	return src(path.source.image)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		], {
			verbose: true
		}))
		.pipe(dest(path.build.image));
};

function fonts() {
	return src(path.source.fonts)
		.pipe(dest(path.build.fonts));
}

function docs() {
	return src('./build/**/*')
		.pipe(dest('./docs'));
}// созданиe папки для gh-pages

function cleanFolder() {
	return del(['build', 'docs']);
};

function browser_Sync() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});
};

function watcher() {
	watch('app/index.html', series(html, docs));
	watch('app/styles/**/*.scss', series(css, docs));
	watch('app/js/*.js', series(script, docs));
};

const build = series(cleanFolder, parallel(html, css, script, images, fonts), docs);
const server = series(build, parallel(watcher, browser_Sync));
const prod = series(cleanFolder, parallel(html, cssProd, scriptProd, images, fonts), docs);

exports.html = html;
exports.css = css;
exports.script = script;
exports.img = images;
exports.clean = cleanFolder;
exports.docs = docs;
exports.build = build;
exports.server = server;
exports.prod = prod;
exports.default = server;