/** Ahorro frente al precio por firma de la bolsa mínima, en % entero (0 para la mínima). Lo usan /firmas/ y el inicio. */
export function ahorroDe(unitario: number, unitarioMinimo: number): number {
	return Math.round((1 - unitario / unitarioMinimo) * 100);
}
