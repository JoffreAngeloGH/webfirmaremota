# [009] Precios sin IGV: mostrar "+ IGV"

> Estado: `en-curso` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Aprobado por el usuario el 2026-11-16: los precios **no incluyen IGV**. Se muestra el precio base con "+ IGV", en **todos** los productos (certificados y bolsas), **sin calcular el total** (lo da el asesor). Registrado en `specs/pendientes.md` ("Confirmados antes", fila IGV).
> Constitución: v0.4.0 (verificación ligera; sin Lighthouse) · Depende de: 008 (implementado)
> Lo implementa otra sesión. Este spec trae todo lo necesario.

## 1. Contexto y objetivo

Hasta ahora la web decía que los precios **incluían** IGV ("Incluye IGV", "Precios con IGV incluido", "Todos los precios incluyen IGV"). Es un error: el IGV se suma al precio. Los montos (US$ 20.00, US$ 34.00 y las bolsas) **no cambian**; cambia cómo se presentan.

**Objetivo medible:** que ningún texto de la web diga que el IGV está incluido, y que cada precio visible lleve "+ IGV".

**Fuera de alcance:** calcular el total con IGV, cambiar los montos y tocar los textos legales (`src/content/legales/*.md` se copian tal cual de su fuente y no se editan).

## 2. Contenido

| Dónde | Antes | Después |
|---|---|---|
| Junto a cada precio (tarjetas, matriz, páginas por titular, isla `CertificadoPlanes`, selector y tabla de bolsas, tarjeta de firmas del inicio) | "Incluye IGV" (nota debajo) | **"+ IGV"** pegado al precio, en la misma línea: el precio en grande y "+ IGV" más pequeño, en `fr-muted`. En la tabla de bolsas, el encabezado de columna dice "Total (+ IGV)" y las celdas solo el monto |
| `src/config/secciones.ts` → `notaAtencion` | "Te atiende un asesor por WhatsApp · Precios con IGV incluido" | "Te atiende un asesor por WhatsApp · **Precios no incluyen IGV**" |
| `src/content/faqs.yaml` → `cuanto-cuesta` | "…Todos los precios incluyen IGV." | "…**Los precios no incluyen IGV.**" |
| Mensaje de WhatsApp de bolsas (`site.ts`) | "…bolsa de {cantidad} firmas ({total})." | "…bolsa de {cantidad} firmas ({total} + IGV)." |
| `src/content/productos.yaml` | `incluyeIgv: true` en las 12 entradas; comentario "con IGV incluido" | `incluyeIgv: false` en las 12; comentario "Precios en dólares, sin IGV (se muestra "+ IGV")" |

Buscar con `grep -rni "igv" src` (excluyendo `src/content/legales/`) y no dejar ninguna frase que diga "incluye" o "incluido" referida al IGV.

## 3. Comportamiento

- **Una sola fuente para la nota:** una función en `src/lib/format.ts`, por ejemplo `notaIgv(incluyeIgv: boolean)`, que devuelve `"+ IGV"` si es `false` e `"Incluye IGV"` si es `true`. La usan `src/lib/planes.ts`, `src/pages/index.astro` (que hoy tiene su propio `iva()`) y todo componente que muestre la nota. Si algún día un producto sí incluye IGV, basta con cambiar el dato.
- **La nota viaja como dato o prop**, no como texto fijo en los componentes (constitución §4).
- **En la isla `CertificadoPlanes`** y en el selector de bolsas, "+ IGV" acompaña al precio animado y queda **fuera** del `SlidingNumber`. El texto para lectores de pantalla (`aria-live` / `sr-only`) pasa a decir, por ejemplo, "US$ 20.00 más IGV".
- **Schema (`src/lib/seo/schema.ts`):** cada `Offer` agrega `priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency, valueAddedTaxIncluded: false }`, manteniendo `price` y `priceCurrency`.

## 4. SEO

