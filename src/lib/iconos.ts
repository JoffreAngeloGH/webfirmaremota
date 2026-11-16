/** Trazos de los íconos lineales (viewBox 24, `currentColor`). Los pinta components/icons/Icono.astro. */
export const ICONOS = {
	persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
	edificio: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M10 21v-4h4v4"/>',
	dni: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.6-1.4 1.6-2 3-2s2.4.6 3 2M14 10h5M14 14h4"/>',
	documento: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
	'documento-sello': '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><circle cx="12" cy="14.5" r="3"/><path d="M10.8 14.6l.9.9 1.6-1.8"/>',
	sobre: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
	telefono: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
} as const;

export type NombreIcono = keyof typeof ICONOS;

export const NOMBRES_ICONO = Object.keys(ICONOS) as [NombreIcono, ...NombreIcono[]];
