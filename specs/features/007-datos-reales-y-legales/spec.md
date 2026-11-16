# [007] Datos reales, bolsas por volumen, confianza y páginas legales

> Estado: `en-curso` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Aprobado por el usuario el 2026-11-16. Las decisiones salen de sus respuestas a P01–P21, registradas en `specs/pendientes.md`: sin plan de 3 años; "vinculado a empresa" dentro de jurídica; acreditación como texto, sin logo por ahora; privacidad como texto + PDF; bolsas con selector + tabla. Se ejecuta en la PC de casa.
> Constitución: v0.3.2 · Depende de: 006 (implementado)
> Lo implementa otra sesión. Este spec trae todo lo necesario: no hace falta el historial de la conversación.

## 1. Contexto y objetivo

El usuario respondió casi todos los datos pendientes (`specs/pendientes.md`, sección "Confirmados"). Este spec los lleva al código y agrega lo que esas respuestas hacen posible:

1. **Datos reales:** precios, bolsas, WhatsApp, razón social, RUC, correo, requisitos y mensajes.
2. **Sin plan de 3 años:** solo 1 y 2 años, para natural y jurídica.
3. **8 bolsas de firmas por volumen**, con selector y tabla en `/firmas/`.
4. **Confianza:** la acreditación de Girasol ante INDECOPI, la base legal y los medios de pago.
5. **Páginas legales:** `/terminos-y-condiciones/` y `/politica-de-privacidad/`.
6. **Preguntas nuevas** con las respuestas confirmadas (qué cuenta como firma, cómo pagar, cuánto tarda, qué se puede firmar).

**Objetivo medible:** que `pnpm pendientes` liste solo **P19** (logo de firmaremota.pe) y que ningún dato de prueba (`+51 999 999 999`, `RAZÓN SOCIAL S.A.C.`, `20XXXXXXXXX`, planes de 3 años) quede en la web.

**Fuera de alcance**
- El logo de firmaremota.pe (P19) y el logo de INDECOPI (P22): siguen pendientes.
- Activar la indexación (`INDEXABLE=true`): mientras P19 tenga su marca, el build indexable sigue fallando a propósito. Lo decide el usuario después.
- La página `/preguntas-frecuentes/`.

## 2. Contenido

### 2.1 Datos (todos en datos, nunca en componentes)

**`src/config/site.ts`**
| Campo | Valor |
|---|---|
| `whatsapp.number` | `51919283658` |
| `whatsapp.display` | `+51 919 283 658` |
| `company.legalName` | `GIRASOL PE S.C.R.L.` |
| `company.ruc` | `20605042512` |
| `email` (nuevo) | `comercial@girasol.pe` |
| `parent.tagline` | Se elimina (P14: mencionar a Girasol solo lo necesario). `parent.name`/`url` pueden quedar si algún componente los usa para la acreditación. |
| Mensajes de WhatsApp | Se mantienen los dinámicos (P10). Se quita la marca `PENDIENTE: P10`. Agregar uno para bolsas que diga cantidad y total, p. ej. "Hola, quiero comprar una bolsa de {cantidad} firmas (US$ {total})." |

Quitar todas las marcas `PENDIENTE` de P13, P14, P17 (también en `src/lib/seo/schema.ts`). **Mantener** la de P19 (`ogImage`).

**`src/content/productos.yaml`**
- **Certificado (4 planes):** natural 1 año US$ 20.00 · natural 2 años US$ 34.00 · jurídica 1 año US$ 20.00 · jurídica 2 años US$ 34.00. Todos `incluyeIgv: true`, `moneda: USD`.
- **Se eliminan** `certificado-natural-3` y `certificado-juridica-3`.
- **Firmas (8 bolsas):** campo nuevo `precioUnitario`; `precio` es el total.

| id | cantidad | precioUnitario | precio (total) |
|---|---|---|---|
| firmas-10 | 10 | 1.00 | 10.00 |
| firmas-50 | 50 | 1.00 | 50.00 |
| firmas-100 | 100 | 0.95 | 95.00 |
| firmas-500 | 500 | 0.90 | 450.00 |
| firmas-1000 | 1000 | 0.85 | 850.00 |
| firmas-5000 | 5000 | 0.75 | 3750.00 |
| firmas-10000 | 10000 | 0.65 | 6500.00 |
| firmas-20000 | 20000 | 0.50 | 10000.00 |

- Esquema (`src/content.config.ts`): en el tipo `firmas`, `precioUnitario: z.number().positive()` y un `refine` que **rompa el build** si `precio !== cantidad × precioUnitario` (redondeado a 2 decimales).
- `nombre`: "Bolsa de 10 firmas", "Bolsa de 1 000 firmas"… (miles con espacio, como en español).
- Quitar las marcas P01, P02 y P03.

