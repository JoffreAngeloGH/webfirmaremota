# Pendientes por confirmar

> Actualizado: 2026-11-16

Datos que la web usa con un **placeholder** o que aún no tienen respuesta. Mientras quede alguno en `Pendiente`, el sitio es una **versión de presentación** y no se publica como definitiva (constitución §5.1).

**Cómo usar esta lista**
- Cada dato tiene un ID (`P01`, `P02`…). En el código, el placeholder lleva un comentario con ese ID (`// PENDIENTE: P15`) para encontrarlo rápido.
- Al confirmar un dato: se reemplaza el placeholder, se cambia el estado a `Confirmado`, se anota la respuesta y la fecha.
- Los IDs no se reutilizan.

---

## Productos y precios

| ID | Qué falta | Placeholder en la web | Estado |
|---|---|---|---|
| P01 | Precio real del certificado por tipo (natural / jurídica) y por vigencia (1, 2, 3 años) | **US$ 20.00** en los 6 planes | Pendiente |
| P02 | Bolsas de firmas adicionales: cantidades y precio de cada una | Solo la bolsa mínima: **10 firmas, US$ 10.00** | Pendiente |
| P03 | ¿Se cobra solo en dólares o también en soles? | Solo dólares | Pendiente |
| P04 | ¿Qué cuenta como "una firma"? ¿Un documento, o cada firma aunque haya varias en un mismo documento? | No se menciona | Pendiente |
| P05 | ¿Qué formatos se pueden firmar? (PDF, XML, Word…) | "Documentos PDF" | Pendiente |
| P06 | Medios de pago que se ofrecen por WhatsApp (transferencia, Yape, Plin, tarjeta…) | No se menciona | Pendiente |

## Proceso de compra y entrega

| ID | Qué falta | Placeholder en la web | Estado |
|---|---|---|---|
| P07 | Requisitos para comprar el certificado de **persona natural** | Lista genérica marcada como ejemplo (DNI, correo, celular con WhatsApp) | Pendiente |
| P08 | Requisitos para comprar el certificado de **persona jurídica** | Lista genérica marcada como ejemplo (RUC, DNI del representante, vigencia de poder) | Pendiente |
| P09 | Tiempo desde el pago hasta recibir usuario y contraseña | "En poco tiempo" (sin plazo concreto) | Pendiente |
| P10 | Mensajes prellenados de WhatsApp para cada producto | Textos propuestos en `site.ts` | Pendiente |

## Legal y confianza

| ID | Qué falta | Placeholder en la web | Estado |
|---|---|---|---|
| P11 | Base legal que se cita: Ley N.° 27269 (Ley de Firmas y Certificados Digitales) y su reglamento (D.S. N.° 052-2008-PCM). Confirmar que aplica y cómo redactarlo | Mención a la ley con el texto marcado para revisión | Pendiente |
| P12 | Acreditación ante INDECOPI: qué entidad emite el certificado, en qué registro figura y si se puede mostrar su logo | "Entidad acreditada ante INDECOPI" sin número de registro | Pendiente |
| P13 | Razón social y RUC que se muestran en el pie y en el schema `Organization` | `RAZÓN SOCIAL S.A.C.` · RUC `20XXXXXXXXX` | Pendiente |
| P14 | ¿Se menciona a Girasol? ¿Con logo? ("Un producto de Girasol") | "Un producto de Girasol", sin logo | Pendiente |
| P15 | Términos y condiciones | Página con texto de ejemplo | Pendiente |
| P16 | Política de privacidad (Ley N.° 29733) | Página con texto de ejemplo | Pendiente |

## Contacto y marca

| ID | Qué falta | Placeholder en la web | Estado |
|---|---|---|---|
| P17 | Número de WhatsApp de ventas | `+51 999 999 999` | Pendiente |
| P18 | Correo de contacto y redes sociales (si las hay) | No se muestran | Pendiente |
| P19 | Logo y favicon de firmaremota.pe | Logotipo de texto "firmaremota.pe" | Pendiente |

## Decisiones de diseño

| ID | Qué falta | Mientras tanto | Estado |
|---|---|---|---|
| P20 | Aprobar que el botón "Comprar" (que va a WhatsApp) use el **botón primario azul** con ícono de WhatsApp, como excepción a la regla de Girasol de que WhatsApp es secundario | Se usa el primario azul | **Confirmado** (2026-11-16, al aprobar el spec 003) |
| P21 | Contraste AA del color `action` (#4489E8): texto blanco sobre el botón primario (~3.5:1), badges y eyebrows en `action` sobre fondos claros (~3.1–3.3:1). AA pide 4.5:1. Es del design system de Girasol: decidir con quien lo mantiene (oscurecer `action` para texto, o usar `navy` en badges y eyebrows) | **Resuelto en firmaremota.pe** con el azul tinta propio (spec 002). Queda abierto solo para la skill de Girasol | Pendiente (Girasol) |

---

## Confirmados

| ID | Dato | Respuesta | Fecha |
|---|---|---|---|
| — | Dominio | `firmaremota.pe` | 2026-11-16 |
| — | Vigencias del certificado | 1, 2 y 3 años, para persona natural y jurídica | 2026-11-16 |
| — | IGV | Los precios incluyen IGV; se indica de forma discreta pero visible | 2026-11-16 |
| — | Vencimiento de las firmas | Las firmas no vencen | 2026-11-16 |
| — | Bolsa mínima de firmas | 10 firmas | 2026-11-16 |
| — | Plataforma de firma | No forma parte de esta web: no hay login ni botón "Ingresar" | 2026-11-16 |
