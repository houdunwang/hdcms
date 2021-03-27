const mix = require('laravel-mix')
require('laravel-mix-merge-manifest')
//设置public目录
mix.setPublicPath('../../public').mergeManifest()

mix.js('vue/app.js', 'public/modules/Article/js')
    .vue()
    .postCss('vue/css/app.css', '../../public/modules/Article/css', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))

mix.copyDirectory('static', '../../public/modules/Article/static')
mix.copyDirectory('template', '../../public/modules/Article/template')

mix.browserSync({
    proxy: 'hdcms.test',
    files: 'vue/**'
})
