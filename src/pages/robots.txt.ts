import type { APIRoute } from 'astro';

// Constitución §5.1: el sitio está publicado y se indexa. /sistema-visual/ y la 404 llevan noindex en su <meta>.
export const GET: APIRoute = ({ site }) => {
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