Solo el cambio de schema de §3. Si alguna `description` menciona el IGV, se corrige.

## 5. Criterios de aceptación

**Verificación ligera** (constitución §11.1): sin Lighthouse.

- [x] `grep -rni "incluye igv\|igv incluido\|incluyen igv"` sobre `src/` (sin `legales`) y sobre `dist/` no encuentra nada. En `dist/` puede aparecer solo dentro de `/terminos-y-condiciones/`, si el texto legal lo menciona.
- [x] Cada precio visible en `/`, `/certificado-digital/`, las dos páginas por titular y `/firmas/` lleva "+ IGV" (contar en el HTML generado).
- [x] El JSON-LD de las páginas con precios tiene `valueAddedTaxIncluded: false` en sus ofertas.
- [x] El mensaje de WhatsApp de una bolsa dice "+ IGV".
- [x] Capturas en 375 y 1440 px de una tarjeta de plan y del selector de bolsas: "+ IGV" en la misma línea que el precio, sin desborde.
- [x] `pnpm build` sin errores ni advertencias.

---

## 6. Plan técnico

**Archivos que cambian:**
- `src/content/productos.yaml`
- `src/lib/format.ts` (`notaIgv`)
- `src/lib/planes.ts`
- `src/pages/index.astro`
- `src/config/secciones.ts`
- `src/config/site.ts` (mensaje de bolsas)
- `src/content/faqs.yaml`
- `src/lib/seo/schema.ts`
- Los componentes que muestran la nota: `MatrizPlanes`, `CertificadoPlanes.tsx`, el selector y la tabla de bolsas, la tarjeta de firmas, las páginas por titular. Ajustar el layout para que "+ IGV" vaya en línea con el precio.
- `specs/pendientes.md`: marcar la fila IGV como "Aplicado en el código (spec 009)".

**Reglas y trampas conocidas**
- Constitución v0.4.0; reparto del color del spec 002 (azul tinta solo en lo que se pulsa).
- **Sin textos fijos en `src/components/sections/`** (constitución §4).
- **`SlidingNumber`** no muestra dígitos en SSR: no meter "+ IGV" dentro de él.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular.
- **No editar `src/content/legales/`.**
- **Antes de empezar, revisar `git status`:** si hay cambios sin commit que no sean de este spec, **preguntar al usuario** antes de tocarlos o incluirlos en el commit.
- **Servidor de desarrollo:** uno solo por proyecto; si hay que reiniciarlo, avisar al usuario.
- **Git:** commit **sin** `Co-Authored-By` ni mención de la IA; mensaje `[009] …`; **no hacer push**.

## 7. Tareas

- [x] T1 `notaIgv` en `format.ts`, datos (`productos.yaml`, `secciones.ts`, `site.ts`, `faqs.yaml`).
- [x] T2 Componentes e isla: "+ IGV" en línea con el precio; texto accesible.
- [x] T3 Schema con `valueAddedTaxIncluded: false`.
- [x] T4 Verificación ligera de §5. Anotar en §8, actualizar `pendientes.md` y dejar el spec en `en-curso`.

## 8. Notas de implementación

**2026-11-16**

Verificación **ligera** (constitución §11.1): `pnpm build`, las comprobaciones de §5 y capturas puntuales en 375 y 1440 px, con Chrome sin interfaz sobre `pnpm astro preview` (el build de `dist/`). **No se corrió Lighthouse.** Antes de empezar se hizo un commit aparte con los cambios de texto del usuario ("Ajustes de textos").

