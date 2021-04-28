const mix = require('laravel-mix')

mix.js('vue/app.js', 'public/dist')
    .vue()
    .postCss('vue/css/app.css', 'public/dist', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))
    .extract(['vue', 'vuex', 'lodash', 'vue-router', 'element-ui', '@toast-ui/editor', 'codemirror', 'highlight.js', 'dayjs'])

mix.browserSync({
    proxy: 'hdcms.test',
    files: 'vue/**'
})
