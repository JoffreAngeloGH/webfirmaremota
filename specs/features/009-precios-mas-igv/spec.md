# [009] Precios sin IGV: mostrar "+ IGV"

> Estado: `aprobado` · Creado: 2026-11-16 · Actualizado: 2026-11-16
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

- [ ] `grep -rni "incluye igv\|igv incluido\|incluyen igv"` sobre `src/` (sin `legales`) y sobre `dist/` no encuentra nada. En `dist/` puede aparecer solo dentro de `/terminos-y-condiciones/`, si el texto legal lo menciona.
- [ ] Cada precio visible en `/`, `/certificado-digital/`, las dos páginas por titular y `/firmas/` lleva "+ IGV" (contar en el HTML generado).
- [ ] El JSON-LD de las páginas con precios tiene `valueAddedTaxIncluded: false` en sus ofertas.
- [ ] El mensaje de WhatsApp de una bolsa dice "+ IGV".
- [ ] Capturas en 375 y 1440 px de una tarjeta de plan y del selector de bolsas: "+ IGV" en la misma línea que el precio, sin desborde.
- [ ] `pnpm build` sin errores ni advertencias.

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

- [ ] T1 `notaIgv` en `format.ts`, datos (`productos.yaml`, `secciones.ts`, `site.ts`, `faqs.yaml`).
- [ ] T2 Componentes e isla: "+ IGV" en línea con el precio; texto accesible.
- [ ] T3 Schema con `valueAddedTaxIncluded: false`.
- [ ] T4 Verificación ligera de §5. Anotar en §8, actualizar `pendientes.md` y dejar el spec en `en-curso`.

## 8. Notas de implementación

_(vacío)_