**`src/content/requisitos.yaml`** (P07, P08). Cada ítem pasa a tener `texto`, `detalle` opcional, `icono` y `condicion` opcional. Se agrega por titular una `intro`.
- **Intro (ambos):** "Prepara estos documentos antes de iniciar tu flujo de validación en línea. Es un proceso rápido, diseñado para completarse en minutos."
- **Natural:**
  - DNI y/o CE vigente — *Ambas caras.*
  - Contrato — *Leer antes de la validación.*
  - Validación de identidad
- **Jurídica:**
  - DNI y/o CE vigente — *Ambas caras.*
  - Validación de RUC en SUNAT — *Se valida en SUNAT; si no cumple, adjuntar Ficha RUC QR (máx. 15 días).*
  - Vigencia de poder — *Con una antigüedad menor a 90 días.*
  - Contrato — *Leer antes de la validación.*
  - Lista de suscriptores — *Firmada por el representante legal.* · `condicion`: "Solo si es vinculado a empresa"
  - Validación de identidad
- Íconos: reutilizar `src/lib/iconos.ts` (`dni`, `documento`, `documento-sello`) y agregar los que falten: `contrato`, `identidad` (rostro o persona con check), `lista`.
- Quitar las marcas P07 y P08. Ya no hay "correo" ni "celular con WhatsApp" como requisitos.
- **`condicion`** se muestra como una etiqueta discreta junto al ítem, en mono y con borde `fr-line`; no es un botón.

### 2.2 Textos que cambian por el plan de 3 años

Buscar y corregir todas las menciones (`grep -rn "3 años\|1, 2 o 3\|1–3\|1 a 3\|3 vigencias"` en `src/`):
- `src/pages/index.astro`: el punto "Vigencia de 1, 2 o 3 años" pasa a **"Vigencia de 1 o 2 años"**.
- `src/components/illustrations/CredencialDigital.astro`: "Vigencia 1–3 años" pasa a **"Vigencia 1–2 años"**.
- `src/pages/certificado-digital.astro`: la `description` "de 1 a 3 años" pasa a **"de 1 o 2 años"** (o calculada con las vigencias de la collection).
- Comentarios que digan "3 vigencias".
- Los chips y la matriz ya se calculan con la collection: comprobar que muestran "2 vigencias" y dos columnas.
- **"Más elegido"** sigue en el plan de 2 años.
- Las anclas `#natural-3-anos` y `#juridica-3-anos` desaparecen. Ningún enlace interno puede apuntar a ellas.

### 2.3 Textos de producto (P05)

- `/certificado-digital/`, intro de **persona natural** (en la matriz o donde hoy está su línea): **"Firma a tu nombre contratos, solicitudes y cualquier documento PDF, con validez legal."**
- Intro de **persona jurídica:** **"Firma contratos, actas y documentos legales como persona jurídica, con plena validez legal ante entidades públicas y privadas. También para personas vinculadas a una empresa."**

### 2.4 `/firmas/`: bolsas por volumen

- **Chips del hero:** "No vencen" · "De 10 a 20 000 firmas" · "Desde US$ 0.50 por firma" (calculados con la collection).
- **Sección de bolsas**, en este orden:
  1. **Selector** (isla React, ver §3.2): elegir la bolsa con un control deslizante de 8 posiciones. Muestra la cantidad, el **total**, el **precio por firma**, el **ahorro** frente al precio base y un botón "Comprar" con el mensaje de esa bolsa.
     - Ahorro: `1 − precioUnitario / precioUnitario de la bolsa mínima`, en %, solo si es > 0. Por ejemplo, "Ahorras 50 %" en la de 20 000.
     - Texto bajo el selector: "Te atiende un asesor por WhatsApp · Precios con IGV incluido".
  2. **Medidor de saldo** (spec 006): se mantiene, al lado del selector desde `lg`. Su `N` inicial es la cantidad de la bolsa mínima (10).
  3. **Tabla de volúmenes:** las 8 bolsas en filas con las columnas Firmas · Precio por firma · Total · Ahorro · botón "Comprar".
     - Cada fila tiene un `id` (`bolsa-10`, `bolsa-50`, … `bolsa-20000`) y `data-destacable`, para enlazarlas como los planes.
     - En móvil, filas compactas apiladas.
