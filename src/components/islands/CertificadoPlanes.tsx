/**
 * Tarjeta del certificado con selector de titular y vigencia (spec 004, iteraciones 4 y 5).
 * - Se renderiza en el servidor con el plan inicial: sin JS se ve completa y su botón funciona.
 * - Los selectores son tarjetas de opción con radios nativos (teclado gratis); el estado elegido sale de `:checked`.
 * - El precio usa SlidingNumber de animate-ui solo después de hidratar (en SSR no muestra los dígitos);
 *   para lectores de pantalla se anuncia el plan y el precio en texto.
 */
import { useEffect, useId, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ChipAhorro } from '@/components/ui/chip-ahorro';
import type { NombreIcono } from '@/lib/iconos';
import { setSeleccion } from '@/lib/seleccion-productos';
import {
	BotonPrincipal,
	BotonSecundario,
	Cabecera,
	Icono,
	leyendaCls,
	Opcion,
	Panel,
	Precio,
	Puntos,
	Punto,
	rejilla,
	zona,
} from '@/components/islands/productos-layout';

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
	/** Línea corta del plan en la franja: "Persona natural · 1 año". */
	lineaCorta: string;
	/** Bajo el precio: "Un solo pago por toda la vigencia." o "Equivale a US$ 17.00 por año." */
	lineaBajo: string;
	href: string;
}

export interface TitularCertificado {
	value: PlanCertificado['titular'];
	label: string;
	icono: NombreIcono;
	/** Línea corta bajo el nombre; se asocia al selector con aria-describedby. */
	corta: string;
	puntos: string[];
	/** Enlace de texto bajo el botón: sigue al titular elegido. */
	enlace: { label: string; href: string };
}

interface Props {
	icono: NombreIcono;
	titulo: string;
	/** Metáfora que abre la bajada, en negrita. */
	lema: string;
	bajada: string;
	/** "+ IGV": va en la misma línea que el precio, fuera del número animado. */
	nota?: string;
	/** Lo mismo para lectores de pantalla ("más IGV"). */
	notaSr?: string;
	ctaLabel: string;
	planes: PlanCertificado[];
	/** Textos de los selectores (vienen de la página). */
	leyendaTitular: string;
	leyendaVigencia: string;
	titulares: TitularCertificado[];
	vigencias: { value: number; label: string; chip?: string }[];
}

export default function CertificadoPlanes(props: Props) {
	const { icono, titulo, lema, bajada, nota, notaSr, ctaLabel, planes, leyendaTitular, leyendaVigencia, titulares, vigencias } = props;
	const uid = useId().replace(/:/g, '');
	const [titular, setTitular] = useState<PlanCertificado['titular']>(titulares[0]!.value);
	const [vigencia, setVigencia] = useState<number>(vigencias[0]!.value);
	const [hidratado, setHidratado] = useState(false);
	useEffect(() => setHidratado(true), []);

	const planDe = (t: PlanCertificado['titular'], v: number) => planes.find((p) => p.titular === t && p.vigenciaAnios === v);
	const plan = useMemo(() => planDe(titular, vigencia) ?? planes[0]!, [planes, titular, vigencia]);
	// Publica el plan elegido para la franja "Compra los dos".
	useEffect(() => setSeleccion({ planId: plan.id }), [plan.id]);
	const datosTitular = titulares.find((t) => t.value === titular) ?? titulares[0]!;

	return (
		<MotionConfig reducedMotion="user">
			<div className={rejilla}>
				<Cabecera icono={icono} titulo={titulo} lema={lema} bajada={bajada} />

				<div className={`${zona.elegir} grid content-start gap-5`}>
					<fieldset className="m-0 min-w-0 border-0 p-0" aria-describedby={`corta-${uid}-${titular}`}>
						<legend className={leyendaCls}>{leyendaTitular}</legend>
						<div className="grid grid-cols-2 gap-2">
							{titulares.map((t) => (
								<Opcion key={t.value} name={`titular-${uid}`} value={t.value} checked={t.value === titular} onChange={() => setTitular(t.value)} className="flex-col gap-2.5">
									<span className="flex items-start justify-between">
										<Icono nombre={t.icono} className="size-5 text-fr-navy" />
										<Punto />
									</span>
									<span>
										<span className="block text-sm font-semibold text-fr-navy">{t.label}</span>
										<span id={`corta-${uid}-${t.value}`} className="mt-0.5 block text-[13px] leading-snug text-fr-muted">
											{t.corta}
										</span>
									</span>
								</Opcion>
							))}
						</div>
					</fieldset>

					<fieldset className="m-0 min-w-0 border-0 p-0">
						<legend className={leyendaCls}>{leyendaVigencia}</legend>
						<div className="grid grid-cols-2 gap-2">
							{vigencias.map((v) => {
								const p = planDe(titular, v.value);
								return (
									<Opcion key={v.value} name={`vigencia-${uid}`} value={String(v.value)} checked={v.value === vigencia} onChange={() => setVigencia(v.value)} className="flex-col gap-2">
										<span className="flex items-center justify-between">
											<span className="text-sm font-semibold text-fr-navy">{v.label}</span>
											<Punto />
										</span>
										<span className="font-fr-display text-lg leading-none font-extrabold text-fr-navy tabular-nums">{p?.precioTexto}</span>
										<span className="min-h-5">{v.chip && <ChipAhorro>{v.chip}</ChipAhorro>}</span>
									</Opcion>
								);
							})}
						</div>
					</fieldset>
				</div>

				<Puntos puntos={datosTitular.puntos} />

				<Panel
					arriba={
						<>
							<Precio
								lineaPlan={plan.lineaCorta}
								simbolo={plan.simbolo}
								precio={plan.precio}
								precioTexto={plan.precioTexto}
								nota={nota}
								hidratado={hidratado}
								extra={plan.lineaBajo}
							/>
							<p className="sr-only" aria-live="polite">
								{plan.nombre}: {plan.precioTexto} {notaSr}
							</p>
						</>
					}
					abajo={
						<>
							<BotonPrincipal href={plan.href}>{ctaLabel}</BotonPrincipal>
							<BotonSecundario href={datosTitular.enlace.href}>{datosTitular.enlace.label}</BotonSecundario>
						</>
					}
				/>
			</div>
		</MotionConfig>
	);
}
