import { site } from '@/config/site';

/**
 * Textos de secciones que se repiten en varias páginas (inicio, certificado-digital y firmas).
 * Viven aquí para que no se desincronicen; las secciones los reciben por props (constitución §4).
 */

export const notaAtencion = 'Te atiende un asesor por WhatsApp · Precios no incluyen IGV';

export const necesitasLosDos = {
	id: 'necesitas-los-dos',
	etiqueta: 'Para firmar',
	titulo: 'Necesitas',
	acento: 'los dos.',
	texto: 'Con certificado y sin firmas no puedes firmar. Con firmas y sin certificado, tampoco.',
	ecuacion: { a: 'Certificado digital', b: 'Firmas', etiquetaResultado: 'Resultado', resultado: 'Puedes firmar' },
} as const;

export const comoFunciona = {
	id: 'como-funciona',
	etiqueta: 'Cómo funciona',
	titulo: 'Tres pasos y',
	acento: 'firmas.',
	pasos: [
		{ titulo: 'Hablas con un asesor', texto: 'Nos escribes por WhatsApp y un asesor te ayuda a elegir tu certificado y tus firmas.', ilustracion: 'chat' },
		{ titulo: 'Recibes tu acceso', texto: 'Te damos un usuario y una contraseña. No hay nada que descargar ni instalar.', ilustracion: 'acceso' },
		{ titulo: 'Firmas', texto: 'Ingresas tu PIN y confirmas con el código que llega a tu WhatsApp.', ilustracion: 'firma' },
	],
} as const;

export const preguntas = {
	id: 'preguntas',
	etiqueta: 'Preguntas frecuentes',
	titulo: 'Lo que más',
	acento: 'nos preguntan.',
	intro: '¿Te queda alguna duda? Escríbenos por WhatsApp.',
} as const;

export const ctaCierre = {
	id: 'empezar',
	titulo: 'Empieza a firmar',
	acento: 'desde la nube.',
	texto: 'Escríbenos y te ayudamos a elegir tu certificado y tus firmas.',
	ctaLabel: 'Comprar',
	ctaSecundarioLabel: 'Escríbenos por WhatsApp',
} as const;

/** Respaldo: acreditación ante INDECOPI de la entidad que emite los certificados (spec 007). */
export const acreditacion = {
	id: 'respaldo',
	etiqueta: 'Respaldo',
	titulo: 'Firma con',
	acento: 'validez legal.',
	intro: `Los certificados los emite ${site.company.legalName}, Entidad de Certificación acreditada ante INDECOPI, conforme a la Ley N.° 27269, Ley de Firmas y Certificados Digitales, y su Reglamento (D.S. N.° 052-2008-PCM).`,
	hitos: [
		{ anio: '2020', texto: 'Entidad de Registro acreditada ante INDECOPI' },
		{ anio: '2023', texto: 'Software de firma Firmeasy acreditado' },
		{ anio: '2024', texto: 'Entidad de Certificación acreditada ante INDECOPI' },
	],
	sello: { texto: 'Acreditada ante INDECOPI · ', titulo: 'Entidad de Certificación', subtitulo: 'Acreditada ante INDECOPI' },
} as const;

/** Medios de pago (spec 007). Solo nombres en texto: no hay logos ni permiso de uso. */
export const mediosPago = {
	texto: 'Pagas como prefieras: trabajamos con el BCP y aceptamos tarjetas de crédito y débito. También puedes pagar en línea con Izipay, Culqi o Yape.',
	medios: ['BCP', 'Tarjeta de crédito', 'Tarjeta de débito', 'Izipay', 'Culqi', 'Yape'],
} as const;

/** Páginas por titular (spec 008). */
export const planesTitular = {
	id: 'planes',
	etiqueta: 'Planes',
	titulo: 'Elige tu',
	acento: 'vigencia.',
	ctaLabel: 'Comprar',
	masElegido: 'Más elegido',
} as const;

export const normativa = {
	id: 'normativa',
	titulo: 'Cumplimos con las',
	acento: 'normativas peruanas.',
	intro: 'Tu certificado está respaldado por nuestra infraestructura como Entidad de Certificación (EC) y Entidad de Registro (ER) acreditada por INDECOPI.',
	enlaceLabel: 'Verifica nuestra acreditación en INDECOPI',
} as const;

export const antesDeComprar = {
	id: 'antes-de-comprar',
	etiqueta: 'Antes de comprar',
	titulo: 'Compra con',
	acento: 'tranquilidad.',
	intro: 'Cómo pagas, cuándo lo recibes y qué pasa si cambias de opinión.',
	pagosTitulo: 'Pago',
	respaldo: {
		titulo: 'Respaldo legal',
		intro: 'Estamos acreditados por INDECOPI:',
		items: ['Entidad de Certificación', 'Entidad de Registro'],
		ley: 'Conforme a la Ley N.° 27269, Ley de Firmas y Certificados Digitales.',
		enlaceLabel: 'Lista de Confianza de INDECOPI',
	},
} as const;

export const verPlanes = 'Ver planes';
export const escribenos = 'Escríbenos por WhatsApp';