**Verificado**
- `pnpm build`: 0 errores, 0 advertencias, 9 páginas. `pnpm pendientes` lista solo P19.
- **Greps.** En `src/` (sin `legales`) no queda ninguna frase que diga que el IGV está incluido. El patrón del spec (`incluyen igv`) también atrapa "Precios **no** incluyen IGV" y "Los precios **no** incluyen IGV", que son el texto nuevo; y `format.ts` conserva las dos ramas de `notaIgv` (`true` → "Incluye IGV"), que es la lógica y no una frase publicada. En `dist/`, un `grep` que excluye el "no" (`incluye IGV`, `IGV incluido`, `con IGV`, `incluyen IGV` precedido de otra palabra que no sea "no") no encuentra nada fuera de `/terminos-y-condiciones/`, donde el texto legal dice "la tarifa publicada, que incluye IGV" (no se edita, por regla).
- **"+ IGV" junto a cada precio** (medido en el navegador, precio por precio):
  - Inicio: tarjeta del certificado (US$ 20.00 + IGV), tarjeta de firmas (US$ 10.00 + IGV) y el punto "desde US$ 0.50 c/u + IGV".
  - `/certificado-digital/` y las dos páginas por titular: el chip "Desde US$ 20.00 + IGV" y cada plan de la matriz (US$ 20.00 + IGV y US$ 34.00 + IGV).
  - `/firmas/`: el chip "Desde US$ 0.50 por firma + IGV", el total del selector y el encabezado "Total (+ IGV)" de la tabla (las celdas llevan solo el monto, como pide el spec).
- **JSON-LD:** todas las ofertas (12 en el inicio, 4 en `/certificado-digital/`, 2 en cada página por titular y 8 en `/firmas/`) traen `priceSpecification` con `UnitPriceSpecification`, el mismo `price` y `priceCurrency` y `valueAddedTaxIncluded: false`.
- **WhatsApp de bolsas:** "Hola, quiero comprar una bolsa de 20 000 firmas (US$ 10,000.00 + IGV)." (en las 8 bolsas el mensaje sale de la misma plantilla de `site.ts`).
- **Accesibilidad:** el aviso `aria-live` de la isla del certificado dice "Certificado digital persona natural · 1 año: US$ 20.00 más IGV"; el del selector, "20 000 firmas: US$ 10,000.00 más IGV", y `aria-valuetext` termina en "más IGV".
- **Sin JS:** el selector muestra "US$ 10.00 + IGV".
- **Capturas** (375 y 1440 px) de una tarjeta de plan de la matriz, de las tarjetas del inicio y del selector: "+ IGV" en la misma línea que el precio y sin desborde lateral.

**Decisiones**
- `notaIgv(incluyeIgv)` y `notaIgvAccesible(incluyeIgv)` en `src/lib/format.ts` son la única fuente de la nota. Las usan `lib/planes.ts`, `index.astro` (se eliminó su `iva()`) y las páginas; `incluyeIgv` está en `false` en las 12 entradas de `productos.yaml`.
- La nota ya no va arriba a la derecha de las tarjetas (ni como "Incluye IGV" debajo del precio): viaja como prop (`nota`, `notaSr`, `igv`, `igvSr`) y se pinta en la misma línea que el precio, fuera del `SlidingNumber`.
- **A 375 px el total más largo (US$ 10000.00) empujaba "+ IGV" a otra línea**; se bajó el tamaño del total del selector en pantallas angostas (1.9rem; desde `sm` vuelve a 2.6rem) y se comprobó con el total de 20 000 firmas.
- Se agregó "+ IGV" también a los precios "Desde …" de los chips de las páginas de certificado y de firmas y al punto "desde US$ 0.50 c/u" del inicio, porque el criterio dice "cada precio visible".
- **No** llevan "+ IGV" los precios derivados que aclaran a otro que ya lo lleva: "US$ 17.00 por año" (matriz), "US$ 0.90 por firma" (selector) y la columna "Precio por firma" de la tabla. Si prefieres que también lo lleven, es un cambio de props.
- Las `description` (meta) no mencionan el IGV; no se tocaron. `schema-dts` acepta `priceSpecification` en `Offer`.

**Pendiente**
- Lighthouse y el barrido completo, antes del push (§11.2).
- P19 y P22 siguen pendientes.
