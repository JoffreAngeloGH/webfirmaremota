// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Constitución §8 (SEO) y §5.1: el sitio está publicado y siempre es indexable. Nada de esto depende de .env
// (los .env quedan solo para secretos, constitución §10).

// https://astro.build/config
export default defineConfig({
	site: 'https://firmaremota.pe',
	trailingSlash: 'always',
	build: { format: 'directory' },

	// Servidor de desarrollo: además de localhost, acepta los túneles rápidos de Cloudflare
	// (`cloudflared tunnel --url http://localhost:4321`), para cualquiera que clone el repo.
	server: { allowedHosts: ['.trycloudflare.com'] },

	integrations: [
		react(),
		// /sistema-visual/ es interna: nunca entra al sitemap (spec 003).
		sitemap({ filter: (page) => !page.includes('/sistema-visual/') }),
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
