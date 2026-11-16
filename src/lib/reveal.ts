/**
 * Entrada al hacer scroll con los valores del design system (DESIGN.md §5).
 *
 * Uso en cualquier .astro:
 *   <div data-reveal>…</div>                    → fade-up del bloque
 *   <ul data-reveal="stagger"><li>…</li></ul>    → los hijos entran en cascada (0.1s)
 *
 * Reglas (constitución §7):
 * - Sin JS el contenido se ve completo: no hay CSS que lo oculte.
 * - Con prefers-reduced-motion no se anima nada.
 * - Lo que ya está en pantalla al cargar no se anima (no bloquea el primer pantallazo).
 * - No usar `transition-all` en elementos animados (ni en los hijos de un stagger): la transición CSS
 *   intercepta la opacidad y el transform de GSAP. Para hovers, limitarla: `transition-[translate,box-shadow]`.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tokens } from '@/styles/girasol/tokens.js';

gsap.registerPlugin(ScrollTrigger);

const distance = parseFloat(tokens.motion.distance.reveal);
const duration = parseFloat(tokens.motion.duration.slow) / 1000;
const ease = 'power2.out'; // ≈ tokens.motion.easing.out
const stagger = 0.1;

function isBelowFold(el: Element): boolean {
	return el.getBoundingClientRect().top > window.innerHeight;
}

export function initReveal(): void {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
		if (!isBelowFold(el)) return;
		const isStagger = el.dataset.reveal === 'stagger';
		gsap.from(isStagger ? Array.from(el.children) : el, {
			y: distance,
			opacity: 0,
			duration,
			ease,
			stagger: isStagger ? stagger : 0,
			scrollTrigger: { trigger: el, start: 'top 85%', once: true },
		});
	});
}

export function destroyReveal(): void {
	ScrollTrigger.getAll().forEach((t) => t.kill());
}
