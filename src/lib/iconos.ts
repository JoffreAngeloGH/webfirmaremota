/** Trazos de los íconos lineales (viewBox 24, `currentColor`). Los pinta components/icons/Icono.astro. */
export const ICONOS = {
	persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
	edificio: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-4h4v4"/>',
	dni: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.6-1.4 1.6-2 3-2s2.4.6 3 2M14 10h5M14 14h4"/>',
	documento: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
	'documento-sello': '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><circle cx="12" cy="14.5" r="3"/><path d="M10.8 14.6l.9.9 1.6-1.8"/>',
	contrato: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 10h6"/><path d="M9 17c1-2 2-2 3 0s2 1 3-1"/>',
	identidad: '<circle cx="10" cy="8" r="4"/><path d="M3 21c0-4 3-7 7-7 1.2 0 2.3.3 3.3.8"/><circle cx="18" cy="17" r="4"/><path d="M16.2 17l1.4 1.4 2.4-2.8"/>',
	reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
	lista: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
	escudo: '<path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
	candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>',
	sobre: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
	telefono: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
} as const;

export type NombreIcono = keyof typeof ICONOS;

export const NOMBRES_ICONO = Object.keys(ICONOS) as [NombreIcono, ...NombreIcono[]];
