import type { CollectionEntry } from 'astro:content';
import { site } from '@/config/site';
import { formatCantidad, formatPrice, rellenar, titularLabel, vigenciaLabel } from '@/lib/format';

/** Enlace wa.me con mensaje prellenado. */
export function whatsappUrl(message: string = site.whatsappMessages.general): string {
	return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensaje de compra según el producto, para que ventas sepa qué quiere el cliente. */
export function productMessage(producto: CollectionEntry<'productos'>['data']): string {
	if (producto.tipo === 'certificado') {
		return rellenar(site.whatsappMessages.certificado, {
			titular: titularLabel[producto.titular],
			vigencia: vigenciaLabel(producto.vigenciaAnios),
		});
	}
	return rellenar(site.whatsappMessages.firmas, {
		cantidad: formatCantidad(producto.cantidad),
		total: formatPrice(producto.precio, producto.moneda),
	});
}

/** Enlace de compra de un producto. */
export function productWhatsappUrl(producto: CollectionEntry<'productos'>['data']): string {
	return whatsappUrl(productMessage(producto));
}

/** Consulta por un certificado según el titular: "persona natural" / "persona jurídica". */
export function certificadoTitularUrl(titular: keyof typeof titularLabel): string {
	return whatsappUrl(rellenar(site.whatsappMessages.certificadoTitular, { titular: titularLabel[titular] }));
}
