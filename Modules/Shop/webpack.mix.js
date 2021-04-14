const mix = require('laravel-mix')
require('laravel-mix-merge-manifest')
//设置public目录
mix.setPublicPath('../../public').mergeManifest()

mix.js('vue/app.js', 'public/modules/Shop/dist')
    .vue()
    .postCss('vue/css/app.css', '../../public/modules/Shop/dist', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))

mix.browserSync({
    proxy: 'hdcms.test',
    files: 'vue/**'
})
