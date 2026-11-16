/**
 * Textos de secciones que se repiten en varias páginas (inicio, certificado-digital y firmas).
 * Viven aquí para que no se desincronicen; las secciones los reciben por props (constitución §4).
 */

export const notaAtencion = 'Te atiende un asesor por WhatsApp · Precios con IGV incluido';

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
