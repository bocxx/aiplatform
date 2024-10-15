import fs from 'fs';

// Read the noise image and convert it to a base64 data URI
const noiseBitmap = fs.readFileSync('./src/assets/noise.png', { encoding: 'base64' });
const noiseDataUri = 'data:image/png;base64,' + noiseBitmap;

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
			  "2xl": "1400px",
			},
		},
		extend: {
			boxShadow: {
				'light': '-5px 3px 8px 1px rgba(0, 0, 0, 0.12)',
				'dark': '-5px 3px 8px 1px rgba(255, 255, 255, 0.2)',
			},
			backgroundImage: {
				'grid-pattern-light': `
					linear-gradient(to bottom, 
						theme('colors.gray.100 / 0%'), 
						theme('colors.gray.100 / 100%')
					), 
					url('${noiseDataUri}')
				`,
				'grid-pattern-dark': `
					linear-gradient(to bottom, 
						theme('colors.neutral.950 / 90%'), 
						theme('colors.neutral.950 / 100%')
					), 
					url('${noiseDataUri}')
				`,
			},
		},
	},
	variants: {
		extend: {
			backgroundImage: ['dark'],
		},
	},
	plugins: [],
}
