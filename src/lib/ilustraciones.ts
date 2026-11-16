/**
 * Animaciones de las ilustraciones (spec 004). Mismas reglas que reveal.ts (constitución §7):
 * - El HTML trae el estado FINAL: sin JS todo se ve completo. GSAP anima "desde" el estado inicial.
 * - Con prefers-reduced-motion no se anima nada.
 * - Lo que ya está en pantalla al cargar no se anima.
 *
 * Uso: un elemento con data-anim="nombre" y partes marcadas con data-parte="…".
 * Cada nombre tiene su línea de tiempo en ANIMACIONES. Se reproduce una vez al entrar en pantalla.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ease = 'power2.out';
type Q = (parte: string) => Element[];
type Builder = (tl: gsap.core.Timeline, q: Q, el: HTMLElement) => void;

/** Trazo que se dibuja: los paths llevan pathLength="1" y stroke-dasharray="1". */
const dibujar = (tl: gsap.core.Timeline, targets: Element[], pos?: gsap.Position, dur = 0.6) =>
	targets.length && tl.from(targets, { strokeDashoffset: 1, duration: dur, ease: 'power1.inOut', stagger: 0.15 }, pos);

/** Firma mini que se "escribe": el recorte se ensancha de izquierda a derecha. */
const escribir = (tl: gsap.core.Timeline, clips: Element[], pos?: gsap.Position, dur = 0.7) =>
	clips.length && tl.from(clips, { attr: { width: 0 }, duration: dur, ease: 'power1.inOut', stagger: 0.25 }, pos);

const ANIMACIONES: Record<string, Builder> = {
	'sin-instalar': (tl, q) => {
		// El instalador aparece y empieza a cargar…
		tl.from(q('instalador'), { opacity: 0, y: 10, duration: 0.45, ease });
		tl.from(q('progreso'), { attr: { width: 0 }, duration: 0.9, ease: 'power1.inOut' });
		// …pero no hace falta: se tacha y queda atrás.
		dibujar(tl, q('tachado'), '-=0.1', 0.35);
		// El documento firmado sube a la nube.
		tl.from(q('nube'), { opacity: 0, scale: 0.8, svgOrigin: '178 82', duration: 0.5, ease: 'back.out(1.7)' }, '-=0.05');
		tl.from(q('doc'), { opacity: 0, y: 26, duration: 0.55, ease }, '-=0.2');
		escribir(tl, q('firma-clip'), '-=0.1', 0.6);
		tl.from(q('check'), { scale: 0, svgOrigin: '204 104', duration: 0.35, ease: 'back.out(2.5)' });
		tl.from(q('destello'), { scale: 0, opacity: 0, transformOrigin: 'center', duration: 0.3, ease: 'back.out(3)', stagger: 0.08 }, '-=0.2');
	},
	dispositivos: (tl, q) => {
		tl.from(q('nube'), { opacity: 0, y: -10, duration: 0.4, ease });
		tl.from(q('equipo'), { opacity: 0, y: 14, duration: 0.45, ease, stagger: 0.12 }, '-=0.1');
		// Pulsos que bajan de la nube a cada equipo…
		tl.fromTo(q('pulso'), { strokeDashoffset: 0.12 }, { strokeDashoffset: -1, duration: 0.7, ease: 'power1.in', stagger: 0.1 });
		// …y la misma firma se escribe en los tres.
		escribir(tl, q('firma-clip'), '-=0.25', 0.6);
	},
	verificacion: (tl, q) => {
		tl.from(q('celular'), { opacity: 0, y: 12, duration: 0.45, ease });
		tl.from(q('pin'), { scale: 0, transformOrigin: 'center', duration: 0.22, ease: 'back.out(2.5)', stagger: 0.16 });
		tl.from(q('aviso'), { opacity: 0, y: -18, duration: 0.5, ease: 'back.out(1.6)' }, '+=0.1');
		tl.from(q('digito'), { opacity: 0, duration: 0.12, stagger: 0.07 });
		tl.from(q('escudo'), { opacity: 0, scale: 0.6, svgOrigin: '56 108', duration: 0.45, ease: 'back.out(2)' }, '+=0.05');
		dibujar(tl, q('check'), '-=0.1', 0.35);
	},
	fichas: (tl, q, el) => {
		tl.from(q('ficha'), { opacity: 0, y: -18, duration: 0.4, ease: 'bounce.out', stagger: 0.12 });
		const contador = el.querySelector<HTMLElement>('[data-contador]');
		if (contador) {
			const hasta = Number(contador.dataset.hasta ?? contador.textContent);
			const obj = { v: 0 };
			tl.fromTo(
				obj,
				{ v: 0 },
				{ v: hasta, duration: 0.8, ease: 'power1.out', onUpdate: () => (contador.textContent = String(Math.round(obj.v))) },
				0,
			);
		}
	},
	encajan: (tl, q) => {
		tl.from(q('pieza-a'), { x: -36, opacity: 0, duration: 0.55, ease });
		tl.from(q('pieza-b'), { x: 36, opacity: 0, duration: 0.55, ease }, '<');
		tl.from(q('union'), { scale: 0, opacity: 0, duration: 0.3, ease: 'back.out(2.5)' }, '-=0.1');
		tl.from(q('igual'), { opacity: 0, duration: 0.2 });
		tl.from(q('resultado'), { scale: 0.85, opacity: 0, duration: 0.45, ease: 'back.out(1.8)' });
		dibujar(tl, q('check'), '-=0.15', 0.35);
	},
	chat: (tl, q) => {
		tl.from(q('burbuja'), { opacity: 0, y: 10, duration: 0.4, ease, stagger: 0.45 });
		tl.from(q('escribiendo'), { opacity: 0, duration: 0.3 });
	},
	acceso: (tl, q) => {
		tl.from(q('usuario'), { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'steps(6)' });
		tl.from(q('clave'), { opacity: 0, scale: 0, transformOrigin: 'center', duration: 0.12, stagger: 0.08 });
		tl.from(q('llave'), { opacity: 0, rotate: -40, transformOrigin: '164px 79px', duration: 0.4, ease: 'back.out(2)' });
	},
	'paso-firma': (tl, q) => {
		tl.from(q('pin'), { scale: 0, transformOrigin: 'center', duration: 0.2, ease: 'back.out(2.5)', stagger: 0.1 });
		tl.from(q('digito'), { opacity: 0, y: 8, duration: 0.25, ease, stagger: 0.08 });
		escribir(tl, q('firma-clip'), '+=0.05', 0.6);
		tl.from(q('sello'), { opacity: 0, scale: 0.5, transformOrigin: '182px 84px', duration: 0.35, ease: 'back.out(2)' });
		dibujar(tl, q('check'), '-=0.1', 0.3);
	},
};

