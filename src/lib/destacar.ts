/**
 * Resalta el destino de un ancla (spec 005, regla de Girasol "resaltar un destino").
 * Al llegar con #hash (carga o hashchange) a un elemento con data-destacable, lo centra en pantalla y
 * le pone un anillo ámbar durante 2.2 s (clase .is-destacado, en global.css).
 * Con prefers-reduced-motion: sin scroll suave, pero el anillo se mantiene.
 */
const DURACION_MS = 2200;
let temporizador: number | undefined;
let escuchando = false;

function destacar(): void {
	const id = decodeURIComponent(window.location.hash.slice(1));
	if (!id) return;
	const el = document.getElementById(id);
	if (!el || !el.hasAttribute('data-destacable')) return;

	const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	// scrollIntoView({ block: 'center' }) suma el scroll-margin-top del ancla y deja la tarjeta más abajo del centro.
	// offsetTop ignora los transform: la tarjeta puede estar a mitad de su entrada (data-reveal, +24px).
	let arriba = 0;
	for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) arriba += n.offsetTop;
	const top = Math.max(0, arriba - (window.innerHeight - el.offsetHeight) / 2);
	window.scrollTo({ top, behavior: reducido ? 'auto' : 'smooth' });

	document.querySelectorAll('.is-destacado').forEach((otro) => otro.classList.remove('is-destacado'));
	window.clearTimeout(temporizador);
	el.classList.add('is-destacado');
	temporizador = window.setTimeout(() => el.classList.remove('is-destacado'), DURACION_MS);
}

export function initDestacar(): void {
	// ClientRouter lleva el scroll a (0, 0) en el mismo instante en que dispara astro:page-load y cancelaría un
	// scroll suave iniciado ahora: se espera a que termine de acomodar la página.
	window.setTimeout(destacar, 50);
	if (!escuchando) {
		window.addEventListener('hashchange', destacar);
		escuchando = true;
	}
}
