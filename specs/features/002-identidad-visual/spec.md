# [002] Identidad visual: "Tinta digital"

> Estado: `hecho` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Constitución: v0.3.0
> Dirección elegida por el usuario el 2026-11-16, entre tres propuestas (Tinta digital, Nube nocturna, Girasol + acento).

## 1. Contexto y objetivo

firmaremota.pe es un producto de Girasol, pero necesita **identidad propia**: con el design system de Girasol tal cual, se ve como una página más de girasol.pe. Este spec define una **sub-marca derivada**: se nota la familia, pero tiene personalidad propia.

**Objetivo medible:** que alguien que conoce girasol.pe reconozca el parentesco, y que al mismo tiempo la página no se confunda con girasol.pe en una captura.

**Fuera de alcance:** el inicio real (spec 003). Aquí se construyen los tokens, los componentes de marca y una **página de muestra** que reemplaza a la de verificación.

## 2. La idea

La firma remota es firmar documentos. La identidad toma el lenguaje del **documento firmado**: papel, tinta, la línea de firma, el sello. Y lo cruza con lo **digital**: código OTP, tipografía monoespaciada, la nube.

| Se hereda de Girasol (familia) | Es propio de firmaremota.pe |
|---|---|
| Navy `#0E035C` para títulos y fondos fuertes | Fondo **papel** cálido `#FBFAF7` en lugar de gris y degradados celestes |
| Outfit para títulos | **Azul tinta** `#2443D6` como color de acción (reemplaza `action #4489E8`) |
| Celeste `#65AFFF` (en reserva; hoy no se usa) | **Ámbar girasol** `#E8A33D` como acento cálido, guiño al nombre de la marca madre |
| | Outfit también para el texto (sin Poppins) |
| Contenedor, ritmo vertical y anclas | **Instrument Serif** en cursiva para resaltar palabras clave |
| Reglas: una acción por bloque, WhatsApp nunca verde, sombras teñidas | **JetBrains Mono** para etiquetas, datos y códigos |
| | Radios más rectos (10px / 16px) y tarjetas planas, como hojas |
| | Motivos: firma que se dibuja, línea de firma, sello, cuadrícula de papel |

**Bonus de accesibilidad:** el azul tinta tiene contraste **7.4:1** con texto blanco y **6.6:1** como texto sobre papel. Con eso se resuelve aquí el problema de contraste del azul de Girasol (P21).

### Reparto del color (ajuste del 2026-11-16)

La primera versión usaba el azul tinta en casi todo (títulos en serif, etiquetas, checks, sello, pasos) y la página se veía monocromática. Desde este ajuste:

| Color | Dónde va | Dónde no |
|---|---|---|
| **Azul tinta** | Solo lo que se pulsa: botones, enlaces, hover del menú, foco | Títulos, etiquetas, iconos, decoración |
| **Navy** | Títulos, palabras en serif sobre papel, checks, texto fuerte | — |
| **Gris `muted`** | Etiquetas mono, numeración, datos secundarios | — |
| **Ámbar girasol** | Decoración: sello, subrayado de la firma, punto de las etiquetas, punto del logotipo, "+" y "=" y la tarjeta de resultado sobre navy, serif sobre navy | **Nunca como texto sobre papel** (no llega a AA). Como texto, solo sobre navy (≈ 8:1) |

## 3. Tokens

Prefijo `fr-` (firmaremota). Viven en `src/styles/firmaremota/tokens.css`, escrito a mano porque son de este sitio, no de la skill.

| Token | Valor | Uso |
|---|---|---|
| `fr-paper` | `#FBFAF7` | Fondo de página |
| `fr-paper-2` | `#F3F1EA` | Secciones alternas |
| `fr-sheet` | `#FFFFFF` | Tarjetas ("hojas") |
| `fr-navy` | `#0E035C` | Títulos, fondos fuertes (heredado) |
| `fr-text` | `#1F263E` | Texto (heredado de `ink`) |
| `fr-muted` | `#555A6E` | Texto secundario (6.4:1 sobre papel) |
| `fr-tinta` | `#2443D6` | Acción: botones, enlaces, foco |
| `fr-tinta-hover` | `#1B34B0` | Hover de la acción |
| `fr-tinta-soft` | `#E9EDFC` | Fondos de chips y estados activos |
| `fr-ink` | `#16151C` | Tinta negra cálida: footer (texto blanco 9.3:1, ámbar 8.4:1) |
| `fr-girasol` | `#E8A33D` | Acento decorativo; como texto, solo sobre navy o tinta negra |
| `fr-girasol-soft` | `#FBEFD9` | Fondo suave cálido (reservado) |
| `fr-sky` | `#65AFFF` | Heredado, en reserva |
| `fr-line` | navy al 12 % | Bordes y líneas |
| Radios | control 10px · card 16px · pill | Más rectos que Girasol (12 / 24) |
| Sombras | `sheet`: 1px de línea + sombra corta teñida de navy · `lift` en hover · `button` teñida de tinta | Planas, de papel |
| Fuentes | `display`: Outfit · `serif`: Instrument Serif italic · `mono`: JetBrains Mono | — |

## 4. Componentes de marca

En `src/components/brand/`, todos en `.astro` (sin JS salvo la firma):

- **`Firma`**: trazo manuscrito en SVG que se dibuja al cargar, en ~1.4s. Sin JS o con "reducir movimiento" aparece completo.
- **`LineaFirma`**: separador "× ________" con una leyenda en mono, como en un documento.
- **`Sello`**: sello circular con texto "FIRMADO DIGITALMENTE · FIRMAREMOTA.PE ·". Gira muy lento; con "reducir movimiento" queda fijo.
- **`Etiqueta`**: eyebrow en mono, mayúsculas, con un punto de tinta.
- **`CodigoOtp`**: dígitos en celdas mono, para ilustrar el código que llega por WhatsApp.
- **`Logotipo`**: "firmaremota" en Outfit + ".pe" en tinta. Es provisional hasta tener el logo (P19).

