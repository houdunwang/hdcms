const mix = require('laravel-mix')

mix.js('vue/app.js', 'public/js')
    .vue()
    .postCss('vue/css/app.css', 'public/css', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))

mix.browserSync({
    proxy: 'e19.test',
    files: 'vue/**'
})
