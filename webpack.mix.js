const mix = require('laravel-mix')

mix.js('vue/app.js', 'public/system/dist')
    .vue()
    .postCss('vue/css/app.css', 'public/system/dist', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))

mix.browserSync({
    proxy: 'hdcms.test',
    files: 'vue/**'
})
