# [003] Inicio

> Estado: `hecho` (verificado por el usuario el 2026-11-16; sus observaciones pasan al spec 004) · Creado: 2026-11-16
> Constitución: v0.3.1 · Depende de: 001-setup, 002-identidad-visual

## 1. Contexto y objetivo

El inicio es la página que se va a **presentar** y la que recibe la búsqueda principal, "firma remota". Hoy `/` es la página de muestra del spec 002: tiene casi todo el contenido, pero también la sección "Sistema visual" y la isla de prueba, y le faltan las ventajas, las preguntas frecuentes y el cierre.

**Objetivo medible:** que un visitante entienda en el primer pantallazo qué es la firma remota, y que en un solo scroll sepa:

- que hay dos productos y que necesita los dos;
- cuánto cuestan;
- cómo funciona;
- dónde comprar.

**Fuera de alcance**

- Las páginas `/certificado-digital/`, `/firmas/` y `/preguntas-frecuentes/`: tienen sus propios specs (004, 005, 006). Hasta que existan, el inicio **no enlaza a ellas** para no llevar a una 404.
- El blog y las páginas legales.

## 2. Contenido

Solo con datos confirmados (`site.md`) o placeholders registrados (`pendientes.md`).

### Secciones, en orden

| #   | Sección                            | Contenido                                                                                                                                                                                                           | Fuente                            |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| —   | **Header**                         | Logotipo · menú (Productos, Cómo funciona, Preguntas) con anclas · "Comprar"                                                                                                                                        | `Header.astro` (spec 002)         |
| 1   | **Hero**                           | Etiqueta "Firma remota · Perú" · `h1` "Firma tus documentos _desde la nube._" · subtítulo · "Comprar" + "Cómo funciona" · nota "Te atendemos por WhatsApp · Precios con IGV incluido" · documento que se firma solo | Spec 002 (se mantiene)            |
| 2   | **Qué es / ventajas** _(nueva)_    | `h2` "Tu firma, _sin instalar nada._" · 3 ventajas · comparación con el certificado tradicional                                                                                                                     | Ver abajo                         |
| 3   | **Los dos productos**              | Certificado y bolsa de firmas, con precio e "Incluye IGV"                                                                                                                                                           | Collection `productos` (P01, P02) |
| 4   | **Necesitas los dos**              | Certificado + firmas = puedes firmar                                                                                                                                                                                | Spec 002 (se mantiene)            |
| 5   | **Cómo funciona**                  | 3 pasos, el último con el código OTP                                                                                                                                                                                | Spec 002 (se mantiene)            |
| 6   | **Preguntas frecuentes** _(nueva)_ | 6 preguntas en acordeón                                                                                                                                                                                             | Collection `faqs` (nueva)         |
| 7   | **CTA de cierre** _(nuevo)_        | `h2` + una línea + "Comprar" + "Escríbenos por WhatsApp"                                                                                                                                                            | Ver abajo                         |
| —   | **Footer**                         | Spec 002, en tinta negra                                                                                                                                                                                            | `Footer.astro`                    |

Sale de la página la sección **"Sistema visual"** y la isla de prueba (ver §3, "Página interna").

### Textos nuevos (borrador para aprobar)

**2 · Ventajas**

| Ventaja            | Texto                                                                   |
| ------------------ | ----------------------------------------------------------------------- |
| Sin instalar nada  | No hay archivos, programas ni token. Tu certificado vive en la nube.    |
| Desde donde estés  | Firmas con tu usuario y contraseña, desde cualquier lugar con internet. |
| Doble verificación | Cada firma se confirma con tu PIN y un código que llega a tu WhatsApp.  |

**Comparación** (dos columnas, sin precios):

|               | Certificado tradicional                        | Firma remota               |
| ------------- | ---------------------------------------------- | -------------------------- |
| Dónde está    | En un archivo instalado o en un token          | En la nube                 |
| Qué necesitas | La computadora o el token donde está instalado | Usuario, PIN y tu WhatsApp |
| Para empezar  | Descargar, instalar y configurar               | Recibes tu acceso y listo  |

**6 · Preguntas frecuentes.** Solo las que se pueden responder con datos confirmados. Las respuestas que dependen de pendientes se marcan.

