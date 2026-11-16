import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { NOMBRES_ICONO } from './lib/iconos';

/**
 * Productos: planes de certificado y bolsas de firmas (specs/site.md §1).
 * Un dato faltante o mal escrito rompe el build (constitución §5).
 */
const base = {
	nombre: z.string(),
	precio: z.number().positive(),
	moneda: z.enum(['USD', 'PEN']),
	incluyeIgv: z.boolean(),
	orden: z.number().int(),
	destacado: z.boolean().default(false),
};

const productos = defineCollection({
	loader: file('src/content/productos.yaml'),
	schema: z
		.discriminatedUnion('tipo', [
		z.object({
			...base,
			tipo: z.literal('certificado'),
			titular: z.enum(['natural', 'juridica']),
			vigenciaAnios: z.union([z.literal(1), z.literal(2)]),
		}),
		z.object({
			...base,
			tipo: z.literal('firmas'),
			cantidad: z.number().int().min(10),
			vence: z.boolean(),
			/** Precio de cada firma; `precio` es el total de la bolsa. */
			precioUnitario: z.number().positive(),
		}),
	])
	// El total de una bolsa debe ser cantidad × precioUnitario; se compara en centavos (coma flotante).
	.superRefine((p, ctx) => {
		if (p.tipo !== 'firmas') return;
		const esperado = Math.round(p.cantidad * p.precioUnitario * 100);
		if (Math.round(p.precio * 100) !== esperado) {
			ctx.addIssue({
				code: 'custom',
				message: `Bolsa de ${p.cantidad} firmas: precio ${p.precio} no es cantidad × precioUnitario (${p.cantidad} × ${p.precioUnitario} = ${esperado / 100}).`,
				path: ['precio'],
			});
		}
	}),
});

/**
 * Preguntas frecuentes (spec 003). `paginas` decide dónde se muestra cada una;
 * el FAQPage de cada página se genera solo con las visibles.
 */
const faqs = defineCollection({
	loader: file('src/content/faqs.yaml'),
	schema: z.object({
		pregunta: z.string().endsWith('?'),
		respuesta: z.string().min(20),
		paginas: z
			.array(z.enum(['inicio', 'certificado-digital', 'persona-natural', 'persona-juridica', 'firmas', 'preguntas-frecuentes']))
			.min(1),
		orden: z.number().int(),
	}),
});

/** Requisitos de compra por titular (spec 005). Placeholders P07 y P08. */
const requisitos = defineCollection({
	loader: file('src/content/requisitos.yaml'),
	schema: z.object({
		titular: z.enum(['natural', 'juridica']),
		/** Ícono grande de la columna. */
		icono: z.enum(NOMBRES_ICONO),
		/** Frase que antecede a la lista. */
		intro: z.string(),
		/** Cada requisito con su ícono lineal; `detalle` y `condicion` son opcionales. */
		items: z
			.array(
				z.object({
					texto: z.string(),
					detalle: z.string().optional(),
					icono: z.enum(NOMBRES_ICONO),
					condicion: z.string().optional(),
				}),
			)
			.min(1),
		orden: z.number().int(),
	}),
});

/**
 * Textos legales en Markdown (spec 007): términos y condiciones y política de privacidad. Se copian tal cual
 * de su fuente; `fuente`, `version` y `pdf` son opcionales. `descripcion` es la meta description de la página.
 */
const legales = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/legales' }),
	schema: z.object({
		titulo: z.string(),
		/** Título para el <title>, si difiere del h1. */
		tituloSeo: z.string().optional(),
		descripcion: z.string(),
		actualizado: z.coerce.date(),
		fuente: z.url().optional(),
		version: z.string().optional(),
		/** Ruta pública del PDF oficial. */
		pdf: z.string().startsWith('/').optional(),
	}),
});

/**
 * Páginas por titular (spec 008): /certificado-digital/persona-natural/ y /persona-juridica/. Los textos vienen de
 * las páginas de producto de girasol.pe, adaptados. Las preguntas viven en faqs.yaml (`paginas`).
 */
const titulares = defineCollection({
	loader: file('src/content/titulares.yaml'),
	schema: z.object({
		slug: z.string(),
		titular: z.enum(['natural', 'juridica']),
		nombre: z.string(),
		h1: z.string(),
		descripcion: z.string(),
		/** `description` admite {desde}: el precio mínimo del titular. */
		seo: z.object({ title: z.string(), description: z.string() }),
		paraQueSirve: z.object({ titulo: z.string(), acento: z.string(), texto: z.string(), usos: z.array(z.string()).min(1) }),
		normativa: z
			.array(z.object({ titulo: z.string(), texto: z.string(), icono: z.enum(NOMBRES_ICONO) }))
			.min(1),
		antesDeComprar: z.object({
			devolucion: z.object({
				titulo: z.string(),
				plazo: z.string(),
				puntos: z.array(z.object({ antes: z.string(), destacado: z.string(), despues: z.string() })).min(1),
				contacto: z.string(),
				correos: z.array(z.string()).min(1),
				enlace: z.string(),
			}),
			entrega: z.object({ titulo: z.string(), destacado: z.string(), texto: z.string() }),
		}),
		orden: z.number().int(),
	}),
});

export const collections = { productos, faqs, requisitos, legales, titulares };
