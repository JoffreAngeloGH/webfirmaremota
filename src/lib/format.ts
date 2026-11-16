/** Formato de precio de la marca: `US$ 20.00`, `S/ 472.00` (DESIGN.md §7). */
export function formatPrice(amount: number, currency: 'USD' | 'PEN', decimals = 2): string {
	const symbol = currency === 'USD' ? 'US$' : 'S/';
	const value = amount.toLocaleString('en-US', {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});
	return `${symbol} ${value}`;
}

export const titularLabel = {
	natural: 'persona natural',
	juridica: 'persona jurídica',
} as const;

export function vigenciaLabel(anios: number): string {
	return anios === 1 ? '1 año' : `${anios} años`;
}
