/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./app/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				background: '#121212',
				primary: '#1DB954',
				card: '#181818',
				muted: '#B3B3B3',
			},
		},
	},
	plugins: [],
}

