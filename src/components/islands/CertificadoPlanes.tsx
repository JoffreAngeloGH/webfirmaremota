/**
 * Tarjeta del certificado con selector de titular y vigencia (spec 004).
 * - Se renderiza en el servidor con el plan inicial: sin JS se ve completa y su botón funciona.
 * - Los selectores son radios nativos (teclado gratis) con un resaltado que se desliza (Motion).
 * - El precio usa SlidingNumber de animate-ui solo después de hidratar (en SSR no muestra los dígitos);
 *   para lectores de pantalla se anuncia el plan y el precio en texto.
 */
import { useEffect, useId, useMemo, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { SlidingNumber } from '@/components/animate-ui/primitives/texts/sliding-number';
import { buttonVariants } from '@/components/ui/button';

export interface PlanCertificado {
	id: string;
	titular: 'natural' | 'juridica';
	vigenciaAnios: number;
	nombre: string;
	precio: number;
	/** Precio ya formateado, p. ej. "US$ 20.00". */
	precioTexto: string;
	/** Símbolo de moneda, p. ej. "US$". */
	simbolo: string;
	href: string;
}

interface Props {
	numero: string;
	etiqueta: string;
	titulo: string;
	nota?: string;
	puntos: string[];
	ctaLabel: string;
	/** Enlace de texto bajo el botón de compra. */
	enlace?: { label: string; href: string };
	planes: PlanCertificado[];
	/** Textos de los selectores (vienen de la página). */
	leyendaTitular: string;
	leyendaVigencia: string;
	titulares: { value: PlanCertificado['titular']; label: string }[];
	vigencias: { value: number; label: string }[];
}

function Segmentado<T extends string | number>({
	name,
	legend,
	options,
	value,
	onChange,
}: {
	name: string;
	legend: string;
	options: { value: T; label: string }[];
	value: T;
	onChange: (v: T) => void;
}) {
	return (
		<fieldset className="m-0 min-w-0 border-0 p-0">
			<legend className="fr-eyebrow mb-2 p-0 text-fr-muted">{legend}</legend>
			<div
				className="relative grid gap-1 rounded-fr-control border border-fr-line bg-fr-paper p-1"
				style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
			>
				{options.map((o) => {
					const activo = o.value === value;
					return (
						<label
							key={String(o.value)}
							className="relative z-0 flex min-h-11 cursor-pointer items-center justify-center rounded-[7px] px-2 text-center text-sm font-semibold has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-fr-tinta"
						>
							<input
								type="radio"
								name={name}
								value={String(o.value)}
								checked={activo}
								onChange={() => onChange(o.value)}
								className="sr-only"
							/>
							{activo && (
								<motion.span
									layoutId={`${name}-resaltado`}
									aria-hidden="true"
									className="absolute inset-0 -z-10 rounded-[7px] border border-fr-line bg-fr-sheet shadow-fr-sheet"
									transition={{ type: 'spring', stiffness: 500, damping: 38 }}
								/>
							)}
							<span className={activo ? 'text-fr-tinta' : 'text-fr-muted transition-colors hover:text-fr-navy'}>
								{o.label}
							</span>
						</label>
					);
				})}
			</div>
		</fieldset>
	);
}

export default function CertificadoPlanes(props: Props) {
	const { numero, etiqueta, titulo, nota, puntos, ctaLabel, enlace, planes, leyendaTitular, leyendaVigencia, titulares, vigencias } =
		props;
	const uid = useId().replace(/:/g, '');
	const [titular, setTitular] = useState<PlanCertificado['titular']>(titulares[0]!.value);
	const [vigencia, setVigencia] = useState<number>(vigencias[0]!.value);
	const [hidratado, setHidratado] = useState(false);
	useEffect(() => setHidratado(true), []);

	const plan = useMemo(
		() => planes.find((p) => p.titular === titular && p.vigenciaAnios === vigencia) ?? planes[0]!,
		[planes, titular, vigencia],
	);

	return (
		<MotionConfig reducedMotion="user">
			<div className="flex h-full flex-col">
				<div className="flex items-center justify-between gap-3">
					<p className="fr-eyebrow m-0 text-fr-muted">
						{numero} · {etiqueta}
					</p>
					{nota && <span className="shrink-0 font-fr-mono text-xs whitespace-nowrap text-fr-muted">{nota}</span>}
				</div>
				<h3 className="mt-5 mb-0 text-2xl font-bold tracking-tight">{titulo}</h3>

				<div className="mt-6 grid gap-4">
					<Segmentado
						name={`titular-${uid}`}
						legend={leyendaTitular}
						options={titulares}
						value={titular}
						onChange={setTitular}
					/>
					<Segmentado
						name={`vigencia-${uid}`}
						legend={leyendaVigencia}
						options={vigencias}
						value={vigencia}
						onChange={setVigencia}
					/>
				</div>

				<div className="mt-6">
					<p className="m-0 font-fr-mono text-xs text-fr-muted" aria-hidden="true">
						{plan.nombre}
					</p>
					<p className="mt-2 mb-0 font-fr-display text-[2.6rem] leading-none font-extrabold tracking-tight text-fr-navy tabular-nums">
						{hidratado ? (
							<span aria-hidden="true" className="inline-flex items-baseline">
								{plan.simbolo}&nbsp;
								<SlidingNumber number={plan.precio} decimalPlaces={2} />
							</span>
						) : (
							<span aria-hidden="true">{plan.precioTexto}</span>
						)}
					</p>
					<p className="sr-only" aria-live="polite">
						{plan.nombre}: {plan.precioTexto}
					</p>
				</div>

				<ul className="mt-6 mb-0 list-none space-y-3 border-t border-dashed border-fr-line-strong p-0 pt-6">
					{puntos.map((punto) => (
						<li key={punto} className="flex gap-3 text-sm text-fr-text">
							<svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-fr-navy" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
								<path d="M5 12.5l4.5 4.5L19 7.5" />
							</svg>
							{punto}
						</li>
					))}
				</ul>

				<div className="min-h-8 flex-1" aria-hidden="true" />
				<a href={plan.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'w-full' })}>
					{ctaLabel}
				</a>
				{enlace && (
					<a href={enlace.href} className={buttonVariants({ variant: 'link', className: 'mt-1 self-center' })}>
						{enlace.label}
					</a>
				)}
			</div>
		</MotionConfig>
	);
}
