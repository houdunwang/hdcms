const mix = require('laravel-mix')

require('laravel-mix-merge-manifest')

mix.setPublicPath('../../public').mergeManifest()

mix.js('Resources/js/app.js', '../../public/modules/Edu/js')
    .vue()
    .postCss('Resources/css/app.css', '../../public/modules/Edu/css', [require('postcss-import'), require('tailwindcss'), require('autoprefixer')])
    .webpackConfig(require('./webpack.config'))

mix.copyDirectory('Resources/static', '../../public/modules/Edu/static')

if (mix.inProduction()) {
    mix.version()
}
