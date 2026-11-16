---
titulo: Política y Plan de Privacidad
tituloSeo: Política de privacidad
descripcion: 'Política y Plan de Privacidad de GIRASOL PE S.C.R.L. (V1.6): cómo se recogen, usan y protegen tus datos personales, y cómo ejercer tus derechos ARCO.'
actualizado: 2026-06-04
version: '1.6'
pdf: /legal/politica-y-plan-de-privacidad-v1.6.pdf
---

| | |
|---|---|
| Nombre del documento | Política y Plan de Privacidad |
| Realizado por | GIRASOL PE SCRL |
| Aprobado por | Responsable de la EC, TSA y ER |
| Código del documento | ECTSAER-POLPL-04062026 |
| Versión | 1.6 |
| Fecha | 04/06/2026 |

> PAGANO FAUSTINO GUILLERMO FOSHLEN Fecha: 04/07/2026 11:45 OU: Área-GERENCIA Firmado por Firmeasy.legal

## HISTORIAL DE VERSIÓN

| Versión | Fecha | Descripción |
|---|---|---|
| 1.0 | 01/12/2019 | Documento inicial |
| 1.1 | 01/01/2021 | Actualización del documento |
| 1.2 | 01/01/2022 | Actualización del documento |
| 1.3 | 20/10/2024 | Se actualiza el alcance del documento para Entidad de Certificación y Entidad de Registro. Se unifica el documento política y plan de privacidad. Se agrega la sección organización que administra la política. |
| 1.4 | 21/03/2025 | En la Sección 1.1 Presentación se agrega certificado de constitución sacs. |
| 1.5 | 04/03/2026 | Se agrega el alcance para el Servicio de Sello de Tiempo En la sección 1.1 Presentación se agrega el párrafo de qué GIRASOL está acreditado como TSA ante la Indecopi. En la sección 2 Participantes de la PKI se agrega a Autoridad de Sellado de Tiempo. En la sección 3 Definiciones y Acrónimos se agrega DPSVA, TSA y TSU, base de datos, datos personales, derechos ARCO En la sección 6 se agrega el DS 016-2024 JUS. En la sección 7.5 se agrega Derechos ARCO. |
| 1.6 | 04/06/2026 | Se actualiza el logo de la empresa en la carátula y los encabezados. |

## 1. INTRODUCCIÓN Y ALCANCE DEL SERVICIO

### 1.1 PRESENTACIÓN

GIRASOL PE SCRL a la que denominaremos "GIRASOL.PE", es una empresa peruana establecida en 2019, dedicada a brindar servicios de Gestión Documental, Trámite Documentario Electrónico, Seguridad Digital, Certificados Digitales y Firma Electrónica.

En el año 2020 GIRASOL.PE logró acreditarse como Entidad de Registro ante la Autoridad Administrativa Competente como Entidad de Registro para brindar a sus clientes servicios de registro o verificación, incluidos representantes legales, empleados o agentes automatizados.

En el año 2023 GIRASOL.PE logró acreditar su software de firma digital Firmeasy - Firma Digital versión 1.0 ante la Autoridad Administrativa Competente desde donde se puede firmar documentos PDF con validez jurídica.

En el año 2024 GIRASOL.PE logró acreditarse como Entidad de Certificación ante la Autoridad Administrativa Competente para proveer servicios de emisión, re-emisión y revocación de certificados digitales.

Los tipos de certificados digitales que proporciona GIRASOL.PE son:

**Certificados Digitales de Persona Natural**

- Para Persona Natural.
- Para Profesional Independiente
- Para Constitución Sacs

**Certificados digitales de Persona Jurídica.**

- Para Representante Legal
- Para Vinculación a una entidad
- Para Agente Automatizado
- Para Profesional vinculado a una entidad
- Para Facturación electrónica

