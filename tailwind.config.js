/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './app/**/*.{html,js,jsx,ts,tsx,mdx}',
        './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    ],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                // Projenize özel renkler
                primary: {
                    50: '#e4f2fa',
                    100: '#cce5f5',
                    200: '#99cbeb',
                    300: '#66b1e1',
                    400: '#3397d7',
                    500: '#1a4960', // Ana renk
                    600: '#1e7fa8',
                    700: '#195873',
                    800: '#0f2b3c',
                    900: '#0a1e2a',
                },
            },
            fontFamily: {
                sans: ['System'],
            },
        },
    },
    plugins: [],
};