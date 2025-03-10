module.exports = {
    content: [
        "./src/index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                'notebook': "url('../img/banner-executivo-notebook.jpg')"
            }
        },
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif']
        }
    },
    plugins: [],
};