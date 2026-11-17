/**
 * Clases de la "tarjeta de opción" (inicio, spec 010; pestañas de /certificado-digital/, spec 011). Un solo lugar para
 * que el radio de React y la pestaña de Astro se vean igual. El estado elegido sale del radio nativo (`:checked`) o de
 * `aria-selected`. Tailwind las detecta aquí porque los literales completos están en este archivo.
 */
export const opcion = {
	base: 'group relative flex cursor-pointer rounded-fr-control border border-fr-line bg-fr-sheet p-3 text-left transition-colors duration-150 hover:border-fr-line-strong',
	/** Radio nativo dentro de un <label>. */
	radio:
		'has-[:checked]:border-fr-tinta has-[:checked]:bg-fr-tinta-soft/40 has-[:checked]:ring-1 has-[:checked]:ring-fr-tinta has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fr-tinta',
	/** Pestaña (role="tab"). */
	tab: 'aria-selected:border-fr-tinta aria-selected:bg-fr-tinta-soft/40 aria-selected:ring-1 aria-selected:ring-fr-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-tinta',
} as const;

/** Punto del radio: tinta cuando la opción está elegida (es un control). */
export const punto = {
	base: 'grid size-4 shrink-0 place-items-center rounded-full border-2 border-fr-line-strong transition-colors duration-150',
	radio: 'group-has-[:checked]:border-fr-tinta',
	tab: 'group-aria-selected:border-fr-tinta',
	interior: 'size-2 scale-0 rounded-full bg-fr-tinta transition-transform duration-150',
	interiorRadio: 'group-has-[:checked]:scale-100',
	interiorTab: 'group-aria-selected:scale-100',
} as const;
