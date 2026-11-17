#!/usr/bin/env node
/**
 * Lista los placeholders del código (comentarios "PENDIENTE: Pxx") — constitución §5.1.
 *
 *   pnpm pendientes          → lista los pendientes agrupados por ID
 *   node scripts/pendientes.mjs --check
 *                            → igual, pero si queda alguno, sale con error.
 *                              Lo usa `pnpm build`: el sitio está publicado y no se indexan datos de prueba.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const EXTENSIONS = /\.(astro|ts|tsx|js|mjs|md|mdx|ya?ml|json|css)$/;
// Solo comentarios: "// PENDIENTE: P01", "# PENDIENTE: P01", "{/* PENDIENTE: P01 */}"
const MARK = /(?:\/\/|#|\/\*|<!--)\s*PENDIENTE:\s*(P\d{2,})/g;
const SKIP_DIRS = new Set(['girasol']); // tokens generados

function walk(dir) {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : walk(full);
		return EXTENSIONS.test(entry.name) ? [full] : [];
	});
}

const found = new Map(); // id → [{ file, line }]
for (const file of existsSync(SRC) ? walk(SRC) : []) {
	readFileSync(file, 'utf8')
		.split(/\r?\n/)
		.forEach((text, i) => {
			for (const match of text.matchAll(MARK)) {
				const list = found.get(match[1]) ?? [];
				list.push({ file: relative(ROOT, file).replaceAll('\\', '/'), line: i + 1 });
				found.set(match[1], list);
			}
		});
}

const ids = [...found.keys()].sort();
if (ids.length === 0) {
	console.log('✓ No quedan placeholders en el código.');
} else {
	console.log(`Placeholders en el código: ${ids.length} IDs (detalle en specs/pendientes.md)\n`);
	for (const id of ids) {
		console.log(`  ${id}`);
		for (const { file, line } of found.get(id)) console.log(`      ${file}:${line}`);
	}
}

if (process.argv.includes('--check')) {
	if (ids.length > 0) {
		console.error(
			`\n✗ Quedan ${ids.length} placeholders (${ids.join(', ')}) y el sitio está publicado.` +
				'\n  Confírmalos en specs/pendientes.md antes de compilar.',
		);
		process.exit(1);
	}
}