| Pregunta                                      | Respuesta                                                                                                                                                                 | Datos                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| ¿Qué es la firma remota?                      | Es una firma digital que no se descarga ni se instala: tu certificado vive en la nube y firmas tus documentos con tu usuario, tu PIN y un código que llega a tu WhatsApp. | Confirmado                                                |
| ¿Qué necesito para firmar?                    | Dos cosas: un certificado digital y firmas disponibles. Si te falta una de las dos, no puedes firmar.                                                                     | Confirmado                                                |
| ¿Puedo usar un certificado de otro proveedor? | Sí. Puedes comprarnos solo las firmas y usarlas con tu certificado, o comprarnos el certificado y gestionar tus firmas por otro lado.                                     | Confirmado                                                |
| ¿Las firmas vencen?                           | No. La cantidad de firmas que compras no vencen; se descuentan a medida que firmas.                                                                                       | Confirmado                                                |
| ¿Cuánto cuesta?                               | El certificado digital cuesta US$ 20.00 y la bolsa mínima de 10 firmas, US$ 10.00. Los precios incluyen IGV.                                                              | **P01, P02** (salen de la collection, no escritos a mano) |
| ¿La firma remota tiene validez legal?         | Sí. La firma digital tiene la misma validez que la firma manuscrita según la Ley N.° 27269, Ley de Firmas y Certificados Digitales.                                       | **P11, P12** (texto a revisar)                            |

**7 · CTA de cierre** (fondo navy):

- `h2`: "Empieza a firmar _desde la nube._"
- Línea: "Escríbenos y te ayudamos a elegir tu certificado y tus firmas."
- Botones: "Comprar" (primario) + "Escríbenos por WhatsApp" (secundario oscuro). Los dos llevan al WhatsApp general (P17).

## 3. Comportamiento

- **Header:** fijo arriba. Sus anclas llevan a `#productos`, `#como-funciona` y `#preguntas`, con scroll suave (sin scroll suave si se pide "reducir movimiento"). En móvil se ocultan los enlaces y queda el botón "Comprar".
- **Ventajas:** tres tarjetas-hoja con un icono simple en navy. La comparación es una tabla real (`<table>`) que en móvil se apila en dos tarjetas.
- **Preguntas frecuentes:** `<details>` nativo, sin JS. Se abre una a la vez (atributo `name`) y el indicador "+" gira a "×". Funcionan con teclado y sin JS.
- **Animación:** igual que en el 002. Las entradas al hacer scroll (`data-reveal`) se aplican a las ventajas, los productos, los pasos y el cierre; la firma y el sello del hero no cambian. Nada de lo que está en el primer pantallazo se anima, salvo la firma.
- **CTAs:** todos los "Comprar" van a WhatsApp con mensaje prellenado:
  - el del hero, el del header y el del cierre llevan el mensaje general;
  - los de cada producto llevan el mensaje de ese producto.

  Se abren en una pestaña nueva.

- **Página interna "Sistema visual":** la muestra de colores, tipografía y botones pasa a `/sistema-visual/`, siempre con `noindex` y fuera del sitemap, para que el equipo la tenga a mano. La isla de prueba del 001 se elimina.

## 4. SEO

| Campo             | Valor                                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL               | `/`                                                                                                                                                                                |
| `title`           | Firma remota: firma tus documentos desde la nube \| firmaremota.pe                                                                                                                 |
| `description`     | Firma digital en la nube, sin descargar ni instalar nada. Certificado digital para persona natural y jurídica y firmas desde US$ 10. Te atendemos por WhatsApp. _(149 caracteres)_ |
| `h1`              | Firma tus documentos desde la nube.                                                                                                                                                |
| `h2`              | Uno por sección: ventajas, productos, necesitas los dos, cómo funciona, preguntas, cierre                                                                                          |
| Schema JSON-LD    | `Organization` + `WebSite` (globales) · `Service` "Firma remota" con sus dos `Offer` · `FAQPage` con las 6 preguntas visibles                                                      |
| Keywords objetivo | firma remota · firma digital en la nube · firma digital sin token · certificado digital Perú                                                                                       |
| Imagen OG         | La de por defecto (P19)                                                                                                                                                            |

## 5. Criterios de aceptación

**Contenido**

- [x] Están las 7 secciones en el orden de §2 y ya no aparecen ni "Sistema visual" ni la isla de prueba.
- [x] Precios, WhatsApp y razón social salen de los datos, no escritos en la página. La respuesta "¿Cuánto cuesta?" también.
- [x] Ningún enlace lleva a una página que todavía no existe.

**Comportamiento**

- [x] Las anclas del header llevan a su sección y el título no queda tapado por el header.
- [x] Las preguntas frecuentes se abren de a una, funcionan con teclado y sin JS.
- [x] La comparación se lee bien en 375px (sin scroll horizontal).
- [x] Sin JS y con "reducir movimiento", todo el contenido se ve completo.

