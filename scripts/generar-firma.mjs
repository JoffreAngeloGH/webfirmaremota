/**
 * Genera la firma manuscrita de la marca (spec 004, iteración 2).
 * Trazo central suave (Catmull-Rom) + "tinta" de grosor variable: más gruesa al bajar,
 * fina al subir y en los extremos, como un bolígrafo real.
 * Salida: src/components/brand/firma-trazos.json  →  { tintas: string[], centrales: string[], largos: number[] }
 * Uso: node scripts/generar-firma.mjs
 */
import fs from "node:fs";
const OUT_JSON = "src/components/brand/firma-trazos.json";

// Puntos de control de cada trazo (viewBox 0 0 320 110). Cursiva inclinada ~15°.
const TRAZOS = [
	// Trazo 1: mayúscula con bucle + letras enlazadas + remate final
	[
		// Mayúscula tipo "J" con bucle inferior
		[50, 42], [44, 26], [52, 12], [64, 10], [66, 20], [58, 40], [46, 64], [34, 86], [24, 96], [16, 94],
		[18, 84], [32, 74], [50, 66], [62, 58],
		// letras enlazadas
		[70, 50], [76, 50], [72, 62], [70, 72], [78, 70], [88, 58], [94, 52], [98, 56], [92, 68], [96, 74],
		[106, 66], [114, 56], [120, 54], [118, 64], [114, 72], [122, 72],
		// letra alta con bucle
		[132, 56], [140, 34], [148, 16], [154, 14], [154, 24], [146, 42], [138, 62], [136, 72], [144, 72],
		[156, 60], [164, 52], [170, 56], [164, 68], [168, 74], [180, 64], [190, 54], [196, 58], [192, 70],
		[198, 74], [212, 64], [226, 50], [240, 38],
	],
	// Trazo 2: rúbrica que vuelve por debajo y cruza
	[
		[234, 30], [256, 28], [268, 38], [258, 60], [222, 82], [168, 94], [110, 98], [76, 94], [68, 88],
		[88, 86], [152, 84], [232, 80], [296, 72],
	],
	// Trazo 3: punto
	[[176, 40], [177.5, 39], [178, 41]],
];

function catmullRom(pts, pasos = 9) {
	const out = [];
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
		for (let t = 0; t < 1; t += 1 / pasos) {
			const t2 = t * t, t3 = t2 * t;
			out.push([0, 1].map((k) =>
				0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3),
			));
		}
	}
	out.push(pts[pts.length - 1]);
	return out;
}

// Grosor: más tinta en los trazos descendentes, adelgaza al subir y en los extremos (presión del bolígrafo).
function tinta(c, base, extra) {
	const n = c.length, izq = [], der = [];
	for (let i = 0; i < n; i++) {
		const a = c[Math.max(0, i - 1)], b = c[Math.min(n - 1, i + 1)];
		let dx = b[0] - a[0], dy = b[1] - a[1];
		const len = Math.hypot(dx, dy) || 1; dx /= len; dy /= len;
		const baja = Math.max(0, dy); // y crece hacia abajo
		const t = i / (n - 1);
		const extremos = Math.min(1, t / 0.06, (1 - t) / 0.1);
		const w = (base + extra * baja) * (0.35 + 0.65 * extremos);
		const nx = -dy * w / 2, ny = dx * w / 2;
		izq.push([c[i][0] + nx, c[i][1] + ny]);
		der.push([c[i][0] - nx, c[i][1] - ny]);
	}
	const poly = [...izq, ...der.reverse()];
	return 'M' + poly.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L') + 'Z';
}

const centros = TRAZOS.map((t) => catmullRom(t));
const tintas = centros.map((c, i) => tinta(c, i === 2 ? 3.4 : 1.1, i === 2 ? 0 : 2.6));
const centrales = centros.map((c) => 'M' + c.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join('L'));

const largos = centros.map((c) => c.reduce((acc, p, i) => (i ? acc + Math.hypot(p[0] - c[i - 1][0], p[1] - c[i - 1][1]) : 0), 0));
fs.writeFileSync(OUT_JSON, JSON.stringify({ tintas, centrales, largos: largos.map((l) => Math.round(l)) }));
console.log("firma-trazos.json:", tintas.map((d) => d.length).join(", "), "caracteres · largos", largos.map(Math.round).join(", "));
