import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
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
	schema: z.discriminatedUnion('tipo', [
		z.object({
			...base,
			tipo: z.literal('certificado'),
			titular: z.enum(['natural', 'juridica']),
			vigenciaAnios: z.union([z.literal(1), z.literal(2), z.literal(3)]),
		}),
		z.object({
			...base,
			tipo: z.literal('firmas'),
			cantidad: z.number().int().min(10),
			vence: z.boolean(),
		}),
	]),
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
		paginas: z.array(z.enum(['inicio', 'certificado-digital', 'firmas', 'preguntas-frecuentes'])).min(1),
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
		/** Cada requisito con su ícono lineal (spec 006). */
		items: z.array(z.object({ texto: z.string(), icono: z.enum(NOMBRES_ICONO) })).min(1),
		orden: z.number().int(),
	}),
});

export const collections = { productos, faqs, requisitos };
