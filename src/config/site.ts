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
		number: '51919283658', // solo dígitos, con código de país
		display: '+51 919 283 658',
	},

	email: 'comercial@girasol.pe',

	// Registro oficial de prestadores de servicios de certificación digital (ROPS) de INDECOPI; el mismo que enlaza girasol.pe.
	rops: 'https://www.gob.pe/59924-registro-oficial-de-prestadores-de-servicios-de-certificacion-digital-rops',

	// Entidad que emite los certificados y a cuyo nombre se vende (razón social y RUC confirmados).
	company: {
		legalName: 'GIRASOL PE S.C.R.L.',
		ruc: '20605042512',
	},

	/**
	 * Mensajes prellenados de WhatsApp, según lo que el cliente elige.
	 * Variables: {titular}, {vigencia}, {cantidad}, {total}. El combo no suma: da el precio de cada producto ({precioCertificado}, {precioFirmas}).
	 */
	whatsappMessages: {
		general: 'Hola, quiero información sobre la firma remota.',
		certificadoGeneral: 'Hola, quiero comprar un certificado digital para firma remota.',
		certificado: 'Hola, quiero comprar el certificado digital para {titular} con vigencia de {vigencia}.',
		certificadoTitular: 'Hola, quiero información sobre el certificado digital para {titular}.',
		firmas: 'Hola, quiero comprar una bolsa de {cantidad} firmas ({total} + IGV).',
		combo: 'Hola, quiero comprar el certificado digital para {titular} con vigencia de {vigencia} ({precioCertificado} + IGV) y una bolsa de {cantidad} firmas ({precioFirmas} + IGV).',
	},
} as const;

export type Site = typeof site;