- Se elimina "Pronto habrá bolsas más grandes".
- **Inicio, tarjeta de firmas:**
  - El precio grande sigue siendo el de la bolsa mínima (US$ 10.00).
  - Los puntos pasan a: "Desde 10 firmas" · "Hasta 20 000 firmas, desde US$ 0.50 c/u" · "Las firmas no vencen" · "Sirven con tu certificado, sea nuestro o de otro proveedor".
  - El enlace "Ver bolsas de firmas" se mantiene.

### 2.5 Confianza: acreditación, base legal y pagos

**Sección "Acreditación"** (nueva, `Acreditacion.astro`; textos en `src/config/secciones.ts`). Va en el **inicio** (entre "Cómo funciona" y "Preguntas") y en **`/certificado-digital/`** (antes de "Requisitos").
- Etiqueta "Respaldo" · `h2` "Firma con *validez legal.*"
- Intro: "Los certificados los emite GIRASOL PE S.C.R.L., Entidad de Certificación acreditada ante INDECOPI, conforme a la Ley N.° 27269, Ley de Firmas y Certificados Digitales, y su Reglamento (D.S. N.° 052-2008-PCM)."
- Tres hitos, en tarjetas o en una línea de tiempo corta:
  - **2020** · Entidad de Registro acreditada ante INDECOPI
  - **2023** · Software de firma Firmeasy acreditado
  - **2024** · Entidad de Certificación acreditada ante INDECOPI
- **Sello de texto** (P12, sin logo; P22 pendiente): un sello circular o rectangular con "Entidad de Certificación · Acreditada ante INDECOPI", en el estilo de `Sello.astro`. Dejar un lugar reconocible para el logo y un comentario `// P22: logo de INDECOPI cuando llegue el archivo` en la **página**, sin marca `PENDIENTE` (para no bloquear `pnpm pendientes`; P22 se sigue en `specs/pendientes.md`).

**Medios de pago** (P06). Una franja pequeña, como `MediosPago.astro`, bajo la matriz de `/certificado-digital/` y bajo la tabla de `/firmas/`:
- Texto: "Pagas como prefieras: trabajamos con el BCP y aceptamos tarjetas de crédito y débito. También puedes pagar en línea con Izipay, Culqi o Yape."
- Los nombres van como **chips de texto en mono, sin logos de las marcas** (no hay archivos ni permiso de uso).

**Footer**
- Columna "Contacto": WhatsApp `+51 919 283 658` y correo `comercial@girasol.pe` (`mailto:`).
- Se quita "Un producto de Girasol".
- Columna "Empresa": `GIRASOL PE S.C.R.L.` · RUC `20605042512`.
- Nueva columna o fila **"Legal"**: Términos y condiciones · Política de privacidad.
- Línea final: "© {año} firmaremota.pe · Certificados emitidos por GIRASOL PE S.C.R.L., Entidad de Certificación acreditada ante INDECOPI."

### 2.6 Preguntas frecuentes

Actualizar `src/content/faqs.yaml`. Las variables de las respuestas se calculan en `src/lib/faqs.ts`, desde la collection.

| id | Pregunta | Respuesta | Páginas |
|---|---|---|---|
| `cuanto-cuesta` (cambia) | ¿Cuánto cuesta? | "El certificado digital cuesta {precio_cert_1} por 1 año o {precio_cert_2} por 2 años. Las firmas se venden en bolsas desde {cantidad_bolsa_min} firmas ({precio_bolsa_min}), y el precio por firma baja hasta {precio_firma_min} en las bolsas más grandes. Todos los precios incluyen IGV." | inicio, certificado-digital, firmas |
| `validez-legal` (cambia) | ¿La firma remota tiene validez legal? | "Sí. La firma digital tiene la misma validez que la firma manuscrita según la Ley N.° 27269, Ley de Firmas y Certificados Digitales, y su Reglamento (D.S. N.° 052-2008-PCM). Los certificados los emite GIRASOL PE S.C.R.L., Entidad de Certificación acreditada ante INDECOPI." | inicio, certificado-digital |
| `que-cuenta-como-firma` (nueva, P04) | ¿Qué cuenta como una firma? | "Cada firma que haces descuenta una de tu bolsa. Si un documento lleva 3 firmas, se descuentan 3." | firmas |
| `como-pagar` (nueva, P06) | ¿Cómo puedo pagar? | "Trabajamos con el BCP y aceptamos tarjetas de crédito y débito. También puedes pagar en línea con Izipay, Culqi o Yape. Tu asesor te indica los datos al confirmar la compra." | inicio, certificado-digital, firmas |
| `cuanto-tarda` (nueva, P09) | ¿Cuánto tarda en estar listo mi acceso? | "Es inmediato: después de conversar con tu asesor y completar la validación, recibes tu usuario y contraseña." | inicio, certificado-digital |
| `que-puedo-firmar` (nueva, P05) | ¿Qué documentos puedo firmar? | "Con el certificado de persona natural firmas a tu nombre contratos, solicitudes y cualquier documento PDF. Con el de persona jurídica firmas contratos, actas y documentos legales en nombre de la empresa." | certificado-digital |

