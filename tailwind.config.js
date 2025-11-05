// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",  // ← ESCANEA TODOS tus archivos
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                sud: {
                    blue: '#1e40af',
                    gold: '#ca8a04',
                    light: '#fef3c7',
                }
            }
        },
    },
    plugins: [],
}