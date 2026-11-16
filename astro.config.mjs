// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { isIndexable } from './scripts/indexable.mjs';

// Constitución §8 (SEO) y §5.1 (indexación solo con INDEXABLE=true).
const indexable = isIndexable();

// https://astro.build/config
export default defineConfig({
	site: 'https://firmaremota.pe',
	trailingSlash: 'always',
	build: { format: 'directory' },

	env: {
		schema: {
			// Se lee en SEO.astro y robots.txt. Activar solo cuando pendientes.md esté vacío.
			INDEXABLE: envField.boolean({ context: 'server', access: 'public', default: false }),
		},
	},

	integrations: [
		react(),
		// El sitemap solo existe cuando el sitio es indexable; mientras tanto robots.txt bloquea todo.
		// /sistema-visual/ es interna: nunca entra al sitemap (spec 003).
		...(indexable ? [sitemap({ filter: (page) => !page.includes('/sistema-visual/') })] : []),
	],

	// Fuentes servidas desde el propio dominio (descargadas en el build), con precarga.
	// Identidad "Tinta digital" (spec 002). Outfit no tiene peso 900.
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Outfit',
			cssVariable: '--ff-outfit',
			weights: [400, 500, 600, 700, 800],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Instrument Serif',
			cssVariable: '--ff-instrument-serif',
			weights: [400],
			styles: ['italic'],
			subsets: ['latin'],
			fallbacks: ['serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--ff-jetbrains-mono',
			weights: [500],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['monospace'],
		},
	],

	vite: {
		plugins: [tailwindcss()],
	},
});
