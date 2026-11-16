/**
 * Datos globales del sitio (constitución §5).
 * Los valores con `PENDIENTE: Pxx` son placeholders registrados en specs/pendientes.md (§5.1).
 */

export const site = {
	name: 'firmaremota.pe',
	url: 'https://firmaremota.pe',
	lang: 'es-PE',
	locale: 'es_PE',
	titleTemplate: '%s | firmaremota.pe',
	defaultTitle: 'Firma remota: firma digital en la nube',
	defaultDescription:
		'Firma tus documentos desde la nube, sin descargar ni instalar nada. Certificado digital y firmas para persona natural y jurídica.',
	ogImage: '/og/default.png', // PENDIENTE: P19 (imagen provisional, sin logo)

	whatsapp: {
		number: '51999999999', // PENDIENTE: P17 (solo dígitos, con código de país)
		display: '+51 999 999 999', // PENDIENTE: P17
	},

	company: {
		legalName: 'RAZÓN SOCIAL S.A.C.', // PENDIENTE: P13
		ruc: '20XXXXXXXXX', // PENDIENTE: P13
	},

	parent: {
		name: 'Girasol',
		url: 'https://girasol.pe',
		tagline: 'Un producto de Girasol', // PENDIENTE: P14 (¿se menciona? ¿con logo?)
	},

	/**
	 * Mensajes prellenados de WhatsApp. // PENDIENTE: P10
	 * Variables: {titular}, {vigencia}, {cantidad}.
	 */
	whatsappMessages: {
		general: 'Hola, quiero información sobre la firma remota.',
		certificadoGeneral: 'Hola, quiero comprar un certificado digital para firma remota.',
		certificado: 'Hola, quiero comprar el certificado digital para {titular} con vigencia de {vigencia}.',
		firmas: 'Hola, quiero comprar una bolsa de {cantidad} firmas.',
	},
} as const;

export type Site = typeof site;