En el año 2026 GIRASOL.PE logró acreditarse como Autoridad de Sellado de Tiempo ante la Autoridad Administrativa Competente para proveer servicios de Sellado de Tiempo.

GIRASOL.PE adecua sus servicios de certificación digital de acuerdo a las siguientes normativas:

- Guía de Acreditación de Entidades de Registro o Verificación, Entidad de Certificación Digital y Software de Firma Digital del INDECOPI.
- Ley 27269 - Ley de firmas y certificados digitales.
- Decreto Supremo N. 052 - 2008 - PCM Reglamento de la Ley de firmas y Certificados Digitales.
- ETSI EN 319 412-1 (Certificate Profiles; Part 1: Overview and common data structures).

La estructura de este documento está basada en la especificación del estándar RFC 3647- Internet X.509 Public Key Infrastructure: Certificate Policy and Certification Practices Framework.

### 1.2 OBJETIVO

Este documento tiene como objetivo la descripción de operaciones y prácticas de datos personales que utiliza GIRASOL.PE para la administración de sus servicios como Entidad de Certificación, Autoridad de Sellado de Tiempo y Entidad de Registro en el marco del cumplimiento de los requisitos de las "Guías de Acreditación de Entidades de Certificación Digital (EC), Servicio de Valor Añadido (SVA) y Entidad de Registro o Verificación (ER)” establecidas por INDECOPI.

### 1.3 OBJETO DE LA ACREDITACIÓN

El alcance de la acreditación cubre la infraestructura y procesos de los servicios de Entidad de Certificación y Entidad de Registro de GIRASOL.PE.

## 2. PARTICIPANTES DE LA PKI

### 2.1 ENTIDAD DE CERTIFICACIÓN (EC - GIRASOL.PE)

GIRASOL.PE, como entidad certificadora autorizada, es una entidad jurídica privada que proporciona los servicios de emisión, reemisión y revocación de certificados digitales.

Bajo esta DPC, GIRASOL.PE gestiona las siguientes jerarquías de EC:

- Autoridad de Certificación Raíz: Se denomina Autoridad de Certificación Raíz (CA Root) a la entidad dentro de la jerarquía que emite certificados a otras Autoridades de Certificación, y cuyo certificado de clave pública ha sido autofirmado.

Su función es firmar el certificado de las otras EC pertenecientes a la jerarquía de Certificación.

| | |
|---|---|
| CN | FirmEasy Root CA |
| VALIDEZ | Desde el 16 de octubre del 2024 hasta el 13 de octubre del 2039 |
| TIPO DE CLAVE | RSA 4096 bits - SHA256 |

- Autoridad de Certificación Subordinada: Se denomina Autoridad de Certificación Subordinada (CA Sub) a las Entidades dentro de la jerarquía de certificación que emiten certificados de usuario final y cuyo certificado de clave pública ha sido firmado digitalmente por la Autoridad de certificación Raíz.

Su función es emitir certificados a personas naturales y jurídicas, conforme a lo establecido en las Guías de Acreditación de Entidad de Certificación del INDECOPI.

| | |
|---|---|
| CN | FirmEasy SUBCA |
| VALIDEZ | Desde el 16 de octubre del 2024 hasta el 08 de octubre del 2039 |
| TIPO DE CLAVE | RSA 4096 bits - SHA256 |

### 2.2 AUTORIDAD DE SELLADO DE TIEMPO

GIRASOL.PE como Autoridad de Sellado de Tiempo es la persona jurídica privada que presta indistintamente servicios de emisión de sellados de tiempo.

Su función es certificar la fecha y hora exacta en que un documento digital fue creado, firmado o modificado.

| | |
|---|---|
| CN | FirmEasy TSA |
| VALIDEZ | Desde el 07 de noviembre del 2025 hasta el 06 de noviembre del 2032 |
| TIPO DE CLAVE | RSA 4096 bits - SHA256 |

### 2.3 ENTIDAD DE REGISTRO (GIRASOL.PE)