- Quitar las marcas P11 y P12 de `faqs.yaml`.
- **Variables nuevas** en `faqs.ts`: `precio_cert_1`, `precio_cert_2`, `cantidad_bolsa_min`, `precio_bolsa_min`, `precio_firma_min`. Una variable desconocida ya rompe el build: mantener ese comportamiento.
- Revisar que el inicio no supere ~8 preguntas; si las supera, sacar del inicio la de menor prioridad (`que-puedo-firmar` ya no va al inicio).

### 2.7 Páginas legales

**`/terminos-y-condiciones/`** (P15)
- Contenido **idéntico** a https://girasol.pe/terminos/: 15 secciones, actualizado el 27 de abril de 2026.
  - Copiarlo a `src/content/legales/terminos-y-condiciones.md`, en Markdown y conservando títulos, listas y datos de contacto.
  - Frontmatter: `titulo`, `actualizado: 2026-04-27`, `fuente: https://girasol.pe/terminos/`.
- **No** inventar, resumir ni reescribir: si una parte no se puede leer bien, dejar `<!-- REVISAR: … -->` y avisar al usuario.

**`/politica-de-privacidad/`** (P16)
- Texto completo de la **Política y Plan de Privacidad V1.6** (GIRASOL PE S.C.R.L., código ECTSAER-POLPL-04062026, 04/06/2026), transcrito a `src/content/legales/politica-de-privacidad.md`.
  - El PDF original está en `C:\Users\joffr\Downloads\POLITICA_Y_PLAN_DE_PRIVACIDAD_V1.6.pdf` (16 páginas); la herramienta de lectura de archivos lo lee como texto.
  - Las tablas del PDF (definiciones, persona de contacto, historial de versiones) pasan a tablas Markdown.
  - El índice del PDF no se copia: la página genera el suyo.
- **Copiar el PDF a** `public/legal/politica-y-plan-de-privacidad-v1.6.pdf` y poner un botón "Descargar PDF oficial (firmado)" arriba de la página.

**Para las dos páginas**
- Collection nueva `legales` (`glob` sobre `src/content/legales/*.md`) con `titulo`, `actualizado` (fecha), `fuente` opcional, `version` opcional y `pdf` opcional.
- Layout `LegalLayout.astro` (o una página `[slug].astro` con `getStaticPaths`):
  - Migas de pan, `h1`, fecha "Actualizado el …".
  - Índice lateral con anclas (`#` por cada `h2`) desde `lg`; en móvil, plegable con `<details>`.
  - Columna de texto de ~70 caracteres.
- **Estilos de texto largo:** una clase propia `.fr-prosa` en `global.css` con títulos, párrafos, listas, tablas y enlaces, usando tokens `fr-*`. **Sin** dependencias nuevas (no agregar `@tailwindcss/typography`).
- SEO: `title` "Términos y condiciones" / "Política de privacidad"; `description` propia; `BreadcrumbList`; **indexables** (no `noindex`).
- Los enlaces del footer apuntan aquí.

## 3. Comportamiento

### 3.1 Datos y build
- Si `precio` no coincide con `cantidad × precioUnitario`, el build falla con un mensaje claro.
- `pnpm pendientes` lista **solo P19**.

### 3.2 Selector de bolsas (isla React)
- **`src/components/islands/SelectorBolsas.tsx`** (`client:visible`). Sigue el patrón de `CertificadoPlanes.tsx`:
  - Renderizado en el servidor con la bolsa mínima: **sin JS se ve completo** y su botón funciona.
  - `MotionConfig reducedMotion="user"`.
  - Precios con `SlidingNumber` de animate-ui **solo después de hidratar**. Antes, texto normal: `SlidingNumber` no muestra dígitos en SSR.
- **Control:** `<input type="range">` nativo con 8 pasos (índice de la bolsa), con su `<label>` visible. Las marcas debajo muestran las cantidades (10, 50, 100, 500, 1 000, 5 000, 10 000, 20 000). Flechas del teclado para moverse.
  - Accesible: `aria-valuetext` con "500 firmas, US$ 450.00". Un `aria-live="polite"` anuncia el total al cambiar.
- **Estilo:**
  - Pista en `fr-line`, con la parte recorrida en **ámbar**; el pulgar en **tinta**, porque es un control.
  - Total grande en Outfit; precio por firma y ahorro en mono.
  - El ahorro, como chip ámbar sobre fondo navy, o con texto navy sobre `fr-girasol-soft`: cuidar el contraste AA.
