/** Cálculos de los planes de certificado (precio por año, texto de vigencias). Los usan el inicio y las páginas por titular. */
import { formatPrice } from '@/lib/format';

/** Precio por año, ya formateado: "US$ 17.00". */
export function precioPorAnio(precio: number, anios: number, moneda: 'USD' | 'PEN'): string {
	return formatPrice(precio / anios, moneda);
}

/** "1 o 2 años", "1, 2 o 3 años". */
export function vigenciasTexto(vigencias: number[]): string {
	const ultimo = vigencias[vigencias.length - 1];
	return vigencias.length > 1 ? `${vigencias.slice(0, -1).join(', ')} o ${ultimo} años` : `${ultimo} año(s)`;
}
