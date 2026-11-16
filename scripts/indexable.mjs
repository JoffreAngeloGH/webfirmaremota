/**
 * ¿El build es indexable? (constitución §5.1)
 * Lee INDEXABLE de las variables de entorno y de los archivos .env, con la misma
 * prioridad que Astro/Vite en un build de producción.
 * Lo usan astro.config.mjs (sitemap) y scripts/pendientes.mjs.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const FILES = ['.env', '.env.local', '.env.production', '.env.production.local'];

function readDotenv(root) {
	const vars = {};
	for (const name of FILES) {
		const file = join(root, name);
		if (!existsSync(file)) continue;
		for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
			const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
			if (m) vars[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
		}
	}
	return vars;
}

export function isIndexable(root = process.cwd()) {
	const value = process.env.INDEXABLE ?? readDotenv(root).INDEXABLE;
	return value === 'true';
}
