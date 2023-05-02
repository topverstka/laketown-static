// Определяем переменную "preprocessor"
let preprocessor = 'scss'; // Выбор препроцессора в проекте - sass или less

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');

const cssbeautify = require('gulp-cssbeautify');

// Подключаем Browsersync
const browserSync = require('browser-sync').create();


function browsersync() {
  browserSync.init({ // Инициализация Browsersync
    server: { baseDir: 'app/' }, // Указываем папку сервера
    notify: false, // Отключаем уведомления
    online: true // Режим работы: true или false
  })
}

function styles() {
  return src('app/' + preprocessor + '/app.' + preprocessor + '') // Выбираем источник: "app/sass/main.sass" или
  // "app/less/main.less"
    .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
    .pipe(concat('app.css')) // Конкатенируем в файл app.min.js
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
    .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
    .pipe(cssbeautify())
    .pipe(dest('app/css/')) // Выгрузим результат в папку "app/css/"
    .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

exports.browsersync = browsersync;

function scripts() {
  return src([ // Берем файлы из источников
    'node_modules/jquery/dist/jquery.min.js', // Пример подключения библиотеки
    'app/js/app.js', // Пользовательские скрипты, использующие библиотеку, должны быть подключены в конце
  ])
    .pipe(concat('app.min.js')) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
}

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем gulp-uglify-es
const uglify = require('gulp-uglify-es').default;

const scss = require('gulp-sass')(require('sass'));

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');

// Подключаем модуль gulp-clean (вместо del)
const clean = require('gulp-clean');


// Экспортируем функцию scripts() в таск scripts
exports.scripts = scripts;

// Экспортируем функцию styles() в таск styles
exports.styles = styles;

// Экспорт функции images() в таск images
exports.images = images;

// Экспортируем функцию cleanimg() как таск cleanimg
exports.cleanimg = cleanimg;

function cleanimg() {
  return src('app/img/dest/', {allowEmpty: true}).pipe(clean()) // Удаляем папку "app/images/dest/"
}

async function images() {
  imagecomp(
    "app/img/**/*", // Берём все изображения из папки источника
    "dist/img/", // Выгружаем оптимизированные изображения в папку назначения
    { compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
    { jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
    { png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
    function (err, completed) { // Обновляем страницу по завершению
      if (completed === true) {
        browserSync.reload()
      }
    }
  )
}

const fileinclude = require('gulp-file-include');

function joinHtml() {
  return  src([
    'app/html/*.html',

  ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('app/'))
    .pipe(browserSync.stream())
}

exports.joinHtml = joinHtml;






function buildcopy() {
  return src([ // Выбираем нужные файлы
    'app/css/**/*.min.css',
    'app/js/**/*.min.js',
    'app/img/**/*',
    'app/**/*.html',
  ], { base: 'app' }) // Параметр "base" сохраняет структуру проекта при копировании
    .pipe(dest('dist')) // Выгружаем в папку с финальной сборкой
}

// Создаем новый таск "build", который последовательно выполняет нужные операции
exports.build = series(cleandist, styles, scripts, images, joinHtml, buildcopy);

function cleandist() {
  return src('dist', {allowEmpty: true}).pipe(clean()) // Удаляем папку "dist/"
}

function startwatch() {

  // Выбираем все файлы JS в проекте, а затем исключим с суффиксом .min.js
  watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
  // Мониторим файлы препроцессора на изменения
  watch('app/**/' + preprocessor + '/**/*', styles);
  // Мониторим файлы HTML на изменения
  // watch('app/html/**/*.html').on('change', joinHtml);
  // watch('app/parts/**/*.html').on('change', joinHtml);
  watch('app/html/*.html').on('change', browserSync.reload);
  // Мониторим папку-источник изображений и выполняем images(), если есть изменения
  watch('app/img/**/*', images);

}




// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(styles, scripts, joinHtml, browsersync, startwatch);