const reducido = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bajoElPliegue = (el: Element) => el.getBoundingClientRect().top > window.innerHeight;

export function initIlustraciones(): void {
	if (reducido()) return;

	document.querySelectorAll<HTMLElement>('[data-anim]').forEach((el) => {
		const build = ANIMACIONES[el.dataset.anim ?? ''];
		if (!build || !bajoElPliegue(el)) return;
		const q: Q = (parte) => Array.from(el.querySelectorAll(`[data-parte="${parte}"]`));
		const tl = gsap.timeline({ paused: true });
		build(tl, q, el);
		tl.progress(1).progress(0); // fija los estados iniciales sin parpadeo
		ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => tl.play() });
	});

	// Recorrido de los pasos: la línea se llena con el scroll, una plumilla avanza en la punta
	// y cada número se "firma" (se rellena) al alcanzarlo.
	document.querySelectorAll<HTMLElement>('[data-pasos]').forEach((pista) => {
		const relleno = pista.querySelector<HTMLElement>('[data-pasos-relleno]');
		const punta = pista.querySelector<HTMLElement>('[data-pasos-punta]');
		const nodos = Array.from(pista.querySelectorAll<HTMLElement>('[data-paso-nodo]'));
		if (!relleno || !punta) return;
		const pintar = (p: number) => {
			gsap.set(relleno, { scaleX: p });
			gsap.set(punta, { left: `${p * 100}%` });
			punta.classList.toggle('is-viajando', p > 0.01 && p < 0.99);
			nodos.forEach((n, i) => n.classList.toggle('is-activo', p >= i / Math.max(1, nodos.length - 1) - 0.02));
		};
		pista.classList.add('is-animada');
		pintar(0);
		ScrollTrigger.create({
			trigger: pista,
			start: 'top 80%',
			end: 'top 30%',
			scrub: 0.5,
			onUpdate: (self) => pintar(self.progress),
			onRefresh: (self) => pintar(self.progress),
		});
	});

	// Firmas grandes que se dibujan al verse (CSS en pausa hasta .is-visible).
	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add('is-visible');
					io.unobserve(e.target);
				}
			}),
		{ threshold: 0.4 },
	);
	document.querySelectorAll('[data-al-ver]').forEach((el) => io.observe(el));
}

export function destroyIlustraciones(): void {
	ScrollTrigger.getAll().forEach((t) => t.kill());
}
