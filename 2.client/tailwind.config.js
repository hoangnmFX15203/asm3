/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],

    theme: {
        extend: {
            theme: {
                fontFamily: {
                    main: ['Poppins', 'sans-serif'],
                },
                listStyleType: {
                    decimal: 'decimal',
                    square: 'square',
                    roman: 'upper-roman',
                },
                                  
            },
            width: {
                main: '1220px',
            },
            gridRow: {
                'span-7': 'span 7 / span 7',
            },
            gridTemplateRows: {
                // Simple 8 row grid
                '10': 'repeat(10, minmax(0, 1fr))',
        
                // Complex site-specific row configuration
                'layout': '200px minmax(900px, 1fr) 100px',
          },
            backgroundColor: {
                main: '#ee3131',
            },
            colors: {
                main: '#ee3131',
            },
            flex: {
                1: '1 1 0%',
                2: '2 2 0%',
                3: '3 3 0%',
                4: '4 4 0%',
                5: '5 5 0%',
                6: '6 6 0%',
                7: '7 7 0%',
                8: '8 8 0%',
            },
            keyframes: {
                'slide-top': {
                    '0%': {
                        '-webkit-transform': 'translateY(40);',
                        transform: 'translateY(20);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateY(0px);',
                        transform: 'translateY(0px);',
                    },
                },
            },
            animation: {
                'slide-top':
                    'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
    ],
};
