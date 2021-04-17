const mix = require('laravel-mix')
require('laravel-mix-merge-manifest')
//设置public目录
mix.setPublicPath('./').mergeManifest()

mix.js('vue/app.js', './dist')
    .vue()
    .postCss('vue/css/app.css', './dist', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))
    .extract(['vue', 'vuex', 'lodash', 'vue-router', 'element-ui', '@toast-ui/editor', 'codemirror', 'highlight.js', 'dayjs'])

mix.browserSync({
    proxy: 'e19.test',
    files: 'vue/**'
})
