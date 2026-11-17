/**
 * Tarjeta de firmas con bolsas seleccionables (spec 010). Mismo patrón que CertificadoPlanes:
 * - Se renderiza en el servidor con la bolsa mínima elegida: sin JS se ve completa y su botón funciona.
 * - Las bolsas son tarjetas de opción con radios nativos (teclado gratis); el estado elegido sale de `:checked`.
 * - El total usa SlidingNumber solo después de hidratar; para lectores de pantalla se anuncia la bolsa y el total.
 */
import { useEffect, useId, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ChipAhorro } from '@/components/ui/chip-ahorro';
import type { NombreIcono } from '@/lib/iconos';
import { setSeleccion } from '@/lib/seleccion-productos';
import {
	BotonPrincipal,
	BotonSecundario,
	Cabecera,
	leyendaCls,
	Opcion,
	Panel,
	Precio,
	Puntos,
	Punto,
	rejilla,
	zona,
} from '@/components/islands/productos-layout';

export interface BolsaFirmas {
	id: string;
	/** "1 000 firmas" */
	cantidadTexto: string;
	total: number;
	/** Total ya formateado, p. ej. "US$ 850.00". */
	totalTexto: string;
	/** "US$ 0.85 c/u" */
	unitarioTexto: string;
	/** "Ahorras 15 %"; ausente en la bolsa mínima. */
	ahorroTexto?: string;
	/** "Bolsa de 1 000 firmas": línea del plan en la franja y anuncio a lectores de pantalla. */
	lineaPlan: string;
	/** Bajo el precio: "US$ 0.85 por firma · no vencen." */
	lineaBajo: string;
	/** "Comprar 1 000 firmas" */
	ctaLabel: string;
	href: string;
}

interface Props {
	icono: NombreIcono;
	titulo: string;
	/** Metáfora que abre la bajada, en negrita. */
	lema: string;
	bajada: string;
	/** Texto del grupo de radios (legend). */
	leyenda: string;
	simbolo: string;
	/** "+ IGV": va junto al precio grande. */
	nota?: string;
	notaSr?: string;
	bolsas: BolsaFirmas[];
	puntos: string[];
	/** Enlace bajo el botón de compra. */
	enlace: { label: string; href: string };
}

export default function FirmasBolsas(props: Props) {
	const { icono, titulo, lema, bajada, leyenda, simbolo, nota, notaSr, bolsas, puntos, enlace } = props;
	const uid = useId().replace(/:/g, '');
	const [id, setId] = useState(bolsas[0]!.id);
	const [hidratado, setHidratado] = useState(false);
	useEffect(() => setHidratado(true), []);
	const bolsa = bolsas.find((b) => b.id === id) ?? bolsas[0]!;
	// Publica la bolsa elegida para la franja "Compra los dos".
	useEffect(() => setSeleccion({ bolsaId: bolsa.id }), [bolsa.id]);

	return (
		<MotionConfig reducedMotion="user">
			<div className={rejilla}>
				<Cabecera icono={icono} titulo={titulo} lema={lema} bajada={bajada} />

				<div className={zona.elegir}>
					<fieldset className="m-0 min-w-0 border-0 p-0">
						<legend className={leyendaCls}>{leyenda}</legend>
						<div className="grid gap-2">
							{bolsas.map((b) => (
								<Opcion key={b.id} name={`bolsa-${uid}`} value={b.id} checked={b.id === id} onChange={() => setId(b.id)} className="items-center gap-3 py-4">
									<Punto />
									<span className="min-w-0 flex-1">
										<span className="flex items-baseline justify-between gap-3">
											<span className="text-sm font-semibold text-fr-navy tabular-nums">{b.cantidadTexto}</span>
											<span className="font-fr-display text-base font-extrabold whitespace-nowrap text-fr-navy tabular-nums">{b.totalTexto}</span>
										</span>
										<span className="mt-1 flex items-center gap-2 text-xs text-fr-muted tabular-nums">
											{b.unitarioTexto}
											{b.ahorroTexto && <ChipAhorro>{b.ahorroTexto}</ChipAhorro>}
										</span>
									</span>
								</Opcion>
							))}
						</div>
					</fieldset>
				</div>

				<Puntos puntos={puntos} />

				<Panel
					arriba={
						<>
							<Precio
								lineaPlan={bolsa.lineaPlan}
								simbolo={simbolo}
								precio={bolsa.total}
								precioTexto={bolsa.totalTexto}
								nota={nota}
								hidratado={hidratado}
								extra={bolsa.lineaBajo}
							/>
							<p className="sr-only" aria-live="polite">
								{bolsa.lineaPlan}: {bolsa.totalTexto} {notaSr}
							</p>
						</>
					}
					abajo={
						<>
							<BotonPrincipal href={bolsa.href}>{bolsa.ctaLabel}</BotonPrincipal>
							<BotonSecundario href={enlace.href}>{enlace.label}</BotonSecundario>
						</>
					}
				/>
			</div>
		</MotionConfig>
	);
}