- Al soltar, el botón "Comprar" cambia al mensaje de esa bolsa.

### 3.3 Anclas y resaltado
- `src/lib/destacar.ts` ya resalta `[data-destacable]`. Las filas `#bolsa-N` lo usan sin cambios.
- Con "reducir movimiento", sin scroll suave pero con anillo.

### 3.4 Páginas legales
- El índice lateral marca la sección visible (opcional, sin dependencias). Si se hace, con IntersectionObserver y sin animaciones.
- Las tablas largas, en móvil, se desplazan **dentro** de su contenedor (`overflow-x-auto`) sin desbordar la página.

### 3.5 Reglas de siempre
Constitución §7 (sin JS y con "reducir movimiento", todo en su estado final) y reparto del color del spec 002 (azul tinta solo en lo que se pulsa; ámbar decorativo, como texto solo sobre navy o `fr-ink`).

## 4. SEO

| Página | Schema |
|---|---|
| `/` | `Organization` (sin `parentOrganization`; `legalName` GIRASOL PE S.C.R.L., `taxID` 20605042512, `email` comercial@girasol.pe, `contactPoint` con el WhatsApp real) + `WebSite` + `Service` con **4 planes + 8 bolsas** + `FAQPage` |
| `/certificado-digital/` | 4 `Product`/`Offer` + `BreadcrumbList` + `FAQPage` |
| `/firmas/` | Un `Product` "Firmas digitales" con 8 `Offer` (una por bolsa) **o** 8 `Product` (como prefieras, que sea coherente) + `BreadcrumbList` + `FAQPage` |
| Legales | `BreadcrumbList` (y `WebPage` si se quiere) |

- Las `description` de producto se calculan con la collection.
- Con `INDEXABLE=true`, el sitemap incluye las dos páginas legales, aunque el build indexable falla igual por P19, como está previsto. Para comprobar el sitemap, usar `pnpm astro build` directo con `INDEXABLE=true`, que salta el chequeo.

## 5. Criterios de aceptación

**Datos**
- [x] El WhatsApp real (`51919283658`) está en todos los enlaces `wa.me` y en el schema. No quedan `999 999 999`, `RAZÓN SOCIAL`, `20XXXXXXXXX` ni "3 años" en `src/` (comprobar con `grep`).
- [x] 4 planes de certificado (US$ 20 y US$ 34) y 8 bolsas con sus totales exactos. Un total mal escrito en el YAML rompe el build (probarlo y revertir).
- [x] `pnpm pendientes` lista solo P19.

**Páginas**
- [x] `/firmas/`: el selector recorre las 8 bolsas con mouse y teclado, y cambian el total, el precio por firma, el ahorro y el mensaje de WhatsApp. La tabla muestra las 8 con sus anclas. Sin JS se ve la bolsa mínima con su botón.
- [x] `/certificado-digital/`: matriz de 2 columnas, textos P05, requisitos nuevos con detalle y la etiqueta "Solo si es vinculado a empresa", sección de acreditación y franja de pagos.
- [x] Inicio: la sección de acreditación y los puntos nuevos en la tarjeta de firmas.
- [x] `/terminos-y-condiciones/`: el texto coincide con girasol.pe/terminos/ (15 secciones, fecha 27/04/2026).
- [x] `/politica-de-privacidad/`: texto completo de la V1.6 y el PDF descargable desde `/legal/politica-y-plan-de-privacidad-v1.6.pdf`.
- [x] Footer con contacto real, legal y la línea de acreditación; sin "Un producto de Girasol".
- [x] Las preguntas nuevas aparecen en sus páginas y el `FAQPage` coincide con lo visible.

**Calidad**
- [x] Sin desborde lateral en 375, 768, 1024 y 1280 px en todas las páginas, incluidas las legales con tablas.
- [x] Sin JS y con "reducir movimiento", todo visible y en su estado final.
- [x] Lighthouse móvil ≥ 90 en las cuatro categorías en `/`, `/certificado-digital/`, `/firmas/` y `/politica-de-privacidad/`.
- [x] `pnpm build` sin errores ni advertencias.

---

## 6. Plan técnico

**Archivos nuevos**
```
src/components/islands/SelectorBolsas.tsx
src/components/sections/Acreditacion.astro
src/components/sections/MediosPago.astro
src/components/sections/TablaBolsas.astro          (o dentro de Bolsas.astro)
src/layouts/LegalLayout.astro                      (o src/pages/[legal].astro)
src/content/legales/terminos-y-condiciones.md
src/content/legales/politica-de-privacidad.md
public/legal/politica-y-plan-de-privacidad-v1.6.pdf
src/pages/terminos-y-condiciones.astro + politica-de-privacidad.astro   (si no se usa [slug])
```

