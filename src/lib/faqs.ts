import { getCollection, type CollectionEntry } from 'astro:content';
import { formatCantidad, formatPrice } from '@/lib/format';

type Pagina = CollectionEntry<'faqs'>['data']['paginas'][number];

export interface Faq {
	id: string;
	pregunta: string;
	respuesta: string;
}

/** Valores que las respuestas pueden usar como {variable}. Salen de la collection productos. */
async function variables(): Promise<Record<string, string>> {
	const productos = (await getCollection('productos')).map((p) => p.data).sort((a, b) => a.orden - b.orden);
	const certificados = productos.filter((p) => p.tipo === 'certificado');
	const bolsas = productos.flatMap((p) => (p.tipo === 'firmas' ? [p] : []));
	const cert = (anios: number) => {
		const c = certificados.find((p) => p.vigenciaAnios === anios);
		return c ? formatPrice(c.precio, c.moneda) : '';
	};
	const minima = bolsas.reduce((a, b) => (b.cantidad < a.cantidad ? b : a), bolsas[0]!);
	const masBarata = bolsas.reduce((a, b) => (b.precioUnitario < a.precioUnitario ? b : a), bolsas[0]!);
	return {
		precio_cert_1: cert(1),
		precio_cert_2: cert(2),
		cantidad_bolsa_min: formatCantidad(minima.cantidad),
		precio_bolsa_min: formatPrice(minima.precio, minima.moneda),
		precio_firma_min: formatPrice(masBarata.precioUnitario, masBarata.moneda),
	};
}

/** Preguntas de una página, en orden y con las variables rellenadas. */
export async function getFaqs(pagina: Pagina): Promise<Faq[]> {
	const vars = await variables();
	const entries = await getCollection('faqs', (e) => e.data.paginas.includes(pagina));
	return entries
		.sort((a, b) => a.data.orden - b.data.orden)
		.map((e) => ({
			id: e.id,
			pregunta: e.data.pregunta,
			respuesta: e.data.respuesta.replace(/\{(\w+)\}/g, (match, key: string) => {
				if (!(key in vars)) throw new Error(`FAQ "${e.id}": variable desconocida ${match}`);
				return vars[key]!;
			}),
		}));
}
