# Pendientes por confirmar

> Actualizado: 2026-11-16 (respuestas del usuario a P01–P25, aplicadas en el código con los specs 007 y 008)

Datos que la web usa con un **placeholder** o que aún no tienen respuesta. Mientras quede alguno en `Pendiente`, el sitio es una **versión de presentación** y no se publica como definitiva (constitución §5.1).

**Cómo usar esta lista**
- Cada dato tiene un ID (`P01`, `P02`…). En el código, el placeholder lleva un comentario con ese ID (`// PENDIENTE: P15`) para encontrarlo rápido.
- Al confirmar un dato: se reemplaza el placeholder, se cambia el estado a `Confirmado`, se anota la respuesta y la fecha.
- Los IDs no se reutilizan.

---

## Pendientes

| ID | Qué falta | Placeholder en la web | Estado |
|---|---|---|---|
| P19 | Logo y favicon de firmaremota.pe | Logotipo de texto "firma*remota*•pe" y favicon provisional | Pendiente (el usuario aún no tiene logo) |
| P22 | Archivo del logo de INDECOPI para mostrar junto a la acreditación (P12 permite mostrarlo) | Sello de texto "Entidad de Certificación acreditada ante INDECOPI", sin logo | Pendiente (cuando el usuario pase el archivo) |
| P21 | Contraste AA del color `action` de Girasol (#4489E8) | Resuelto en firmaremota.pe con el azul tinta (spec 002) | Abierto solo para el design system de Girasol; el usuario lo tiene en cuenta |

---

## Confirmados

Aplicados en el código con el **spec 007** (2026-11-16). En el código ya no queda ningún placeholder de estos datos: `pnpm pendientes` lista solo P19.

### Productos y precios

| ID | Respuesta del usuario (2026-11-16) |
|---|---|
| P01 | Certificado de **1 año: US$ 20.00** y de **2 años: US$ 34.00**, iguales para persona natural y jurídica. **No hay plan de 3 años**: se quita de toda la web. **Aplicado en el código (spec 007).** |
| P02 | Bolsas de firmas: **10 a US$ 1.00 c/u** (mínima) · **50 a US$ 1.00** · **100 a US$ 0.95** · **500 a US$ 0.90** · **1 000 a US$ 0.85** · **5 000 a US$ 0.75** · **10 000 a US$ 0.65** · **20 000 a US$ 0.50**. El total de cada bolsa es cantidad × precio unitario. **Aplicado en el código (spec 007).** |
| P03 | Todo en **dólares**. **Aplicado en el código (spec 007).** |
| P04 | Cada firma se descuenta al usarse: **un documento con 3 firmas gasta 3 firmas**. **Aplicado en el código (spec 007).** |
| P05 | Depende del certificado. **Persona natural:** firma a tu nombre contratos, solicitudes y cualquier documento PDF, con validez legal. **Persona jurídica (y vinculado a empresa):** firma contratos, actas y documentos legales como persona jurídica, con plena validez legal ante entidades públicas y privadas. **Aplicado en el código (spec 007).** |
| P06 | Pago: trabajamos con el **BCP** y aceptamos **tarjetas de crédito y débito**. También se puede pagar en línea con **Izipay, Culqi o Yape**. **Aplicado en el código (spec 007).** |

### Proceso de compra y entrega

| ID | Respuesta del usuario (2026-11-16) |
|---|---|
| P07 | Requisitos **persona natural**. Introducción: "Prepara estos documentos antes de iniciar tu flujo de validación en línea. Es un proceso rápido, diseñado para completarse en minutos." Ítems: **DNI y/o CE vigente** (ambas caras) · **Contrato** (leer antes de la validación) · **Validación de identidad**. **Aplicado en el código (spec 007).** |
| P08 | Requisitos **persona jurídica** (misma introducción). Ítems: **DNI y/o CE vigente** (ambas caras) · **Validación de RUC en SUNAT** (si no cumple, adjuntar Ficha RUC QR de máximo 15 días) · **Vigencia de poder** (antigüedad menor a 90 días) · **Contrato** (leer antes de la validación) · **Lista de suscriptores** (firmada por el representante legal; **solo si es vinculado a empresa**) · **Validación de identidad**. **Aplicado en el código (spec 007).** |
| P09 | **Corregido el 2026-11-16:** la entrega es **aproximadamente 1 hora después de completar la solicitud y la validación de identidad** (como en girasol.pe), siempre después de la conversación con el asesor. Antes decía "inmediata" (spec 007). **Corregido en el código (spec 008).** |
| P23 | **Política de devolución** (confirmada el 2026-11-16, igual que Girasol): solicitud dentro de **5 días hábiles** y sin haber descargado el certificado; **100 %** si no se validó la identidad y **80 %** si ya se validó (el 20 % cubre costos administrativos); reembolso en hasta **15 días hábiles** desde la aprobación. **Aplicado en el código (spec 008).** |
| P10 | Los mensajes de WhatsApp se arman **según lo que el cliente selecciona** (titular y vigencia, o bolsa). Se mantiene el sistema actual de mensajes dinámicos. **Aplicado en el código (spec 007).** |

### Legal y confianza

| ID | Respuesta del usuario (2026-11-16) |
|---|---|
| P11 | La base legal **aplica**. Se cita así (respaldado por la *Política y Plan de Privacidad V1.6* de Girasol): Ley N.° 27269, Ley de Firmas y Certificados Digitales, y su Reglamento, D.S. N.° 052-2008-PCM. **Aplicado en el código (spec 007).** |
| P12 | Se puede **mencionar y mostrar** la acreditación. Según la Política V1.6: GIRASOL PE S.C.R.L. es **Entidad de Certificación acreditada ante INDECOPI** (2024), **Entidad de Registro** (2020) y su software de firma **Firmeasy** está acreditado (2023). El logo queda pendiente del archivo (**P22**). **Aplicado en el código (spec 007).** |
| P13 | **GIRASOL PE S.C.R.L.** · RUC **20605042512**. **Aplicado en el código (spec 007).** |
| P14 | Mencionar a Girasol **solo lo necesario**: razón social, RUC, acreditación y textos legales. Nada de "Un producto de Girasol" destacado. **Aplicado en el código (spec 007).** |
| P15 | Términos y condiciones: **exactamente los de https://girasol.pe/terminos/** (15 secciones, actualizados el 27 de abril de 2026). **Aplicado en el código (spec 007).** |
| P16 | Política de privacidad: **la Política y Plan de Privacidad V1.6 de Girasol** (PDF entregado por el usuario). Se publica como texto en la página y como PDF descargable. **Aplicado en el código (spec 007).** |
| P24 | **Validez para SIGM y Contraloría** (confirmado el 2026-11-16): las páginas por titular mencionan, como en girasol.pe, que el certificado sirve para el registro de garantías mobiliarias (SIGM) y para las declaraciones juradas de Contraloría (persona natural). **Aplicado en el código (spec 008).** |
| P25 | **Enlace al registro de prestadores de INDECOPI (ROPS)** (confirmado el 2026-11-16): se enlaza el mismo registro oficial que usa girasol.pe, para comprobar la acreditación. **Aplicado en el código (spec 008).** |

### Contacto y marca

| ID | Respuesta del usuario (2026-11-16) |
|---|---|
| P17 | WhatsApp de ventas: **+51 919 283 658** (`wa.me/51919283658`). **Aplicado en el código (spec 007).** |
| P18 | Correo de contacto: **comercial@girasol.pe**. Redes sociales: ninguna por ahora. **Aplicado en el código (spec 007).** |

### Decisiones de diseño

| ID | Respuesta |
|---|---|
| P20 | Botón "Comprar" en azul primario: **confirmado**. **Aplicado en el código (spec 007).** |

### Confirmados antes

| Dato | Respuesta | Fecha |
|---|---|---|
| Dominio | `firmaremota.pe` | 2026-11-16 |
| Vigencias del certificado | **1 y 2 años** (el plan de 3 años se quitó el 2026-11-16), para persona natural y jurídica | 2026-11-16 |
| IGV | **Corregido el 2026-11-16: los precios NO incluyen IGV.** Se muestra el precio base con "+ IGV", en todos los productos (certificados y bolsas), sin calcular el total; el total lo da el asesor. Antes decía "incluyen IGV". **Aplicado en el código (spec 009).** | 2026-11-16 |
| Vencimiento de las firmas | Las firmas no vencen | 2026-11-16 |
| Bolsa mínima de firmas | 10 firmas | 2026-11-16 |
| Plataforma de firma | No forma parte de esta web: no hay login ni botón "Ingresar" | 2026-11-16 |
