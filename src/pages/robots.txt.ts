import type { APIRoute } from 'astro';
import { INDEXABLE } from 'astro:env/server';

// Constitución §5.1: mientras haya placeholders, el sitio no se indexa.
export const GET: APIRoute = ({ site }) => {
	const body = INDEXABLE
		? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
		: 'User-agent: *\nDisallow: /\n';
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
