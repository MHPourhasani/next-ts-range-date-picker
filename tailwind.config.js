/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				iranyekan: ['iranyekan'],
			},
			fontSize: {
				11: '11px',
				14: '14px',
				15: '15px',
				16: '16px',
			},
			colors: {
				primary: '#3880FF',
				secondary300: '#D9DBE9',
				secondary400: '#A0A3BD',
				secondary600: '#4E4B66',
				secondary800: '#14142A',
			},
			borderWidth: { 1: '1px', 1.5: '1.5px' },
			boxShadow: {
				calendar: '-4px 4px 16px rgba(0, 0, 0, 0.08)',
			},
		},
	},
	plugins: [],
};
