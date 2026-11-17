/**
 * Disposición compartida de las tarjetas de Productos (spec 010, iteraciones 4 y 5): rejilla, franja de resumen,
 * precio, puntos y enlace secundario. Las dos tarjetas (certificado y firmas) usan estas piezas, para que no se desalineen.
 *
 * La tarjeta no lleva padding: cada zona lleva el suyo, para que la franja navy llegue a los bordes.
 * Móvil: cabecera → elegir → puntos → franja. Desde `lg`: tres columnas (info + puntos | elegir | franja).
 */
import type { ReactNode } from 'react';
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number';
import { buttonVariants } from '@/components/ui/button';
import { ICONOS, type NombreIcono } from '@/lib/iconos';
import { opcion, punto as puntoCls } from '@/lib/opcion-clases';

export const rejilla = 'grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_330px] lg:grid-rows-[auto_1fr]';
export const zona = {
	info: 'px-6 pt-7 sm:px-8 sm:pt-8 lg:col-start-1 lg:row-start-1 lg:pt-10 lg:pr-9 lg:pl-10',
	elegir: 'min-w-0 px-6 pt-8 sm:px-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:pt-12 lg:pr-9 lg:pb-10 lg:pl-0',
	puntos: 'px-6 pt-7 pb-8 sm:px-8 lg:col-start-1 lg:row-start-2 lg:pr-9 lg:pb-10 lg:pl-10',
	panel: 'lg:col-start-3 lg:row-span-2 lg:row-start-1',
} as const;

export function Flecha() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="size-4 transition-transform duration-150 ease-gs-out motion-safe:group-hover/button:translate-x-0.5"
			fill="none"
			stroke="currentColor"
			strokeWidth="2.2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M5 12h14M13 6l6 6-6 6" />
		</svg>
	);
}

/** Trazos de src/lib/iconos.ts en un svg lineal (mismo trazo que Icono.astro). */
export function Icono({ nombre, className }: { nombre: NombreIcono; className?: string }) {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.7"
			strokeLinecap="round"
			strokeLinejoin="round"
			dangerouslySetInnerHTML={{ __html: ICONOS[nombre] }}
		/>
	);
}

export function Cabecera({ icono, titulo, lema, bajada }: { icono: NombreIcono; titulo: string; lema: string; bajada: string }) {
	return (
		<div className={zona.info}>
			<div className="flex items-center gap-3.5">
				<span className="grid size-11 shrink-0 place-items-center rounded-fr-control bg-fr-paper-2 text-fr-navy">
					<Icono nombre={icono} className="size-[22px]" />
				</span>
				<h3 className="m-0 text-2xl font-bold tracking-tight">{titulo}</h3>
			</div>
			<p className="mt-5 mb-0 max-w-[46ch] text-[15px] leading-relaxed text-fr-text">
				<strong className="font-bold text-fr-navy">{lema}</strong> {bajada}
			</p>
		</div>
	);
}

export function Puntos({ puntos }: { puntos: string[] }) {
	return (
		<div className={zona.puntos}>
			<ul className="m-0 list-none space-y-4 p-0">
				{puntos.map((punto) => (
					<li key={punto} className="flex gap-3 text-sm text-fr-text">
						<span aria-hidden="true" className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-fr-paper-2 text-fr-navy">
							<svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
								<path d="M5 12.5l4.5 4.5L19 7.5" />
							</svg>
						</span>
						{punto}
					</li>
				))}
			</ul>
		</div>
	);
}

/**
 * Tarjeta de opción: lenguaje común de los tres grupos de la columna central. El estado "elegido" sale del radio nativo
 * (`has-[:checked]`), así que se ve igual sin JS. Sin contenedor ni resaltado deslizante.
 */
export function Opcion({
	name,
	value,
	checked,
	onChange,
	describedBy,
	className = '',
	children,
}: {
	name: string;
	value: string;
	checked: boolean;
	onChange: () => void;
	describedBy?: string;
	className?: string;
	children: ReactNode;
}) {
	return (
		<label className={`${opcion.base} ${opcion.radio} ${className}`}>
			<input type="radio" name={name} value={value} checked={checked} onChange={onChange} aria-describedby={describedBy} className="sr-only" />
			{children}
		</label>
	);
}

/** Punto del radio: tinta cuando la opción está elegida (es un control). */
export function Punto({ className = '' }: { className?: string }) {
	return (
		<span aria-hidden="true" className={`${puntoCls.base} ${puntoCls.radio} ${className}`}>
			<span className={`${puntoCls.interior} ${puntoCls.interiorRadio}`} />
		</span>
	);
}

/** Leyenda de un grupo de opciones. */
export const leyendaCls = 'mb-2.5 p-0 text-[13px] font-semibold text-fr-navy';

/** Franja navy de resumen: arriba plan y precio, abajo los botones. Es un contenedor para dimensionar el precio. */
export function Panel({ arriba, abajo }: { arriba: ReactNode; abajo: ReactNode }) {
	return (
		<div className={`${zona.panel} @container flex min-w-0 flex-col gap-8 bg-fr-navy px-6 py-8 text-white sm:px-8 lg:py-10`}>
			<div>{arriba}</div>
			<div className="mt-auto flex flex-col gap-4">{abajo}</div>
		</div>
	);
}

/** Línea del plan + precio grande con "+ IGV" + línea bajo el precio. Todo en blanco, mismo tamaño en las dos franjas. */
export function Precio({
	lineaPlan,
	simbolo,
	precio,
	precioTexto,
	nota,
	hidratado,
	extra,
}: {
	lineaPlan: string;
	simbolo: string;
	precio: number;
	precioTexto: string;
	nota?: string;
	hidratado: boolean;
	extra?: string;
}) {
	return (
		<>
			<p className="m-0 font-fr-mono text-xs text-white/70" aria-hidden="true">
				{lineaPlan}
			</p>
			<p className="mt-2 mb-0 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-fr-display text-[clamp(1.5rem,12.5cqi,2.6rem)] leading-none font-extrabold tracking-tight text-white tabular-nums">
				{hidratado ? (
					<span aria-hidden="true" className="inline-flex items-baseline">
						{simbolo}&nbsp;
						<SlidingNumber number={precio} decimalPlaces={2} />
					</span>
				) : (
					<span aria-hidden="true">{precioTexto}</span>
				)}
				{nota && (
					<span aria-hidden="true" className="text-sm font-semibold tracking-normal text-white/70">
						{nota}
					</span>
				)}
			</p>
			{extra && <p className="mt-3 mb-0 text-sm text-white/75">{extra}</p>}
		</>
	);
}

/** Azul tinta (P20); sobre navy lleva sombra oscura, contorno claro y foco blanco para despegarse del fondo. */
export function BotonPrincipal({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={buttonVariants({
				className:
					'w-full border-white/20 shadow-[0_10px_24px_-10px_rgb(0_0_0/0.6)] focus-visible:ring-white! focus-visible:ring-offset-fr-navy!',
			})}
		>
			{children}
		</a>
	);
}

/** Enlace blanco con flecha, alineado a la izquierda. */
export function BotonSecundario({ href, children }: { href: string; children: ReactNode }) {
	return (
		<a
			href={href}
			className="group/button inline-flex min-h-11 items-center gap-2 self-start rounded-sm text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
		>
			{children}
			<Flecha />
		</a>
	);
}