GIRASOL.PE presta los servicios de una entidad de registro que se encarga de verificar la identidad y los poderes de representación del solicitante, para acreditar la validez de la información proporcionada por el solicitante del certificado digital.

Podrán actuar como ER de GIRASOL:

- GIRASOL.PE directamente.
- Cualquier Entidad de Registro debidamente acreditada ante el INDECOPI que llegue a un acuerdo con GIRASOL.PE para la emisión de certificados a personas naturales o jurídicas.

### 2.4 TITULAR

Es la persona natural o jurídica cuyo nombre se expide en un certificado digital y por tanto actúa como responsable del mismo, con conocimiento y plena aceptación de los derechos y deberes establecidos y publicados en la DPC.

### 2.5 SUSCRIPTOR

Según IOFE, el suscriptor es responsable de utilizar la clave privada, que está específicamente vinculada a un documento electrónico que se firma digitalmente con su clave privada.

Si el titular del certificado digital es una persona natural, la responsabilidad del suscriptor recaerá sobre él. Si la persona jurídica es la titular del certificado digital, la responsabilidad del suscriptor correrá a cargo del representante legal designado por la entidad.

Si el certificado está diseñado para ser utilizado por un agente automatizado, la propiedad del certificado y la firma digital generada a partir del certificado corresponderá a la persona jurídica.

A tal efecto, la atribución de la responsabilidad del suscriptor corresponde a la misma persona jurídica.

### 2.6 SOLICITANTE

Se entenderá por solicitante a la persona natural o jurídica que haya obtenido un certificado emitido bajo esta DPC. Si se trata de un certificado de persona natural, puede coincidir con la identidad del titular.

### 2.7 TERCERO QUE CONFÍA

Son las personas jurídicas o naturales que deciden optar por el servicio de validación y de registro de la ER DE GIRASOL PE, así como los certificados digitales emitidos por la EC de GIRASOL.PE, el tercero que confía que requiere evaluar la validez de una transacción electrónica, un documento firmado brindado por la TSA de GIRASOL.

### 2.8 ENTIDAD A LA QUE SE ENCUENTRA VINCULADO EL TITULAR

En su caso, la persona jurídica u organización que tenga una relación cercana con el titular a través de la relación acreditada en el certificado.

## 3. DEFINICIONES Y ACRÓNIMOS

