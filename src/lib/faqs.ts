import { getCollection, type CollectionEntry } from 'astro:content';
import { formatPrice } from '@/lib/format';

type Pagina = CollectionEntry<'faqs'>['data']['paginas'][number];

export interface Faq {
	id: string;
	pregunta: string;
	respuesta: string;
}

/** Valores que las respuestas pueden usar como {variable}. Salen de la collection productos. */
async function variables(): Promise<Record<string, string>> {
	const productos = (await getCollection('productos')).map((p) => p.data).sort((a, b) => a.orden - b.orden);
	const certificado = productos.find((p) => p.tipo === 'certificado');
	const firmas = productos.find((p) => p.tipo === 'firmas');
	return {
		precio_certificado: certificado ? formatPrice(certificado.precio, certificado.moneda) : '',
		precio_firmas: firmas ? formatPrice(firmas.precio, firmas.moneda) : '',
		cantidad_firmas: firmas && firmas.tipo === 'firmas' ? String(firmas.cantidad) : '',
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
