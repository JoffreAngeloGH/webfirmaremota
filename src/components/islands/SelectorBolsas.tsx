/**
 * Selector de bolsas de firmas con control deslizante (spec 007 §3.2). Sigue el patrón de CertificadoPlanes:
 * - Se renderiza en el servidor con la bolsa mínima: sin JS se ve completo y su botón funciona.
 * - El control es un <input type="range"> nativo de N pasos (índice de la bolsa): flechas, Inicio y Fin gratis.
 * - El total usa SlidingNumber de animate-ui solo después de hidratar (en SSR no muestra los dígitos); para
 *   lectores de pantalla se anuncia la bolsa y el total en texto (aria-live).
 * Color: pista recorrida en ámbar (decorativa), pulgar en tinta (es un control).
 */
import { useEffect, useId, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number';
import { buttonVariants } from '@/components/ui/button';

export interface BolsaSelector {
	id: string;
	nombre: string;
	/** Cantidad con miles separados por espacio, p. ej. "1 000". */
	cantidadTexto: string;
	total: number;
	/** Total ya formateado, p. ej. "US$ 450.00". */
	totalTexto: string;
	/** Precio por firma ya formateado, p. ej. "US$ 0.90". */
	unitarioTexto: string;
	/** Ahorro frente a la bolsa mínima, en % entero (0 si no hay). */
	ahorro: number;
	href: string;
}

interface Props {
	etiqueta: string;
	/** Texto del control, p. ej. "Elige cuántas firmas". */
	leyenda: string;
	/** "firmas" */
	firmasLabel: string;
	/** "por firma" */
	porFirmaLabel: string;
	/** "Ahorras" */
	ahorraLabel: string;
	/** "Total" */
	totalLabel: string;
	ctaLabel: string;
	nota?: string;
	/** "+ IGV": va en la misma línea que el total, fuera del número animado. */
	igv?: string;
	/** Lo mismo para lectores de pantalla ("más IGV"). */
	igvSr?: string;
	/** Símbolo de moneda, p. ej. "US$". */
	simbolo: string;
	bolsas: BolsaSelector[];
}

const THUMB = 28; // px, debe coincidir con .fr-range en global.css
/** Marcas que se muestran en pantallas angostas (las demás caben solo desde sm). */
const MARCAS_MOVIL = (n: number) => new Set([0, 3, 5, n - 1]);

export default function SelectorBolsas(props: Props) {
	const { etiqueta, leyenda, firmasLabel, porFirmaLabel, ahorraLabel, totalLabel, ctaLabel, nota, igv, igvSr, simbolo, bolsas } = props;
	const uid = useId().replace(/:/g, '');
	const [indice, setIndice] = useState(0);
	const [hidratado, setHidratado] = useState(false);
	useEffect(() => setHidratado(true), []);

	const ultimo = bolsas.length - 1;
	const bolsa = bolsas[indice] ?? bolsas[0]!;
	const pct = ultimo > 0 ? (indice / ultimo) * 100 : 0;
	const movil = MARCAS_MOVIL(bolsas.length);

	return (
		<MotionConfig reducedMotion="user">
			<div className="flex h-full flex-col">
				<p className="fr-eyebrow m-0 text-fr-muted">{etiqueta}</p>

				<div className="mt-6">
					<label htmlFor={`rango-${uid}`} className="fr-eyebrow block text-fr-muted">
						{leyenda}
					</label>
					<p className="mt-3 mb-0 font-fr-display text-3xl leading-none font-extrabold tracking-tight text-fr-navy tabular-nums sm:text-4xl">
						{bolsa.cantidadTexto} <span className="text-lg font-bold text-fr-muted sm:text-xl">{firmasLabel}</span>
					</p>

					<div className="mt-6">
						<input
							id={`rango-${uid}`}
							type="range"
							className="fr-range"
							min={0}
							max={ultimo}
							step={1}
							value={indice}
							onChange={(e) => setIndice(Number(e.target.value))}
							aria-valuetext={`${bolsa.cantidadTexto} ${firmasLabel}, ${bolsa.totalTexto} ${igvSr ?? ''}`.trim()}
							style={{ ['--fr-range-pct' as string]: `${pct}%` }}
						/>
						<div className="relative mt-3 h-5" aria-hidden="true">
							{bolsas.map((b, i) => (
								<span
									key={b.id}
									className={`absolute top-0 -translate-x-1/2 font-fr-mono text-xs whitespace-nowrap ${
										i === indice ? 'font-medium text-fr-navy' : 'text-fr-muted'
									} ${movil.has(i) ? '' : 'max-sm:hidden'}`}
									style={{ left: `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${ultimo > 0 ? i / ultimo : 0})` }}
								>
									{b.cantidadTexto}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className="mt-8 border-t border-dashed border-fr-line-strong pt-6">
					<p className="fr-eyebrow m-0 text-fr-muted">{totalLabel}</p>
					<p className="mt-2 mb-0 flex flex-wrap items-baseline gap-x-2 font-fr-display text-[1.9rem] leading-none font-extrabold tracking-tight text-fr-navy tabular-nums sm:text-[2.6rem]">
						{hidratado ? (
							<span aria-hidden="true" className="inline-flex items-baseline">
								{simbolo}&nbsp;
								<SlidingNumber number={bolsa.total} decimalPlaces={2} />
							</span>
						) : (
							<span aria-hidden="true">{bolsa.totalTexto}</span>
						)}
						{igv && (
							<span aria-hidden="true" className="text-sm font-semibold tracking-normal text-fr-muted">
								{igv}
							</span>
						)}
					</p>
					<p className="sr-only" aria-live="polite">
						{bolsa.cantidadTexto} {firmasLabel}: {bolsa.totalTexto} {igvSr}
					</p>
					<p className="mt-3 mb-0 flex flex-wrap items-center gap-x-4 gap-y-2 font-fr-mono text-xs text-fr-muted">
						<span>
							{bolsa.unitarioTexto} {porFirmaLabel}
						</span>
						{bolsa.ahorro > 0 && (
							<span className="rounded-full bg-fr-navy px-3 py-1 font-medium text-fr-girasol">
								{ahorraLabel} {bolsa.ahorro} %
							</span>
						)}
					</p>
				</div>

				<div className="min-h-8 flex-1" aria-hidden="true" />
				<a href={bolsa.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'w-full' })}>
					{ctaLabel}
					<span className="sr-only"> {bolsa.nombre}</span>
				</a>
				{nota && <p className="mt-4 mb-0 text-center font-fr-mono text-xs text-fr-muted">{nota}</p>}
			</div>
		</MotionConfig>
	);
}