| | |
|---|---|
| Entidad de Certificación – EC: | Entidad que brinda la emisión, revocación, renovación, modificación y suspensión de servicios de certificados digitales en el marco de la normativa establecida por IOFE. |
| Entidad de Registro – ER: | Entidades que realizan el proceso de verificación de identidad de solicitantes de servicios de certificación digital. |
| Política de Certificación - PC: | Un conjunto de reglas que indican el marco de aplicabilidad del servicio para la comunidad de usuarios definida. |
| Certificado: | Archivo que asocia la clave pública con datos del suscriptor y es firmado por la EC. |
| Clave Pública: | Valor matemático conocido públicamente y usado para la verificación de una firma digital. |
| Clave Privada: | Valor matemático usado únicamente por el suscriptor para la creación de una firma digital. |
| Lista de Certificados Revocados - CRL: | Archivo que contiene una lista de los certificados que han sido revocados en una fecha y hora determinada y que es firmada por la EC. |
| Declaración de Prácticas de Certificación - DPC: | Conjunto de prácticas adoptadas por una Entidad de Certificación para la emisión, gestión, revocación y reemisión de certificados digitales. |
| FIPS | Federal Information Processing Standards (FIPS; en español, Estándares Federales de Procesamiento de la Información) son estándares anunciados públicamente desarrollados por el gobierno de los Estados Unidos para la utilización por parte de todas las agencias del gobierno no militares y por los contratistas del gobierno. |
| Firma Digital: | Resultado de la transformación de un mensaje, o cualquier tipo de datos, por la aplicación de la clave privada en conjunción con unos algoritmos conocidos, garantizando de esta manera: a)que los datos no han sido modificados(integridad);<br>b)que la persona que firma los datos es quien dice ser (identificación); y<br>c) que la persona que firma los datos no puede negar haberlo hecho. |
| HASH | Operación que se realiza sobre un conjunto de datos de cualquier tamaño, de forma que el resultado obtenido es otro conjunto de datos de tamaño fijo, independientemente del tamaño original, y que tiene la propiedad de estar asociado unívocamente a los datos iniciales. |
| HSM: | Dispositivo Hardware que genera y protege claves criptográficas, y permite utilizarlas para realizar operaciones criptográficas de modo seguro. |
| OID: | Identificador numérico único registrado bajo la estandarización ISO y que se refiere a un objeto o clase de objeto determinado. |
| PKI | Conjunto de hardware, software, recursos humanos, procedimientos, etc, que componen un sistema usado para la creación y gestión de certificados de clave pública. |
| Suscriptor | Persona natural o jurídica a cuyo nombre se expide un certificado digital. |
| Titular: | Una entidad que requiere los servicios provistos por la EC y acepta los términos y condiciones del servicio descrito en este documento. |
| Tercero que confía: | Una persona que recibe documentos, registros o notificaciones firmados digitalmente y cree en la validez de las transacciones realizadas. |
| DPSVA | Declaración de Prácticas de Servicios de Valor Añadido |
| TSA | Autoridad de Sellado de Tiempo |
| TSU | Unidad de Sellado de Tiempo |
| Base de datos | Conjunto organizado de datos personales que son objeto de tratamiento. |
| Datos personales | Se entiende como datos personales a toda aquella información numérica, alfabética, gráfica, fotográfica, acústica sobre hábitos personales o de cualquier tipo concerniente a las personas naturales que las identifica o las hace identificables a través de medios que pueden ser razonablemente utilizados. |
| Derechos ARCO | Derecho que tiene toda persona de conocer, actualizar y rectificar la información que se haya recogido sobre ella en archivos y bancos de datos de naturaleza pública o privada. |

## 4. ALCANCE

La presente política es de cumplimiento obligatorio para el personal y terceros subcontratados por GIRASOL.PE, quienes participen de las operaciones críticas de los servicios de Entidad de Certificación, Autoridad de Sellado de Tiempo y Entidad de Registro conforme a las responsabilidades especificadas en las siguientes secciones.

## 5. RESPONSABILIDADES

Las responsabilidades contractuales, garantías financieras y coberturas de seguro son brindadas por GIRASOL.PE de acuerdo con su Declaración de Prácticas de EC, TSA y ER. Los solicitantes, suscriptores, terceros que confían o el público en general indicarán su consulta con respecto a los servicios de certificación digital ofrecidos por GIRASOL.PE enviando un correo electrónico a la siguiente dirección soporte@girasolpe.com

Las peticiones, quejas o reclamos serán registradas en nuestra plataforma de incidencias y atendidas por parte del personal responsable de GIRASOL.PE. El usuario recibirá un mensaje de correo electrónico confirmando la recepción de la petición, queja o reclamo y cuando ésta sea resuelta.

## 6. POLÍTICA DE PRIVACIDAD

GIRASOL.PE garantiza la protección de datos personales de los suscriptores y titulares de los servicios en cumplimiento de la ley de protección de datos personales (Ley N ° 29733, Norma Marco de Privacidad, su Reglamento aprobado por el Decreto Supremo N° 016-2024-JUS) y las "Guías de Acreditación de Entidades de Certificación Digital (EC), Guía de Acreditación de Servicios de Valor Añadido (SVA) y Entidad de Registro o Verificación (ER)” establecidas por INDECOPI.

GIRASOL.PE recoge información de acuerdo a las solicitudes que realiza el titular/suscriptor a través de su ER previa verificación de la información proporcionada de las mismas.

