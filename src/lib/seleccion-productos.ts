/**
 * Lo que el visitante tiene elegido en las tarjetas de Productos, compartido entre islas (sin dependencias).
 * Un valor `null` significa "el inicial": cada isla usa su primer plan o su primera bolsa, así el SSR coincide.
 * Las islas se hidratan por separado pero comparten este módulo (misma URL de módulo en la página).
 */
import { useSyncExternalStore } from 'react';

export interface Seleccion {
	planId: string | null;
	bolsaId: string | null;
}

const INICIAL: Seleccion = { planId: null, bolsaId: null };
let actual: Seleccion = INICIAL;
const oyentes = new Set<() => void>();

export function setSeleccion(parcial: Partial<Seleccion>): void {
	const siguiente = { ...actual, ...parcial };
	if (siguiente.planId === actual.planId && siguiente.bolsaId === actual.bolsaId) return;
	actual = siguiente;
	oyentes.forEach((o) => o());
}

export function subscribe(oyente: () => void): () => void {
	oyentes.add(oyente);
	return () => oyentes.delete(oyente);
}

export function useSeleccion(): Seleccion {
	return useSyncExternalStore(subscribe, () => actual, () => INICIAL);
}
