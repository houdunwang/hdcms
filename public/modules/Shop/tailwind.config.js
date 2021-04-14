module.exports = {
    important: true,
    purge: ['./storage/framework/views/*.php', './resources/**/*.blade.php', './vue/**/*.js', './vue/**/*.vue', '../../../vue/components/**/*.vue'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                hd: '#f4645f'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
}