Serán considerados como datos personales, la información de nombres, dirección, correo electrónico, y toda información que pueda vincularse a la identidad de una persona natural o jurídica, contenidos en los contratos y solicitudes de los suscriptores y titulares. Esta información será considerada como confidencial y será de uso exclusivo para las operaciones de registro, a excepción que exista un previo consentimiento del titular de dichos datos o medie una orden judicial o administrativa que así lo determine.

Con este fin, se implementará un Plan de Privacidad con controles para la protección contra divulgación y uso no autorizado. Es responsabilidad de los suscriptores garantizar que la información provista a GIRASOL.PE sea veraz y vigente. Asimismo, son responsables del perjuicio que pudieran causar por aportar datos falsos, incompletos o inexactos.

## 7. PLAN DE PRIVACIDAD DE DATOS PERSONALES

### 7.1 RECOLECCIÓN DE INFORMACIÓN PERSONAL

#### 7.1.1 Finalidad de la recolección

GIRASOL.PE recaba y almacena los datos personales únicamente para los siguientes fines:

- Probar la identidad de un individuo antes de que se le emita un certificado digital.
- La publicación de información en un certificado digital sobre un individuo para el acceso por una comunidad de personas que pueden confiar en el certificado.
- Archivo de información para apoyar la confirmación anterior de un certificado digital y validez de la firma.
- Administración de organización de las operaciones, tales como la comunicación con el certificado de suscriptores y facturación de los servicios.

#### 7.1.2 Información que debe recolectarse

Solo se obtiene información de terceros con el conocimiento y consentimiento de la persona afectada. En todos los casos, la siguiente distinción se aplicará para el tratamiento de los datos personales:

- La información básica necesaria para la producción de un certificado de clave pública, para la verificación de una firma digital, para la validación de estado de un certificado, así como para la información que se produce como resultado de dicha verificación y validación.
- Información de identificación: Esta información incluye todos los datos obtenidos o presentados para identificar positivamente una entidad y proporcionar los servicios de certificación solicitados por ella.
- La Información de identificación será procesada de forma segura de acuerdo con esta Política y Plan de privacidad.

### 7.2 PRECISIÓN DE LA INFORMACIÓN

#### 7.2.1 Datos del sujeto

Es responsabilidad del titular de los datos, asegurar que cualquier información que proporcionan a GIRASOL.PE o a un tercero autorizado es exacta. Si esta información cambia posteriormente, es obligación del interesado informar con prontitud. Si el interesado tiene conocimiento de la inexactitud de los datos personales en poder de ellos, es su responsabilidad comunicar a la entidad que procesa sus datos personales.

#### 7.2.2 Funciones de proveedor de servicios de certificación

GIRASOL.PE tomará las medidas razonables en el momento de la recogida para garantizar que los datos personales que recogen provienen de una fuente auténtica.

### 7.3 ALMACENAMIENTO DE LA INFORMACIÓN DE LA IDENTIDAD

Toda la información de identificación será archivada por GIRASOL.PE. Este almacenamiento se llevará a cabo durante un periodo de 10 años a partir de la fecha de expiración del certificado. La Información de identificación se mantiene durante este periodo para proporcionar evidencia en el caso de una impugnación de la validez de un certificado o una firma digital. Dicho plazo podrá ser ampliado con respecto a los registros e información específicos a petición del interesado conforme a servicios especiales. En todos los casos, los registros pueden archivarse en papel o en formato electrónico.

### 7.4 INSCRIPCIÓN DE BANCOS DE DATOS PERSONALES

Los Bancos de Datos de GIRASOL.PE cumplen con la exigencia legal de estar inscritos en el Registro Nacional de Protección de Datos Personales (RNPDP).

### 7.5 DERECHOS ARCO