Además, un **`Header`** y un **`Footer`** simples en `src/components/layout/`. Los usará el inicio.

## 5. Página de muestra (reemplaza la de verificación)

Se ve como una web real, con contenido confirmado (`site.md`), y al final muestra el sistema:

1. **Header**: logotipo + botón "Comprar".
2. **Hero**: etiqueta, título con una palabra en serif, la firma que se dibuja, subtítulo, CTA "Comprar" + "Cómo funciona", y una tarjeta-documento con sello y código OTP.
3. **Los dos productos**: certificado y bolsa de firmas, desde la collection, con "Incluye IGV".
4. **"Necesitas los dos"**: certificado + firmas = puedes firmar.
5. **Cómo funciona**: 3 pasos (compras por WhatsApp → recibes usuario y contraseña → firmas con PIN + OTP).
6. **Sistema visual**: colores, tipografía, botones y la isla React de prueba.
7. **Footer**: razón social (placeholder P13) y "Un producto de Girasol" (P14).

## 6. SEO

Sin cambios respecto al 001: la página sigue con `noindex` mientras haya pendientes. Lleva un `h1` y un `h2` por sección.

## 7. Criterios de aceptación

Verificados el 2026-11-16.

- [x] Los colores, radios, sombras y fuentes de §3 están disponibles como clases (`bg-fr-paper`, `text-fr-tinta`, `rounded-fr-card`, `shadow-fr-sheet`, `font-fr-serif`, `font-fr-mono`).
- [x] El tema de shadcn apunta a los tokens `fr-`: un `Button` sale en azul tinta.
- [x] Contraste AA en todo texto: Lighthouse Accesibilidad **100** (antes 93 con el azul de Girasol).
- [x] La firma se dibuja al cargar y termina completa. Es solo CSS: sin JS también se dibuja, y con "reducir movimiento" aparece entera.
- [x] El sello no gira con "reducir movimiento".
- [x] Sin desborde lateral en 375, 768, 1024 y 1280px, con las secciones alineadas al contenedor.
- [x] Lighthouse móvil: Performance 98 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 (LCP 2.1 s, CLS 0, TBT 0 ms).
- [x] Ningún dato inventado: precios, WhatsApp y razón social salen de `site.ts` y de la collection.

## 8. Plan técnico

- `src/styles/firmaremota/tokens.css`: variables `--fr-*` y su `@theme inline`.
- `global.css`: importa los tokens `fr`; el tema de shadcn y el foco apuntan a `fr`; fondo papel.
- `astro.config.mjs`: fuentes Outfit (400–800), Instrument Serif (italic 400) y JetBrains Mono (500). Se quita Poppins.
- `button.tsx`: variantes con tokens `fr`.
- Los tokens de Girasol se siguen generando e importando: el layout (`gs-container`, `gs-section`) y los valores heredados salen de ahí.
- `reveal.ts`: se suma el dibujo de la firma (`data-firma`), con las mismas reglas de movimiento.

## 9. Tareas

- [x] T1 Constitución v0.3.0 (§6 pasa a "sub-marca derivada").
- [x] T2 Tokens `fr`, `global.css`, fuentes y `button.tsx`.
- [x] T3 Componentes de marca + Header y Footer.
- [x] T4 Página de muestra.
- [x] T5 Verificación: criterios de §7.

## 10. Notas de implementación

**2026-11-16**

- **Firma solo con CSS** (`pathLength="1"` + `stroke-dashoffset`), no con GSAP: funciona aunque falle el JS y no depende de ScrollTrigger.
- **`transition-all` choca con GSAP:** las tarjetas de productos tenían `transition-all` para el hover, y la transición CSS interceptaba la opacidad que anima `data-reveal`, con lo que la entrada se trababa. Se limitó a `transition-[translate,box-shadow]` y la regla quedó documentada en `reveal.ts`.
- **Texto legible ≥ 12px:** el texto del sello estaba a 9.2px y las etiquetas a 10–11px; Lighthouse lo marcaba (Buenas prácticas 96). Las etiquetas (`fr-eyebrow`) pasaron a 12px y el sello a 14.5px, con el texto "Firmado digitalmente ·" ajustado a la vuelta con `textLength`.
- **Mensaje de WhatsApp genérico para el certificado** (`certificadoGeneral` en `site.ts`, P10): la tarjeta del certificado no tiene un plan elegido, así que no puede usar el mensaje de un plan concreto.
- **Fuentes:** sale Poppins y entran Instrument Serif (italic 400) y JetBrains Mono (500). Son 7 archivos de fuente en total; el LCP sigue en 2.1 s.
- **P21 (contraste):** resuelto en este sitio con el azul tinta. Sigue abierto para el design system de Girasol.
- **Ajuste de color (pedido del usuario):** el azul quedó solo en lo accionable y se sumó el ámbar girasol (ver §2, "Reparto del color"). El logotipo pasa a "firma*remota*•pe", con el punto en ámbar (el "." real queda para lectores de pantalla). Lighthouse móvil después del ajuste: 98 · 100 · 100 · 100.
- **Footer en tinta negra** (`fr-ink`, pedido del usuario): antes era navy, igual que la sección "Necesitas los dos", y se sentía repetido. Contraste medido: blanco al 60 % 7.1:1, al 70 % 9.3:1, ámbar 8.4:1.
- **Verificación visual con el panel oculto:** las animaciones (CSS y GSAP) quedan congeladas. Se comprobaron adelantando su línea de tiempo y midiendo; conviene verlas con el panel visible o en tu navegador.
