/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
    content: ["resources/js/frontend/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                black: colors.black,
                white: colors.white,
                gray: colors.slate,
                green: colors.emerald,
                purple: colors.violet,
                yellow: colors.amber,
                pink: colors.fuchsia,
                charcoal: "#3A4454",
                "electric-blue": "#53687E",
                "red-salsa": "#F05D5E",
                "red-salsa-500": "#EC3232",
                alice: "#E7ECEF",
            },
            fontFamily: {
                poppins: ["Poppins", "ui-sans-serif", "system-ui"],
            },
        },
    },

    plugins: [],
};