GIRASOL.PE pone en conocimiento que, en cualquier momento, los titulares de los datos personales o sus representantes legales podrán ejercer sus derechos de información, acceso, rectificación, cancelación y oposición de sus datos, de acuerdo a lo dispuesto por la Ley N° 29733, Ley de Protección de Datos Personales vigente y su reglamento, efectuando su solicitud vía correo electrónico a soporte@girasolpe.com. Asimismo, el titular de los datos personales deberá acreditar su identidad presentando una copia de su DNI o un documento equivalente. En caso de que el ejercicio de los derechos sea realizado por un representante, adicionalmente se deberá presentar el título que acredite dicha representación. Si consideras que no hemos atendido adecuadamente tus derechos ARCO, puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos Personales.

## 8. RESPONSABILIDADES

El Oficial de Seguridad y Datos Personales de GIRASOL.PE gestiona la implementación y vela por el cumplimiento de la presente política, así como de su revisión periódica, actualización, difusión y concientización y capacitación al personal y terceros para su adecuado cumplimiento.

## 9. ORGANIZACIÓN QUE ADMINISTRA LA POLÍTICA Y PLAN DE PRIVACIDAD DE DATOS PERSONALES

### 9.1 ORGANIZACIÓN RESPONSABLE

GIRASOL.PE administra los documentos de Declaración de Prácticas de EC, TSA Y ER, Política de Certificación, Política de Seguridad, Política y Plan de Privacidad y todos los documentos normativos de la EC, TSA Y ER de GIRASOL.PE.

### 9.2 PERSONA DE CONTACTO

| | |
|---|---|
| ORGANIZACIÓN RESPONSABLE | GIRASOL PE SCRL |
| PERSONA DE CONTACTO | Responsable de la Entidad de Certificación, Autoridad de Sellado de Tiempo y Entidad de Registro |
| CORREO ELECTRÓNICO | soporte@girasolpe.com |
| DIRECCIÓN | Jr. Túpac Yupanqui Nro. 143 Amarilis - Huánuco - Perú |
| TELÉFONO | +51 987 592 655 |
| PÁGINA WEB | www.girasol.pe |

### 9.3 FRECUENCIA DE REVISIÓN

Esta política y plan de privacidad así como todos los documentos normativos serán revisados y, si procede, actualizados de manera anual.

### 9.4 PROCEDIMIENTO DE APROBACIÓN

Esta política y plan de privacidad así como todos los documentos normativos son aprobados y firmados por el Responsable de la Entidad de Certificación, Autoridad de Sellado de Tiempo y Entidad de Registro antes de ser publicadas. Las nuevas versiones aprobadas de esta política así como todos los documentos normativos serán enviadas al INDECOPI y publicadas en la página web de GIRASOL.PE www.girasol.pe Los cambios realizados serán registrados en la tabla de “Historial de Versión”, a fin de evitar modificaciones y suplantaciones no autorizadas.

## 10. CONFORMIDAD

Esta Política y Plan de Privacidad ha sido aprobada por el Responsable de la EC, TSA y ER. Cada vez que se genere un cambio en este documento, se procederá a informar previamente a INDECOPI y al dar conformidad, será publicada en nuestra página web.

## 11. BIBLIOGRAFÍA

- Ley N° 27269, Ley de Firmas y Certificados Digitales.
- Ley de Protección de Datos Personales – Ley N.º 29733, su Reglamento aprobado por el Decreto Supremo N° 016-2024-JUS
- Reglamento de la Ley de Firmas y Certificados Digitales aprobado mediante el Decreto Supremo N° 052-2008-PCM, y sus modificatorias.
- Decreto Supremo N° 070-2011-PCM.
- Decreto Supremo N° 105-2012-PCM.
- Guía de Acreditación de Entidad de Certificación Digital - INDECOPI.
- Guía de Acreditación de Servicio de Valor Añadido - INDECOPI
- Guía de Acreditación de Entidad de Registro - INDECOPI