**Archivos que cambian:** `src/config/site.ts`, `src/config/secciones.ts`, `src/content.config.ts`, `src/content/productos.yaml`, `src/content/requisitos.yaml`, `src/content/faqs.yaml`, `src/lib/faqs.ts`, `src/lib/iconos.ts`, `src/lib/whatsapp.ts` (mensaje de bolsa), `src/lib/seo/schema.ts`, `src/components/sections/Bolsas.astro`, `src/components/sections/Requisitos.astro`, `src/components/layout/Footer.astro`, `src/components/illustrations/CredencialDigital.astro`, `src/pages/index.astro`, `src/pages/certificado-digital.astro`, `src/pages/firmas.astro`, `src/styles/global.css` (`.fr-prosa`).

**Al terminar, actualizar `specs/pendientes.md`:** anotar en cada confirmado "Aplicado en el código (spec 007)".

**Reglas y trampas conocidas de este proyecto (leer antes de escribir código)**
- Constitución: `specs/constitution.md`. Identidad y reparto del color: `specs/features/002-identidad-visual/spec.md` §2–3. Tokens `fr-*`; nada de valores literales si hay token.
- **Sin textos fijos en `src/components/sections/`:** llegan por props, desde `src/config/secciones.ts` o desde una collection.
- **No usar `transition-all`** en elementos que anima GSAP (`data-reveal`, `data-anim`). Para hovers: `transition-[translate,box-shadow]`.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular y rompe el archivo. Usar `const v = x ?? 0; v / y`. Ojo con el ahorro y el precio por firma: son divisiones.
- **Redondeo de dinero:** comparar totales en centavos (`Math.round(x * 100)`) para evitar errores de coma flotante (0.95 × 100 no da exactamente 95).
- **`SlidingNumber`** (animate-ui) no muestra dígitos en SSR: usar texto normal hasta hidratar y `aria-hidden` en la versión animada, como hace `CertificadoPlanes.tsx`.
- **`buttonVariants()`** ya pasa por `cn`. No poner radios `rounded-fr-*` en la base de un `cva`.
- **Placeholders:** solo en datos, con `# PENDIENTE: Pxx`, una marca por línea.
- **Contenido legal:** copiar tal cual, sin "mejorar" la redacción. Para girasol.pe/terminos/, leer la página completa (puede requerir varias lecturas por longitud) y comparar el número de secciones (15).
- **Servidor de desarrollo:** Astro 7 permite uno solo por proyecto. Si `pnpm dev` dice que ya hay uno, usarlo (http://localhost:4321) o `pnpm astro dev stop`.
- **Windows + Git Bash:** los heredocs largos fallan a veces. Para archivos, usar la herramienta de escritura de archivos.
- **Verificación visual:** el panel del navegador de la app puede estar oculto y no ejecutar animaciones. Usar Chrome sin interfaz:
  - `puppeteer-core` está en `%LOCALAPPDATA%/npm-cache/_npx/*/node_modules/puppeteer-core`.
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- **Lighthouse:** `INDEXABLE=true pnpm astro build --outDir dist-lh` (directo con `astro build`: el chequeo de pendientes fallaría por P19), luego `pnpm astro preview --outDir dist-lh --port 4400`, medir con `npx -y lighthouse@12 <url> --form-factor=mobile` y borrar `dist-lh`.
- **Git:** commits **sin** `Co-Authored-By` ni mención de la IA (el autor es el usuario); mensaje `[007] …`; **no hacer push** salvo que el usuario lo pida.

## 7. Tareas

- [x] T1 Datos: `site.ts`, `productos.yaml` (+ `refine`), `requisitos.yaml` (+ esquema), quitar marcas `PENDIENTE` resueltas.
- [x] T2 Quitar el plan de 3 años en todos los textos e ilustraciones (§2.2) y aplicar los textos P05 (§2.3).
- [x] T3 `/firmas/`: `SelectorBolsas`, tabla de volúmenes, medidor y chips; tarjeta de firmas del inicio.
- [x] T4 `Acreditacion`, `MediosPago` y footer.
- [x] T5 Preguntas (`faqs.yaml` + variables en `faqs.ts`).
- [x] T6 Collection `legales`, layout, `.fr-prosa`, `/terminos-y-condiciones/` y `/politica-de-privacidad/` con su PDF.
- [x] T7 Schema (§4) y actualizar `specs/pendientes.md`.
- [x] T8 Verificación: criterios de §5 (greps, Chrome sin interfaz con capturas en 375 y 1440 px, selector con teclado, páginas legales, Lighthouse). Anotar resultados y decisiones en §8, y dejar el spec en `en-curso` para revisión.

## 8. Notas de implementación

**2026-11-16**

Verificado con Chrome sin interfaz (puppeteer-core) y Lighthouse 12 móvil sobre `INDEXABLE=true pnpm astro build --outDir dist-lh` (borrada al terminar). Capturas revisadas en 375 y 1440 px de `/`, `/certificado-digital/`, `/firmas/` y la política de privacidad.

**Lighthouse móvil**

| Página | Perf. | Accesib. | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 96 | 100 | 100 | 100 | 2466 ms | 0 | 100 ms |
| `/certificado-digital/` | 97 | 100 | 100 | 100 | 2451 ms | 0 | 70 ms |
| `/firmas/` | 97 | 100 | 100 | 100 | 2437 ms | 0 | 20 ms |
| `/politica-de-privacidad/` | 98 | 100 | 100 | 100 | 2267 ms | 0 | 10 ms |

**Comprobaciones**
- `pnpm build`: 0 errores y 0 advertencias. `pnpm pendientes` lista solo P19 (P22 se sigue en `pendientes.md`, sin marca en el código, como pide el spec).
- **Greps en `src/`** de `999 999`, `51999999999`, `RAZÓN SOCIAL`, `20XXXXXXXXX`, `Un producto de Girasol`, `natural-3`, `juridica-3` y `3 años`: sin resultados, salvo **una línea del texto legal de los términos** copiada tal cual de girasol.pe ("Los certificados tienen una vigencia de 1 año a 3 años…"), que habla del catálogo general de GIRASOL y no de este sitio. Todos los enlaces `wa.me` de las 5 páginas usan `51919283658`.
- **Build roto a propósito:** con el total de la bolsa de 500 firmas en `449.00` el build falla con "Bolsa de 500 firmas: precio 449 no es cantidad × precioUnitario (500 × 0.9 = 450)". Revertido.
- **Selector de bolsas** (1280 y 375 px): con teclado (ArrowRight ×7) recorre las 8 bolsas y en cada una coinciden `aria-valuetext`, el aviso `aria-live`, el precio por firma, el ahorro (0, 0, 5, 10, 15, 25, 35, 50 %) y el mensaje de WhatsApp (`Hola, quiero comprar una bolsa de 500 firmas (US$ 450.00).`). Home y End llevan a 10 y 20 000; un clic al 50 % de la pista elige 1 000. Sin JS se ve la bolsa de 10 con su botón y el medidor en 7; con "reducir movimiento" también funciona. Marcas bajo la pista: 8 visibles desde `sm` y 4 en 375 px, sin solaparse.
- **Anclas:** las 14 (6 de `/certificado-digital/` y 8 `#bolsa-N`) centran y resaltan, en 1280 y 375 px (28 pruebas). `#natural-3-anos` y `#juridica-3-anos` ya no existen.
- **Certificado:** matriz de 2 columnas (1 y 2 años; US$ 20.00 y US$ 34.00, "por año" US$ 20.00 y US$ 17.00), chips "2 titulares · 2 vigencias · Desde US$ 20.00", credencial "Vigencia 1–2 años", `description` "de 1 o 2 años desde US$ 20.00", textos P05, requisitos con detalle y la etiqueta "Solo si es vinculado a empresa", acreditación antes de requisitos, franja de pagos bajo la matriz.
- **Inicio:** acreditación entre "Cómo funciona" y "Preguntas"; puntos de la tarjeta de firmas nuevos; 8 preguntas; footer con WhatsApp, correo, empresa, legal y la línea de acreditación.
- **Preguntas:** el `FAQPage` coincide con las visibles en las tres páginas (inicio 8, certificado 9, firmas 6).
- **JSON-LD:** inicio con `Organization` (sin `parentOrganization`; GIRASOL PE S.C.R.L., RUC, correo y teléfono reales), `WebSite`, `Service` con **12** `Offer` (4 planes + 8 bolsas) y `FAQPage`; certificado con 4 `Product`; firmas con **1** `Product` y 8 `Offer`; legales con `BreadcrumbList`. Las cinco páginas son `index, follow`; el sitemap (con `INDEXABLE=true`, sin el chequeo de pendientes) incluye las dos legales y no `/sistema-visual/`.
- **Sin desborde** en 375, 768, 1024 y 1280 px en las 5 páginas (20 combinaciones). En 375 px la tabla ancha de la política se desplaza dentro de su caja. El espacio hero → sección siguiente de la 006 se mantiene (90/74, 92/71 y 60/81 px a 1440/375).

**Páginas legales**
- **Términos:** el HTML de girasol.pe/terminos/ se descargó con `curl` y se convirtió a Markdown con un script local (no con un resumidor). El texto resultante tiene las mismas 1373 palabras que el original y 15 secciones, con fecha 27/04/2026.
- **Política:** el PDF se extrajo con `pdftotext` (UTF-8) y el Markdown se armó con un script que toma cada párrafo directamente del texto extraído; comparado por palabras con el PDF, solo difiere en "1.INTRODUCCIÓN" → "1. INTRODUCCIÓN". Las tablas (carátula, historial, certificados, definiciones, contacto) se reconstruyeron con `pdftotext -table`. El PDF se copió a `public/legal/` y responde 200 (987 110 bytes). El índice del PDF no se copia. Sin `<!-- REVISAR -->`: todo se leyó bien.

**Decisiones**
- Términos: los encabezados de las 15 secciones (en el original, 14 `h3` y un `h2`) pasan todos a `##`, para que el índice lateral los liste; se conserva su capitalización ("Aceptación De Términos"). Se omite el glifo "•" que el original escribe al inicio de cada viñeta, porque Markdown ya pone la viñeta.
- Frontmatter de `legales`: además de los campos del spec se agregan `descripcion` (meta description) y `tituloSeo` (título del `<title>`, distinto del `h1`). La página muestra también la fuente cuando existe.
- Ruta única `src/pages/[legal].astro` + `LegalLayout.astro`; el slug es el nombre del archivo.
- `Bolsas.astro` se reescribió: ya no pinta tarjetas (con 8 bolsas no tienen sentido) sino un hueco para el selector, otro para el medidor y otro para la tabla. `TablaBolsas.astro` es una sola `<table>` con roles ARIA explícitos que pasa a bloques por debajo de 640 px (mismo patrón que `MatrizPlanes`). El `h2` sigue siendo "Bolsas de firmas".
- Selector: control `<input type="range">` con índice 0–7 (no con la cantidad), pulgar en tinta y pista recorrida en ámbar (`.fr-range` en `global.css`); chip de ahorro en navy con texto ámbar.
- Mensaje de WhatsApp de bolsas: "Hola, quiero comprar una bolsa de {cantidad} firmas ({total})." con el total en formato de marca ("US$ 3,750.00") y la cantidad con espacio de miles.
- El esquema de `productos` limita `vigenciaAnios` a 1 o 2 (un plan de 3 años rompería el build) y exige `precioUnitario` en las bolsas.
- Se eliminó `site.parent` (ya nada lo usa) y las variables de FAQ `precio_certificado`, `precio_firmas` y `cantidad_firmas`, reemplazadas por las del spec.
- La intro de requisitos es la misma en ambos titulares: se muestra una sola vez bajo el título (si difirieran, cada columna mostraría la suya). El texto "Un asesor te confirma los requisitos antes de la compra." se mantiene.
- Textos míos que el spec no definía: etiqueta "Tu bolsa" y rótulo "Elige cuántas firmas necesitas" del selector, "Total", "Ahorras", "Sin ahorro" (accesible), los captions de las tablas, los chips "Tarjeta de crédito" y "Tarjeta de débito" de la franja de pagos y el contenido del sello ("Entidad de Certificación · Acreditada ante INDECOPI"). La acreditación va sobre fondo blanco (`fr-sheet`) para separarla de las secciones vecinas.
- El comentario de P22 (logo de INDECOPI) está en `index.astro` y `certificado-digital.astro`, con un slot `logo` libre en `Acreditacion.astro`.

**Pendiente / a revisar**
- **Indexación:** `INDEXABLE=true pnpm build` sigue fallando a propósito por P19. Para publicar falta el logo y favicon de firmaremota.pe.
- **P22:** el logo de INDECOPI sigue pendiente (sello de texto mientras tanto).
- **PDF de privacidad:** no se pudo ver como imagen (no hay renderizador de páginas en esta máquina); las tablas se reconstruyeron desde las coordenadas del texto. Conviene una lectura visual de las tablas de la página contra el PDF, sobre todo el historial de versiones. El PDF tiene 15 páginas, no 16.
- **Términos:** el texto de girasol.pe es de GIRASOL y habla de certificados de "1 año a 3 años"; es el texto aprobado tal cual, pero no coincide con los dos planes que vende este sitio.
- La política cita el correo soporte@girasolpe.com y no el comercial@girasol.pe del sitio (es el texto oficial).
