/**
 * Franja "Compra los dos" (spec 010): suma el plan y la bolsa que el visitante tiene elegidos en las dos tarjetas
 * (estado compartido en src/lib/seleccion-productos.ts) y abre WhatsApp con un mensaje que incluye los dos.
 * - Se renderiza en el servidor con la combinación inicial (primer plan + primera bolsa): sin JS se ve completa.
 * - No importa site.ts: la plantilla del mensaje y la URL base llegan por props.
 */
import { MotionConfig } from 'motion/react';
import { buttonVariants } from '@/components/ui/button';
import { Flecha } from '@/components/islands/productos-layout';
import { formatCantidad, rellenar } from '@/lib/format';
import { useSeleccion } from '@/lib/seleccion-productos';

export interface PlanConjunto {
	/** Mismo id que `PlanCertificado.id`. */
	id: string;
	/** "persona natural" */
	titular: string;
	/** "1 año" */
	vigencia: string;
	/** Precio ya formateado: "US$ 20.00". */
	precioTexto: string;
	/** "Certificado persona natural · 1 año" */
	resumen: string;
}

export interface BolsaConjunta {
	/** Mismo id que `BolsaFirmas.id` (la cantidad). */
	id: string;
	cantidad: number;
	/** Precio ya formateado: "US$ 10.00". */
	precioTexto: string;
	/** "Bolsa de 10 firmas" */
	resumen: string;
	/** "bolsa de 10 firmas": para el anuncio a lectores de pantalla. */
	resumenSr: string;
}

export interface PropsCompraConjunta {
	titulo: string;
	planes: PlanConjunto[];
	bolsas: BolsaConjunta[];
	/** "+": une los dos resúmenes. */
	union: string;
	ctaLabel: string;
	/** Anuncio a lectores de pantalla: "{plan} y {bolsa}". */
	anuncio: string;
	/** Plantilla del mensaje de WhatsApp (site.whatsappMessages.combo). */
	plantilla: string;
	/** "https://wa.me/<número>?text=" */
	urlBase: string;
}

export default function CompraConjunta(props: PropsCompraConjunta) {
	const { titulo, planes, bolsas, union, ctaLabel, anuncio, plantilla, urlBase } = props;
	const sel = useSeleccion();
	const plan = planes.find((p) => p.id === sel.planId) ?? planes[0]!;
	const bolsa = bolsas.find((b) => b.id === sel.bolsaId) ?? bolsas[0]!;

	const mensaje = rellenar(plantilla, {
		titular: plan.titular,
		vigencia: plan.vigencia,
		cantidad: formatCantidad(bolsa.cantidad),
		precioCertificado: plan.precioTexto,
		precioFirmas: bolsa.precioTexto,
	});
	const href = `${urlBase}${encodeURIComponent(mensaje)}`;

	return (
		<MotionConfig reducedMotion="user">
			<div className="flex flex-col gap-6 rounded-fr-card border border-fr-line bg-fr-sheet p-6 shadow-fr-sheet sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10">
				<div className="min-w-0">
					<h3 className="m-0 text-lg font-bold text-fr-navy">{titulo}</h3>
					<p className="mt-1.5 mb-0 text-sm text-fr-muted">
						{plan.resumen} {union} {bolsa.resumen}
					</p>
				</div>

				<div className="flex flex-col lg:shrink-0">
					<a href={href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: 'w-full lg:w-auto' })}>
						{ctaLabel}
						<Flecha />
					</a>
				</div>

				<p className="sr-only" aria-live="polite">
					{rellenar(anuncio, { plan: plan.resumen, bolsa: bolsa.resumenSr })}
				</p>
			</div>
		</MotionConfig>
	);
}
