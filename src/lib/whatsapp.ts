import type { CollectionEntry } from 'astro:content';
import { site } from '@/config/site';
import { formatCantidad, formatPrice, titularLabel, vigenciaLabel } from '@/lib/format';

/** Enlace wa.me con mensaje prellenado. */
export function whatsappUrl(message: string = site.whatsappMessages.general): string {
	return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

function fill(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? `{${key}}`));
}

/** Mensaje de compra según el producto, para que ventas sepa qué quiere el cliente. */
export function productMessage(producto: CollectionEntry<'productos'>['data']): string {
	if (producto.tipo === 'certificado') {
		return fill(site.whatsappMessages.certificado, {
			titular: titularLabel[producto.titular],
			vigencia: vigenciaLabel(producto.vigenciaAnios),
		});
	}
	return fill(site.whatsappMessages.firmas, {
		cantidad: formatCantidad(producto.cantidad),
		total: formatPrice(producto.precio, producto.moneda),
	});
}

/** Enlace de compra de un producto. */
export function productWhatsappUrl(producto: CollectionEntry<'productos'>['data']): string {
	return whatsappUrl(productMessage(producto));
}
