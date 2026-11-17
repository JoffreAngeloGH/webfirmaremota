/**
 * Celdas de la matriz de planes (specs 006 y 008): una por vigencia, con el precio por año calculado.
 * Lo usan /certificado-digital/ y las páginas por titular, para que ambas muestren lo mismo.
 */
import type { CollectionEntry } from 'astro:content';
import type { CeldaPlan } from '@/components/sections/MatrizPlanes.astro';
import { formatPrice, notaIgv } from '@/lib/format';
import { productWhatsappUrl } from '@/lib/whatsapp';

type Producto = CollectionEntry<'productos'>['data'];
type Certificado = Extract<Producto, { tipo: 'certificado' }>;

export function celdasDe(planes: Certificado[], titular: 'natural' | 'juridica', vigencias: number[]): CeldaPlan[] {
	return vigencias.flatMap((anios) => {
		const p = planes.find((x) => x.titular === titular && x.vigenciaAnios === anios);
		if (!p) return [];
		const porAnio = p.precio / p.vigenciaAnios;
		return [
			{
				id: `${titular}-${anios}-${anios === 1 ? 'ano' : 'anos'}`,
				precio: formatPrice(p.precio, p.moneda),
				porAnio: `${formatPrice(porAnio, p.moneda)} por año`,
				nota: notaIgv(p.incluyeIgv),
				nombre: p.nombre,
				href: productWhatsappUrl(p),
			},
		];
	});
}

/** "1 o 2 años", "1, 2 o 3 años". */
export function vigenciasTexto(vigencias: number[]): string {
	const ultimo = vigencias[vigencias.length - 1];
	return vigencias.length > 1 ? `${vigencias.slice(0, -1).join(', ')} o ${ultimo} años` : `${ultimo} año(s)`;
}