**SEO**

- [x] Un `h1` y un `h2` por sección, sin saltos de nivel.
- [x] El JSON-LD incluye `Service` y `FAQPage`, y las preguntas del `FAQPage` son exactamente las visibles.
- [x] `/sistema-visual/` tiene `noindex` siempre y no aparece en el sitemap aunque el sitio sea indexable.

**Calidad**

- [x] Sin desborde lateral en 375, 768, 1024 y 1280px; secciones alineadas al contenedor.
- [x] Lighthouse móvil ≥ 90 en las cuatro categorías (SEO medido con `INDEXABLE=true`).
- [x] `pnpm build` sin errores ni advertencias.

## Para aprobar

1. **Los textos nuevos de §2** (ventajas, comparación, preguntas y cierre). Puedes cambiar cualquier frase.
2. **La pregunta de validez legal** usa la Ley 27269 como placeholder (P11, P12). ¿La dejamos en la presentación o la quitamos hasta confirmarla?
3. **P20:** todos los "Comprar" usan el botón azul primario e ir a WhatsApp. Sigue pendiente tu aprobación de esa excepción a la regla de Girasol.

---

<!-- Desde aquí, solo cuando el spec está `aprobado`. -->

## 6. Plan técnico

- **Secciones como componentes** en `src/components/sections/`, sin textos fijos: reciben el contenido por props desde la página (constitución §4). Un `SectionHeading` común arma la etiqueta, el `h2` con su palabra en serif y la intro.
- **El documento del hero** pasa a `src/components/brand/DocumentoFirmado.astro`: es una ilustración.
- **Collection `faqs`** (`src/content/faqs.yaml`, loader `file()`) con `pregunta`, `respuesta`, `paginas` y `orden`. Las respuestas pueden usar variables (`{precio_certificado}`, `{precio_firmas}`, `{cantidad_firmas}`) que `src/lib/faqs.ts` rellena desde la collection `productos`.
- **Schema:** nuevo `serviceSchema()` en `schema.ts` (Service + dos Offer); el `FAQPage` sale del mismo arreglo que pinta el acordeón.
- **`/sistema-visual/`:** página con `noindex` fijo; la integración del sitemap la excluye con un `filter`.
- **Se elimina** `VerificacionIsla.tsx`.
- **Sin dependencias nuevas.**

## 7. Tareas

- [x] T1 Collection `faqs`, `lib/faqs.ts` y `serviceSchema()`.
- [x] T2 `SectionHeading` y las secciones: Hero, Ventajas, Productos, NecesitasLosDos, ComoFunciona, Preguntas, CtaCierre.
- [x] T3 Página de inicio con los textos aprobados; header con anclas.
- [x] T4 `/sistema-visual/` (noindex, fuera del sitemap); borrar la isla de prueba.
- [x] T5 Verificación: criterios de §5.

## 8. Notas de implementación

**2026-11-16**

- **Verificado:**
  - 7 secciones con `h1` + 6 `h2`, sin saltos de nivel.
  - JSON-LD `Organization`, `WebSite`, `Service` y `FAQPage`; las 6 preguntas y respuestas son idénticas a las visibles.
  - Acordeón exclusivo y con teclado; anclas sin quedar tapadas.
  - Sin desborde en 375, 768, 1024 y 1280px; en móvil la tabla se convierte en tarjetas.
  - `/sistema-visual/` con `noindex` y fuera del sitemap.
  - Lighthouse móvil 98 · 100 · 100 · 100 (LCP 2.1 s, CLS 0, TBT 0 ms).
- **Margen de anclas:** se cambió de 7rem (Girasol, con un menú más alto) a 4.5rem (`--fr-nav-offset`), porque nuestro header mide 64px. Antes quedaban unos 170px vacíos sobre el título al pulsar el menú.
- **Meta description generada** desde la collection: "firmas desde US$ 10" cambia solo si cambia el precio (P02).
- **Respuesta de precios** con variables (`{precio_certificado}`…) rellenadas desde `productos`. Una variable desconocida rompe el build.
- **Marcas de pendientes:** dos `PENDIENTE` en la misma línea de comentario no se detectan (el script reconoce una por comentario). Van en líneas separadas.
- **Capturas:** con la ventana detrás de otra, el navegador del panel no dibuja. La verificación final se hizo midiendo; conviene revisar la página a ojo.
