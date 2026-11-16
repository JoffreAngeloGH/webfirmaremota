/**
 * Helpers de JSON-LD tipados con schema-dts (constitución §8).
 * Todo sale de site.ts y de las collections: lo que se ve y lo que lee Google vienen de la misma fuente.
 */
import type { CollectionEntry } from 'astro:content';
import type { BreadcrumbList, FAQPage, Organization, Product, Service, Thing, WebSite } from 'schema-dts';
import { site } from '@/config/site';
import { productWhatsappUrl } from '@/lib/whatsapp';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** URL absoluta con barra final (trailingSlash: "always"); los archivos (.png, .xml) no la llevan. */
export function absoluteUrl(path: string): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	const withSlash = clean.endsWith('/') || /\.[a-z0-9]+$/i.test(clean) ? clean : `${clean}/`;
	return new URL(withSlash, site.url).href;
}

export function organizationSchema(): Organization {
	return {
		'@type': 'Organization',
		'@id': ORG_ID,
		name: site.name,
		url: absoluteUrl('/'),
		legalName: site.company.legalName,
		taxID: site.company.ruc,
		email: site.email,
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'sales',
			telephone: site.whatsapp.display,
			email: site.email,
			areaServed: 'PE',
			availableLanguage: 'es',
		},
	};
}

export function websiteSchema(): WebSite {
	return {
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		url: absoluteUrl('/'),
		name: site.name,
		inLanguage: site.lang,
		publisher: { '@id': ORG_ID },
	};
}

export function breadcrumbSchema(items: { name: string; path: string }[]): BreadcrumbList {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: absoluteUrl(item.path),
		})),
	};
}

/** Product + Offer generado desde la collection de productos. */
export function productSchema(producto: CollectionEntry<'productos'>['data'], pagePath: string): Product {
	return {
		'@type': 'Product',
		name: producto.nombre,
		brand: { '@id': ORG_ID },
		url: absoluteUrl(pagePath),
		offers: {
			'@type': 'Offer',
			price: producto.precio.toFixed(2),
			priceCurrency: producto.moneda,
			availability: 'https://schema.org/InStock',
			url: productWhatsappUrl(producto),
			seller: { '@id': ORG_ID },
		},
	};
}

/** Product "Firmas digitales" con una Offer por bolsa (spec 007). */
export function firmasSchema(bolsas: CollectionEntry<'productos'>['data'][], pagePath: string): Product {
	return {
		'@type': 'Product',
		name: 'Firmas digitales',
		description: 'Bolsas de firmas para usar con tu certificado digital. No vencen.',
		brand: { '@id': ORG_ID },
		url: absoluteUrl(pagePath),
		offers: bolsas.map((b) => ({
			'@type': 'Offer',
			name: b.nombre,
			price: b.precio.toFixed(2),
			priceCurrency: b.moneda,
			availability: 'https://schema.org/InStock',
			url: productWhatsappUrl(b),
			seller: { '@id': ORG_ID },
		})),
	};
}

/** Service "Firma remota" con una Offer por producto (inicio). */
export function serviceSchema(productos: CollectionEntry<'productos'>['data'][], pagePath: string): Service {
	return {
		'@type': 'Service',
		name: 'Firma remota',
		serviceType: 'Firma digital en la nube',
		description: 'Firma digital sin descargar ni instalar nada: certificado digital en la nube y firmas.',
		provider: { '@id': ORG_ID },
		areaServed: { '@type': 'Country', name: 'Perú' },
		url: absoluteUrl(pagePath),
		offers: productos.map((p) => ({
			'@type': 'Offer',
			name: p.nombre,
			price: p.precio.toFixed(2),
			priceCurrency: p.moneda,
			availability: 'https://schema.org/InStock',
			url: productWhatsappUrl(p),
		})),
	};
}

/** FAQPage: pasar solo las preguntas que se ven en la página. */
export function faqSchema(items: { question: string; answer: string }[]): FAQPage {
	return {
		'@type': 'FAQPage',
		mainEntity: items.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: { '@type': 'Answer', text: item.answer },
		})),
	};
}

/** Envuelve nodos en un @graph con @context. */
export function graph(nodes: Thing[]) {
	return { '@context': 'https://schema.org', '@graph': nodes };
}
