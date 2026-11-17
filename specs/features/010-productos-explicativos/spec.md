# [010] Sección Productos que se explica sola

> Estado: `hecho` (aprobado por el usuario el 2026-11-17; falta el commit) · Creado: 2026-11-17 · Actualizado: 2026-11-17
> Decisiones del usuario (2026-11-17): analogía **identidad + saldo**; tarjeta de firmas con **escalera de precios** fija (no selector); **un solo enlace** bajo el certificado que sigue al titular elegido; las firmas **funcionan con certificados de otro proveedor**, pero el texto invita a comprar los dos aquí sin afirmar que no se puede de otra forma.
> Constitución: v0.4.0 (verificación ligera; sin Lighthouse) · Depende de: 009 (implementado)
> Lo implementa otra sesión con la skill **impeccable** (`.claude/skills/impeccable/`), en modo refinamiento. Este spec trae todo lo necesario.

## 1. Contexto y objetivo

La sección `#productos` del inicio (dos tarjetas: certificado y firmas) da por hecho que el visitante ya sabe qué es un certificado digital, qué es "una firma" como producto y cuál titular elegir. Problemas concretos:

- La intro ("Dos piezas, una firma") es abstracta: no dice **qué hace cada pieza**.
- El selector de titular no ayuda a elegir: no dice para qué sirve cada uno.
- Los puntos del certificado **repiten los selectores** ("Dos certificados…", "Vigencia de 1 o 2 años") en vez de responder dudas reales (cuánto tarda, qué necesito).
- Hay **tres enlaces** bajo el botón, y uno ("Ver los 4 planes") sobra porque los selectores ya muestran los 4.
- La tarjeta de firmas no explica **qué cuenta como una firma**. Muestra solo la bolsa mínima y deja un **hueco vacío** antes del botón. Además dice "Sirven con tu certificado comprado a nosotros", que **contradice** la FAQ `certificado-de-otro-proveedor` y no es cierto.

**Objetivo medible:** alguien que no conoce el producto, solo con esta sección, puede responder: qué es el certificado, qué es una firma, cuántas se gastan al firmar un documento, qué titular le toca y cuánto tarda en estar listo.

**Fuera de alcance:** la sección `NecesitasLosDos` (que va justo después; ver §8 si queda redundante), las páginas `/certificado-digital/`, `/firmas/` y las de titular, los precios y el diseño general de la marca (tokens, tipografías, colores: se mantienen).

## 2. Contenido

Todo texto nuevo vive en `src/pages/index.astro` (props) o en las collections. **Nada fijo en los componentes** (constitución §4).

### Encabezado de la sección

| Elemento | Antes | Después |
|---|---|---|
| Etiqueta, título, acento | "Productos" · "Dos piezas," · "una firma." | Sin cambios |
| `intro` | "Son productos distintos y los compras por separado, pero para firmar necesitas los dos." | "**El certificado es tu identidad: dice quién firma. Las firmas son el saldo para usarla: cada vez que firmas, se descuenta una.** Se compran por separado y necesitas los dos." |

### Tarjeta 01 · Certificado digital

| Elemento | Antes | Después | Fuente |
|---|---|---|---|
| Título | "Tu identidad para firmar" | Sin cambios | — |
| Bajada (nueva, debajo del título) | — | "Demuestra que el documento lo firmaste tú, o tu empresa, con validez legal. Lo pagas una vez y dura 1 o 2 años." | P05, P11; las vigencias salen de la collection (como `vigenciasTexto`) |
| Ayuda del titular (nueva, debajo del selector "Titular"; cambia con la elección) | — | **Natural:** "Para firmar a tu nombre: contratos, solicitudes y declaraciones." · **Jurídica:** "Para firmar en nombre de tu empresa, como representante legal o con poderes." | P05 / `titulares.yaml` |
| Línea del plan (mono) | "Certificado digital persona natural · 1 año" | Sin cambios | `productos` |
| Precio | "US$ 20.00 + IGV" | Sin cambios | `productos` |
| Equivalencia anual (nueva, solo si la vigencia es mayor de 1 año) | — | "Equivale a US$ 17.00 por año". Sin "+ IGV", igual que en la matriz (decisión del spec 009) | Cálculo de `precio / vigenciaAnios`; reutilizar la lógica de `src/lib/planes.ts` |
| Puntos (cambian con el titular) | 3 fijos que repetían los selectores | **Natural:** "Listo en aprox. 1 hora, después de validar tu identidad" · "Necesitas tu DNI o CE vigente" · "Vive en la nube: no hay archivo ni token que instalar". **Jurídica:** el mismo primero y el mismo último; el del medio: "Necesitas tu DNI o CE, el RUC de la empresa y una vigencia de poder" | P09, P07, P08 |
| Botón | "Comprar certificado" | Sin cambios (WhatsApp del plan elegido) | — |
| Enlaces bajo el botón | "Ver los 4 planes" + "Persona natural" + "Persona jurídica" | **Uno solo**, que sigue al titular: "Requisitos y detalles: persona natural" → `/certificado-digital/persona-natural/` · "Requisitos y detalles: persona jurídica" → `/certificado-digital/persona-juridica/` | — |

### Tarjeta 02 · Firmas

| Elemento | Antes | Después | Fuente |
|---|---|---|---|
| Título | "El saldo que usas al firmar" | Sin cambios (encaja con la analogía) | — |
| Bajada (nueva) | — | "Cada vez que firmas un documento se descuenta 1 firma de tu bolsa. Si un documento lleva 3 firmas, se descuentan 3." | P04 / FAQ `que-cuenta-como-firma` |
| Ilustración `FichasFirmas` (×10) | Sí | **Se quita de esta tarjeta.** Su lugar lo ocupa la escalera | — |
| Escalera de precios (nueva) | — | Título pequeño: "Mientras más compras, menos pagas por firma". Tres filas: **10 firmas · US$ 1.00 c/u**, **1 000 firmas · US$ 0.85 c/u**, **20 000 firmas · US$ 0.50 c/u** | Collection `productos`: las cantidades se eligen en `index.astro` (`[10, 1000, 20000]`) y precio y formato salen de la collection; si una cantidad no existe, el build falla |
| Línea del plan (mono, nueva; misma forma que en el certificado) | — | "Bolsa mínima · 10 firmas" | `productos` |
| Precio | "US$ 10.00 + IGV" | Sin cambios | `productos` |
| Puntos | "Desde 10 firmas" · "Hasta 20 000 firmas, desde US$ 0.50 c/u + IGV" · "Las firmas no vencen" · "Sirven con tu certificado comprado a nosotros" | "Las firmas no vencen: las usas a tu ritmo" · "Funcionan con tu certificado, aunque sea de otro proveedor" · "Si también compras tu certificado aquí, un mismo asesor te ayuda con los dos" | Decisión del usuario (2026-11-17); los dos primeros puntos se quitan porque la escalera ya los dice |
| Botón | "Comprar firmas" | Sin cambios (WhatsApp de la bolsa mínima) | — |
| Enlace | "Ver bolsas de firmas" | "Ver todas las bolsas" → `/firmas/` | — |

### FAQ

| Dónde | Antes | Después |
|---|---|---|
| `src/content/faqs.yaml` → `certificado-de-otro-proveedor` | "Sí. Puedes comprarnos solo las firmas y usarlas con tu certificado, o comprarnos el certificado y gestionar tus firmas por otro lado." | Se mantiene y se agrega al final: "Si compras los dos con nosotros, un mismo asesor te ayuda con el certificado y las firmas." |

### `specs/pendientes.md`

Agregar en "Confirmados", en la tabla de "Productos y precios", **P26**: "Las firmas funcionan con certificados de otro proveedor (confirmado el 2026-11-17). La web lo dice sin rodeos, pero invita a comprar los dos aquí. **Aplicado en el código (spec 010).**"

## 3. Comportamiento

- **Estructura:** se mantienen las dos tarjetas en rejilla (`md:grid-cols-2`) con la identidad "Tinta digital" (constitución §6). Es un **refinamiento**: no se cambian colores, tipografías, radios ni sombras.
- **Orden dentro de cada tarjeta:** etiqueta → título → bajada → (certificado: selectores con ayuda del titular | firmas: escalera) → línea del plan → precio + "+ IGV" (+ equivalencia anual) → puntos → botón → enlace. Así las dos tarjetas tienen el mismo ritmo y el precio queda a una altura parecida en escritorio.
- **Sin hueco vacío:** en la tarjeta de firmas, la escalera ocupa el espacio que hoy queda vacío. El espaciador `flex-1` solo debe empujar el botón al fondo, sin dejar un bloque en blanco notorio a 1440 px.
- **Escalera:** es una lista (`<ul>` o `<table>` con `caption`), no una imagen. Puede llevar una barra horizontal por fila, proporcional al precio por firma, para que se **vea** que baja. Las barras son `aria-hidden` y usan los colores de la marca, sin degradados.
- **Ayuda del titular, puntos y enlace dinámicos:** cambian al instante con el radio "Titular", sin animación de entrada. La ayuda se asocia al `fieldset` con `aria-describedby`.
- **Equivalencia anual:** aparece solo con la vigencia de 2 años y no reserva espacio cuando no está. No debe hacer saltar el precio: va debajo.
- **Sin JS:** la isla se renderiza con el plan inicial (natural · 1 año): ayuda, puntos y enlace de persona natural. La escalera es estática (`.astro`), así que se ve completa.
- **Animación:** sin animaciones nuevas. Se mantienen el `SlidingNumber` del precio y el resaltado de los selectores. `prefers-reduced-motion` se respeta como hoy (`MotionConfig reducedMotion="user"`).

## 4. SEO

Es una sección. No cambia el `h2` ni el ancla `#productos`. El schema no cambia (las ofertas son las mismas). La FAQ editada actualiza el `FAQPage` del inicio de forma automática.

## 5. Criterios de aceptación

**Verificación ligera** (constitución §11.1): sin Lighthouse.

- [ ] La intro de la sección dice qué es el certificado y qué son las firmas (analogía identidad + saldo).
- [ ] Al cambiar "Titular" en la tarjeta del certificado cambian la ayuda, el punto de requisitos y el enlace (comprobado en el navegador con ambos titulares).
- [ ] Con 2 años aparece "Equivale a US$ 17.00 por año"; con 1 año no aparece y el precio no salta.
- [ ] Bajo el botón del certificado hay **un** enlace y lleva a la página del titular elegido.
- [ ] La tarjeta de firmas explica qué cuenta como firma y muestra la escalera con 10, 1 000 y 20 000 firmas y sus precios por firma, tomados de la collection.
- [ ] Ningún texto de `src/` dice que las firmas solo sirven con un certificado nuestro (`grep -rni "comprado a nosotros" src` vacío).
- [ ] La FAQ `certificado-de-otro-proveedor` tiene la frase nueva y `pendientes.md` tiene P26.
- [ ] No quedan textos fijos nuevos en `src/components/` (todo llega por props o collection).
- [ ] Capturas en 375 y 1440 px de la sección completa: sin desborde y sin hueco vacío notorio en la tarjeta de firmas.
- [ ] Se ve completa sin JS.
- [ ] `pnpm build` sin errores ni advertencias.

---

## 6. Plan técnico

**Archivos que cambian:**
- `src/pages/index.astro`: intro nueva y props nuevas para las dos piezas (bajadas, ayuda por titular, puntos por titular, enlace por titular, escalera, línea de la bolsa mínima).
- `src/components/sections/Productos.astro`: tipos `PiezaCertificado` y `PiezaFirmas` y el markup de la tarjeta de firmas (bajada, escalera, línea del plan; se quita `FichasFirmas` de aquí, **no** se borra el componente).
- `src/components/islands/CertificadoPlanes.tsx`: bajada, ayuda del titular, puntos y enlace por titular, equivalencia anual.
- `src/lib/planes.ts`: si hace falta, exportar el cálculo de "por año" para no duplicarlo.
- `src/content/faqs.yaml` (`certificado-de-otro-proveedor`).
- `specs/pendientes.md` (P26).

**Forma sugerida de los datos (ajustable):**
- `PiezaCertificado`: `bajada: string`; en `titulares[]` se suman `ayuda: string`, `puntos: string[]` y `enlace: { label, href }`. Se quitan `puntos` (global), `enlace` y `enlacesTitular`. Se suma `porAnio?: (plan) => string` o, mejor, el texto ya calculado en cada `PlanCertificado` (`porAnioTexto?: string`), para no pasar funciones a la isla.
- `PiezaFirmas`: `bajada: string`, `lineaPlan: string`, `escalera: { titulo: string; filas: { cantidad: string; precioUnitario: string; valor: number }[] }`. Se quita `cantidad` si ya no se usa.

**Dependencias nuevas:** ninguna.

**Reglas y trampas conocidas:**
- Constitución v0.4.0. Reparto del color del spec 002: el azul tinta solo en lo que se pulsa. Las barras de la escalera van en navy o en un tono de línea, nunca en azul tinta.
- **Sin textos fijos en `src/components/`** (constitución §4).
- **`SlidingNumber`** no muestra dígitos en SSR: no meter textos nuevos dentro de él.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular.
- **No crear `PRODUCT.md` ni `DESIGN.md`** ni correr `impeccable init`: la fuente de diseño de este proyecto es la constitución §6 y el spec 002.
- **Antes de empezar, revisar `git status`:** si hay cambios sin commit que no sean de este spec, **preguntar al usuario** antes de tocarlos o incluirlos en el commit.
- **Servidor de desarrollo:** uno solo por proyecto; si hay que reiniciarlo, avisar al usuario.
- **Git:** commit **sin** `Co-Authored-By` ni mención de la IA; mensaje `[010] …`; **no hacer push**.

## 7. Tareas

- [x] T1 Datos y textos: `index.astro` (intro y props), `faqs.yaml`, `pendientes.md` (P26).
- [x] T2 Isla `CertificadoPlanes`: bajada, ayuda, puntos y enlace por titular, equivalencia anual.
- [x] T3 Tarjeta de firmas en `Productos.astro`: bajada, escalera, línea del plan, puntos nuevos.
- [x] T4 Pasada de impeccable (`clarify` y luego `polish`) sobre la sección: jerarquía, ritmo entre tarjetas, alineación del precio y móvil.
- [x] T5 Verificación ligera de §5. Anotar en §8, incluida una nota breve sobre **qué aportó impeccable** (qué detectó o cambió que no estaba en el spec). Dejar el spec en `en-curso`.

## 8. Notas de implementación

**Verificado (2026-11-17, verificación ligera, sin Lighthouse):**
- `pnpm build` sin errores ni advertencias (incluye `astro check`).
- Navegador, 1440 px: al cambiar "Titular" cambian ayuda (`aria-describedby` en el `fieldset`), punto de requisitos y enlace (natural ⇄ jurídica). Con 2 años aparece "Equivale a US$ 17.00 por año"; con 1 año no aparece y el precio queda a la misma altura (431 px desde el borde de la tarjeta en ambos casos). Un solo enlace bajo el botón.
- Escalera: 10 / 1 000 / 20 000 firmas a US$ 1.00 / 0.85 / 0.50 c/u desde la collection; barras de 194 / 165 / 97 px (proporcionales al precio por firma), en navy y `aria-hidden`.
- 375 y 1440 px: sin desborde horizontal; en 375 las tres filas de la escalera miden lo mismo (ninguna se parte).
- Sin JS: el HTML generado (`dist/index.html`) ya trae la ayuda, los puntos y el enlace de persona natural, la bajada con "1 o 2 años" y la escalera completa.
- `grep -rni "comprado a nosotros" src` vacío. FAQ `certificado-de-otro-proveedor` con la frase nueva; P26 en `pendientes.md`. No quedan textos fijos nuevos en componentes (los textos llegan por props).
- No se hicieron capturas guardadas; la revisión visual fue en el panel del navegador.

**Qué aportó impeccable:** el programa `impeccable context` corrió (sin PRODUCT.md, modo refinamiento sobre el código existente) y `impeccable detect --changed` no encontró problemas. El craft-floor llevó a tres cambios que el spec no pedía: (1) el título de la escalera pasó de etiqueta mono en mayúsculas a texto normal en navy (una frase larga en mayúsculas mono pesaba y se acercaba al patrón "eyebrow"); (2) las filas de la escalera subieron de alto (`py-3.5`) para reducir el hueco antes del botón en la tarjeta de firmas; (3) `table-fixed` con anchos por columna, porque las barras colapsaban a un ancho idéntico y "20 000 firmas" se partía en móvil.

**Pendiente de decisión (otro spec):** `NecesitasLosDos` ("Con certificado y sin firmas no puedes firmar…") queda repitiendo la intro nueva y además choca con el mensaje de que las firmas funcionan con certificados de otro proveedor. Conviene revisarlo.

**Observación menor:** con 1 año, la tarjeta de firmas deja unos 60 px de aire antes del botón a 1440 px (el espaciador solo empuja el botón al fondo); no se considera un hueco notorio.

---

## 9. Iteración 2 (2026-11-17): bolsas seleccionables y enlaces que invitan a hacer clic

> Aprobada por el usuario el 2026-11-17 después de ver la iteración 1. Se implementa sobre lo que ya está hecho (iteración 1, aún sin commit).

### 9.1 Qué pidió el usuario

1. **Firmas: que el usuario no tenga que calcular.** Hoy la escalera muestra solo el precio por firma ("US$ 0.85 c/u") y el total hay que sacarlo a mano. Cada fila debe mostrar el **total de la bolsa**.
2. **Que la bolsa se pueda elegir** y que, al elegirla, cambien el precio grande y el **mensaje de WhatsApp** del botón.
3. **Los enlaces "Requisitos y detalles: …" y "Ver todas las bolsas" no invitan a hacer clic.** Se ven como texto suelto.

### 9.2 Tarjeta de firmas

| Elemento | Iteración 1 | Iteración 2 |
|---|---|---|
| Escalera | Tabla fija: cantidad · barra · precio por firma | **Grupo de radios** (`fieldset` + `legend`) con las **mismas 3 bolsas** (10, 1 000 y 20 000). **Sin barras.** |
| Cada fila | "1 000 firmas · ▬▬ · US$ 0.85 c/u" | Radio + **"1 000 firmas"** a la izquierda; **total** a la derecha, en negrita y tamaño legible ("US$ 850.00"); debajo, en pequeño y `fr-muted`: "US$ 0.85 c/u · Ahorras 15 %". La bolsa mínima no lleva "Ahorras" (ahorro 0): solo "US$ 1.00 c/u". Sin "+ IGV" en las filas (el precio grande ya lo lleva, decisión del spec 009) |
| Título del grupo (`legend`) | "Mientras más compras, menos pagas por firma" | Sin cambios |
| Selección inicial | — | La bolsa mínima (10 firmas). Así el HTML sin JS coincide con lo de hoy |
| Línea del plan (mono) | "Bolsa mínima · 10 firmas" | Sigue a la elección: "Bolsa de 10 firmas" · "Bolsa de 1 000 firmas" · "Bolsa de 20 000 firmas" |
| Precio grande | US$ 10.00 + IGV, fijo | **Total de la bolsa elegida** + "+ IGV", con `SlidingNumber` después de hidratar (mismo patrón que la tarjeta del certificado). Para lectores de pantalla, `aria-live`: "Bolsa de 1 000 firmas: US$ 850.00 más IGV" |
| Botón | "Comprar firmas" → WhatsApp de la bolsa mínima | "**Comprar {cantidad} firmas**" → `productWhatsappUrl` de la bolsa elegida. El mensaje sale de la plantilla de `site.ts`: "Hola, quiero comprar una bolsa de 1 000 firmas (US$ 850.00 + IGV)." |
| Bajada y puntos | (de la iteración 1) | Sin cambios |

**Datos:** las filas salen de la collection `productos`, con las cantidades `[10, 1000, 20000]` elegidas en `index.astro`, como hoy. El ahorro se calcula igual que en `/firmas/` (`ahorroDe`: `1 - unitario / unitarioMinimo`, en % entero). **Mover `ahorroDe` a `src/lib/`** (por ejemplo, `src/lib/bolsas.ts`) y usarlo desde `firmas.astro` y `index.astro`, para no duplicarlo. Si conviene, reutilizar el tipo `BolsaSelector` de `SelectorBolsas.tsx`.

**Componente:** la tarjeta de firmas pasa a ser una **isla React** (por ejemplo, `src/components/islands/FirmasBolsas.tsx`, con `client:visible`), con el mismo patrón que `CertificadoPlanes`:
- Se renderiza en el servidor con la bolsa mínima elegida: sin JS se ve completa, con el precio y el botón de la bolsa de 10.
- Los radios son nativos (`<input type="radio">`, `sr-only`) dentro de `<label>` que ocupan **toda la fila** (mínimo 44 px de alto). Teclado gratis.
- **Estado elegido:** fondo `fr-sheet`, borde `fr-line-strong` o navy y sombra suave, como el resaltado de los selectores del certificado. Si queda bien, usar el mismo `motion.span` con `layoutId` que se desliza entre filas. Foco visible con `outline-fr-tinta` (`has-[:focus-visible]`).
- Fila no elegida: sin fondo; al pasar el cursor, un fondo `fr-paper` sutil.
- **Color:** el indicador del radio elegido puede ir en tinta (es un control). Los totales y los textos, en navy y `fr-muted`.
- `FichasFirmas` sigue fuera de esta tarjeta (no se borra el componente).

### 9.3 Enlaces de las dos tarjetas → botón secundario

| Tarjeta | Iteración 1 | Iteración 2 |
|---|---|---|
| Certificado | Enlace de texto "Requisitos y detalles: persona natural" | **Botón secundario** de ancho completo, justo debajo de "Comprar certificado" (separación `mt-3`): "**Ver requisitos de persona natural**" / "**Ver requisitos de persona jurídica**" + flecha `→`. Sigue al titular elegido, como hoy |
| Firmas | Enlace de texto "Ver todas las bolsas" | **Botón secundario** igual: "**Ver las 8 bolsas de firmas**" + flecha `→`. El número sale de la collection (cantidad de bolsas) |

- Usar `buttonVariants({ variant: 'outline' })` (revisar que en `src/components/ui/button.tsx` se vea con borde visible y fondo claro; si `outline` es muy tenue, ajustar solo con clases en el uso, sin tocar la variante global).
- La flecha es un SVG `aria-hidden` que se mueve 2–3 px a la derecha al pasar el cursor (`group-hover`), con `transition` CSS. Con `prefers-reduced-motion: reduce`, la flecha no se mueve.
- El botón principal sigue siendo el único relleno en azul: el secundario no compite con él.
- Los textos de los botones llegan por props (constitución §4).

### 9.4 Criterios de aceptación de la iteración 2

- [ ] Cada fila de la tarjeta de firmas muestra el total de la bolsa ("US$ 10.00", "US$ 850.00", "US$ 10,000.00"), el precio por firma y, en las dos más grandes, "Ahorras 15 %" y "Ahorras 50 %" (valores calculados, no escritos a mano).
- [ ] Al elegir cada bolsa cambian la línea del plan, el precio grande, el texto del botón y su `href`. El mensaje de WhatsApp dice la cantidad y el total de esa bolsa (comprobado decodificando el `href` de las tres).
- [ ] Las filas se pueden elegir con teclado (Tab al grupo y flechas) y tienen foco visible.
- [ ] El anuncio `aria-live` dice la bolsa y el total con "más IGV".
- [ ] Sin JS: se ve la bolsa de 10 elegida, con su precio y un botón que funciona.
- [ ] `ahorroDe` existe una sola vez en `src/lib/` y `/firmas/` sigue mostrando los mismos ahorros que antes.
- [ ] Los dos enlaces son ahora botones secundarios con borde y flecha; el del certificado sigue al titular. Con `prefers-reduced-motion` la flecha no se mueve.
- [ ] Capturas en 375 y 1440 px de la sección: "US$ 10,000.00" no se parte ni desborda a 375 px y las dos tarjetas quedan equilibradas a 1440 px.
- [ ] `pnpm build` sin errores ni advertencias.

### 9.5 Tareas

- [x] T6 `ahorroDe` a `src/lib/` y uso en `firmas.astro` e `index.astro`.
- [x] T7 Isla `FirmasBolsas` (filas seleccionables, precio, botón y `aria-live`) y su uso en `Productos.astro`.
- [x] T8 Botones secundarios en las dos tarjetas.
- [ ] T9 Pasada de impeccable (`polish`) sobre la sección y verificación ligera de §9.4. Anotar en §8 lo verificado. Commit único `[010] …` con las dos iteraciones (sin `Co-Authored-By`, sin push). Los cambios de `.gitattributes`, `.gitignore`, `.graphifyignore` y `CLAUDE.md` no son de este spec: preguntar al usuario antes de incluirlos.

## 8b. Notas de la iteración 2 (2026-11-17)

**Verificado (verificación ligera, sin Lighthouse):**
- `pnpm build` sin errores ni advertencias; `impeccable detect --changed` sin hallazgos.
- Filas de la tarjeta de firmas: "US$ 10.00 · US$ 1.00 c/u", "US$ 850.00 · US$ 0.85 c/u · Ahorras 15 %", "US$ 10,000.00 · US$ 0.50 c/u · Ahorras 50 %" (calculados con `ahorroDe`).
- Al elegir cada bolsa (con clic y con teclado, flecha abajo) cambian línea del plan, precio grande, texto del botón ("Comprar 1 000 firmas") y `href`; el mensaje decodificado dice cantidad y total ("…bolsa de 1 000 firmas (US$ 850.00 + IGV)."). El `aria-live` dice "Bolsa de 20 000 firmas: US$ 10,000.00 más IGV". El foco visible aparece en la fila al navegar con teclado.
- Sin JS (`dist/index.html`): radio de 10 firmas con `checked`, precio US$ 10.00, botón "Comprar 10 firmas" con su enlace.
- `ahorroDe` vive solo en `src/lib/bolsas.ts`; `/firmas/` genera los mismos ahorros que antes (5, 10, 15, 25, 35 y 50 %, comparado con el build anterior).
- Dos botones secundarios (`outline`, borde visible) con flecha; el del certificado sigue al titular. La flecha usa `motion-safe:`, así que con `prefers-reduced-motion` no se mueve (comprobado en el código, no emulando la preferencia).
- 375 px: sin desborde, las tres filas miden 58 px y "US$ 10,000.00" cabe sin partirse. 1440 px: las dos tarjetas quedan equilibradas.

**Corrección durante la iteración:** el ahorro se calculó primero contra el precio por firma más bajo de todas las bolsas (US$ 0.50) y salía vacío; debe ser contra la bolsa mínima (US$ 1.00), igual que en `/firmas/`.

**Pendiente:** el commit de T9 no se hizo (ver pregunta al usuario sobre `Co-Authored-By` y los archivos ajenos al spec).

---

## 10. Iteración 3 (2026-11-17): pulir la versión vertical

> Aprobada por el usuario el 2026-11-17. Antes se probó una versión horizontal (tres columnas por producto) y se descartó: se mantiene la **vertical** de la iteración 2 y se mejora. Se implementa sobre la iteración 2 (aún sin commit).

### 10.1 Diagnóstico (crítica con impeccable, 2026-11-17)

1. **No se ve qué se vende.** El nombre del producto va en mono diminuta ("01 · CERTIFICADO DIGITAL") y el título grande es la metáfora ("Tu identidad para firmar"). Quien solo escanea no lee "Certificado digital" ni "Firmas".
2. **Precio repetido en firmas.** El total sale en la fila elegida y otra vez en grande debajo, con la línea "Bolsa de 10 firmas" encima: tres veces el mismo dato.
3. **No se ve que van juntos.** Dos tarjetas iguales lado a lado parecen dos opciones a elegir, no dos piezas que se suman.
4. **Jerga en los selectores.** "TITULAR" y "VIGENCIA", en mono y mayúsculas, son términos del producto, no del visitante.
5. **Texto pequeño y gris.** La bajada y la ayuda van en 13–14 px; la explicación, que es lo nuevo de este spec, es lo que menos se lee.
6. **El ahorro de 2 años no se ve.** En firmas el ahorro está en cada fila; en el certificado, el ahorro de 2 años solo aparece después de elegirlo ("Equivale a US$ 17.00 por año").
7. **Línea del plan redundante** en el certificado ("Certificado digital persona natural · 1 año"): repite lo que ya dicen el título y los dos selectores.

### 10.2 Cambios

**Las dos tarjetas**

| Elemento | Iteración 2 | Iteración 3 |
|---|---|---|
| Cabecera | Eyebrow mono "01 · Certificado digital" + título "Tu identidad para firmar" | Número pequeño "01" (mono, `fr-muted`) + **título = nombre del producto**: "**Certificado digital**" / "**Firmas**" (mismo tamaño de título que hoy) |
| Bajada | "Demuestra que el documento lo firmaste tú…" | La metáfora pasa a ser su inicio, en negrita navy: "**Tu identidad para firmar.** Demuestra que el documento lo firmaste tú, o tu empresa, con validez legal. Lo pagas una vez y dura 1 o 2 años." · "**El saldo que usas al firmar.** Cada vez que firmas un documento se descuenta 1 firma de tu bolsa. Si un documento lleva 3 firmas, se descuentan 3." |
| Tamaño de la bajada | `text-sm` | `text-[15px]` con `leading-relaxed`, color `fr-text`. La ayuda del titular sube a `text-sm` |
| Intro de la sección | Igual | Mismo texto; agregar `text-wrap: pretty` (o `balance`) para que no quede una palabra sola en la última línea ("dos.") |

**Tarjeta del certificado**

| Elemento | Iteración 2 | Iteración 3 |
|---|---|---|
| Leyenda del selector de titular | "TITULAR" (mono, mayúsculas) | "**¿A nombre de quién?**" en texto normal, `text-[13px] font-semibold text-fr-navy` (mismo estilo que la leyenda de las bolsas) |
| Leyenda del selector de vigencia | "VIGENCIA" | "**¿Por cuánto tiempo?**" con el mismo estilo |
| Opción "2 años" | Solo el texto | Texto + chip pequeño "**Ahorras 15 %**", calculado: `1 - precio2 / (2 × precio1)`, en % entero, con la misma función de `src/lib/bolsas.ts` si se puede generalizar. El chip usa el mismo estilo que el ahorro de las bolsas |
| Línea del plan (mono) | "Certificado digital persona natural · 1 año" | **Se quita.** El nombre completo sigue en el anuncio `aria-live` |
| Precio, "Equivale a … por año", puntos, botones | Iguales | Sin cambios |

**Tarjeta de firmas**

| Elemento | Iteración 2 | Iteración 3 |
|---|---|---|
| Filas | Total a la derecha; debajo "US$ 0.85 c/u · Ahorras 15 %" en gris | Igual, pero el ahorro pasa a **chip** (mismo estilo que el de "2 años"), al lado del precio por firma |
| Línea del plan y precio grande | "Bolsa de 10 firmas" + "US$ 10.00 + IGV" en grande | **Se quitan los dos.** Las filas ya dan el total |
| Botón principal | "Comprar 10 firmas" | "**Comprar 10 firmas · US$ 10.00 + IGV**" (cambia con la bolsa). A menos de `sm`, el precio baja a una segunda línea dentro del botón, para que "Comprar 20 000 firmas · US$ 10,000.00 + IGV" no se salga |
| Anuncio `aria-live` | "Bolsa de 10 firmas: US$ 10.00 más IGV" | Se mantiene (es lo único que anuncia el cambio de bolsa) |

**Unión entre tarjetas: signo "+"**

- Un círculo con "**+**" entre las dos tarjetas: en escritorio, centrado en el espacio entre ellas y a la altura de los títulos; en móvil, entre una tarjeta y la otra, centrado.
- Estilo: círculo de unos 40 px, fondo `fr-sheet`, borde `fr-line`, sombra `shadow-fr-sheet`, "+" en navy. **No es un control:** `aria-hidden="true"`, sin hover ni cursor.
- Ampliar el espacio entre tarjetas lo justo para que el círculo respire (por ejemplo, `gap-10` desde `md`), sin que monte sobre los bordes de las tarjetas.

**Alineación:** al quitar el precio grande, la tarjeta de firmas queda más corta. Los botones de las dos tarjetas siguen alineados abajo (el espaciador `flex-1` se queda). El hueco que deje en firmas **no debe pasar de unos 48 px a 1280 px**. Si pasa, se reparte subiendo un poco el alto de las filas (`min-h-16`), sin inventar contenido nuevo.

### 10.3 Criterios de aceptación de la iteración 3

- [ ] Los títulos de las tarjetas son "Certificado digital" y "Firmas"; las metáforas abren las bajadas en negrita.
- [ ] Las leyendas dicen "¿A nombre de quién?" y "¿Por cuánto tiempo?"; ya no hay "TITULAR" ni "VIGENCIA" en esta sección.
- [ ] "2 años" lleva el chip "Ahorras 15 %" calculado (comprobar que sale de los precios de la collection, no escrito a mano).
- [ ] En firmas no queda el precio grande ni la línea "Bolsa de …"; el botón dice cantidad y total de la bolsa elegida, y su `href` sigue llevando el mensaje correcto.
- [ ] A 375 px, con la bolsa de 20 000, el botón muestra el precio en una segunda línea y no se desborda.
- [ ] El "+" está entre las tarjetas en 375 y 1280 px, no tapa bordes y es `aria-hidden`.
- [ ] A 1280 px, el hueco antes de los botones en firmas no pasa de unos 48 px y los botones de las dos tarjetas quedan a la misma altura.
- [ ] La intro no deja una palabra sola en la última línea a 1280 px.
- [ ] Sin JS: las dos tarjetas se ven completas (bolsa de 10 elegida, botón con su precio).
- [ ] `pnpm build` sin errores ni advertencias.

### 10.4 Tareas

- [x] T10 Textos y props en `index.astro` (títulos, bajadas con la metáfora, leyendas, chip de 2 años).
- [x] T11 `CertificadoPlanes`: cabecera, leyendas, chip en "2 años", sin línea del plan.
- [x] T12 `FirmasBolsas`: cabecera, chip de ahorro, sin precio grande, botón con precio (dos líneas en móvil).
- [x] T13 `Productos.astro`: signo "+" y espacio entre tarjetas.
- [ ] T14 Pasada de impeccable (`polish`) y verificación ligera de §10.3; anotar en §8. Commit según lo que el usuario decida sobre los archivos ajenos al spec (ver pendiente de T9).

## 8c. Notas de la iteración 3 (2026-11-17)

**Verificado (verificación ligera, sin Lighthouse):**
- `pnpm build` sin errores ni advertencias; `impeccable detect --changed` sin hallazgos.
- Títulos "Certificado digital" y "Firmas"; las metáforas abren las bajadas en negrita. Leyendas "¿A nombre de quién?" y "¿Por cuánto tiempo?" (ya no hay "Titular" ni "Vigencia" en la sección).
- Chip "Ahorras 15 %" en "2 años": calculado con `ahorroDe` (precio por año de 2 años frente al de 1 año, de la collection). Las filas de firmas usan el mismo chip (`ChipAhorro`).
- Firmas: sin precio grande ni línea "Bolsa de …". El botón dice "Comprar {cantidad} firmas · US$ {total} + IGV"; el mensaje de WhatsApp de las tres bolsas dice cantidad y total correctos. El `aria-live` sigue anunciando "Bolsa de … : US$ … más IGV".
- 375 px, bolsa de 20 000: el botón pasa a dos líneas ("Comprar 20 000 firmas" / "US$ 10,000.00 + IGV"), sin desborde (58 px de alto en las tres bolsas). El "+" queda centrado entre las tarjetas con 12 px libres a cada lado.
- 1280 px: "+" centrado entre las tarjetas (hueco de 48 px, el círculo deja 4 px a cada lado) y a la altura de los títulos (centro a 86 px frente a 87 px del título); `aria-hidden`, sin hover. Botones de las dos tarjetas a la misma altura. Hueco antes del botón en firmas: 43 px.
- Intro: con `text-pretty` a 1280 px la última línea es "los dos." (dos palabras, ya no una sola).
- Sin JS (`dist/index.html`): ambas tarjetas completas, bolsa de 10 elegida (`checked`), botón con su precio.

**Qué aportó impeccable en esta pasada:** el detector no marcó nada; los ajustes salieron del craft-floor y de las mediciones: (1) el hueco de firmas era de 77 px con `min-h-14`; con `min-h-16` seguía en 67 px, así que las filas subieron a `min-h-[4.5rem]` (43 px) en vez de añadir contenido; (2) el espacio entre tarjetas pasó a `gap-12` en escritorio porque con 40 px el círculo tocaba ambos bordes; (3) el "·" del botón se separó en su propio elemento porque pegaba con el precio.

**Decisión pequeña:** el chip de "2 años" se calcula con los precios del primer titular (hoy son iguales para natural y jurídica, P01). Si algún día difieren, habría que calcularlo por titular.

**Pendiente:** commit sin hacer (ver pendiente de T9).

---

## 11. Iteración 4 (2026-11-17): disposición horizontal

> Aprobada por el usuario el 2026-11-17. El usuario quería la **horizontal** (en la iteración 3 escribió "vertical" por error). Se mantienen **todos los cambios de la iteración 3** (títulos con el nombre del producto, metáfora en la bajada, leyendas en pregunta, chips de ahorro, signo "+") y se cambia la disposición. Se implementa sobre la iteración 3 (aún sin commit).
>
> **Incidente (2026-11-17):** la sesión que escribe los specs, al montar un prototipo horizontal, sobrescribió por error el render de `CertificadoPlanes.tsx` de la iteración 3. Se reconstruyó a partir del build de `dist/` de la iteración 3 y el build nuevo genera el mismo archivo (`CertificadoPlanes.DjDtZudt.js`). Revisar igual que la tarjeta del certificado se vea como al cerrar la iteración 3.

### 11.1 Disposición

Las dos tarjetas **ya no van lado a lado**: cada producto ocupa **una fila completa** y van una debajo de la otra. Dentro de cada tarjeta, desde `lg`, hay **tres columnas**:

| Columna | Certificado | Firmas |
|---|---|---|
| Izquierda (`~1.05fr`) | "01" + título + bajada (con la metáfora); debajo, los puntos | "02" + título + bajada; debajo, los puntos |
| Centro (`~1fr`) | "¿A nombre de quién?" (con ayuda) y "¿Por cuánto tiempo?" (con chip en 2 años) | "Mientras más compras, menos pagas por firma" y las 3 filas de bolsas (con total y chip de ahorro) |
| Derecha (`~0.85fr`) | **Panel de resumen** | **Panel de resumen** |

- **Implementación sugerida:** una rejilla con `grid-template-areas`: en móvil, `'info' 'elegir' 'puntos' 'panel'`; desde `lg`, `'info elegir panel' 'puntos elegir panel'` con `grid-rows-[auto_1fr]` y `gap-x-10`. Los dos componentes comparten las clases de la rejilla y del panel, y el componente de los puntos (exportarlos de un solo lugar, por ejemplo `src/components/islands/productos-layout.ts(x)`; no duplicarlos).
- **Tarjeta:** sin `flex-col` ni `hover:-translate-y-1` (en una tarjeta tan ancha el salto se ve torpe); se mantiene el cambio de sombra al pasar el cursor. Padding `lg:p-10`.
- **Móvil (< `lg`):** se apila en este orden: cabecera y bajada → selectores o bolsas → puntos → panel.
- **Panel de resumen:** recuadro `rounded-fr-control border border-fr-line bg-fr-paper p-5 sm:p-6`, `flex flex-col justify-between`. Arriba, la línea del plan y el precio; abajo, el botón principal y el secundario (este con fondo `bg-fr-sheet` para que se despegue del panel).
- **Signo "+":** ahora va **entre las dos filas**, centrado horizontalmente y montado sobre el espacio entre tarjetas. Mismo estilo que en la iteración 3 y `aria-hidden`. Ajustar el `gap` vertical entre tarjetas para que el círculo no toque los bordes.

### 11.2 Panel de resumen (decisión del usuario: los dos paneles iguales)

| Elemento | Certificado | Firmas |
|---|---|---|
| Línea del plan (mono, `fr-muted`) | **Vuelve**: "Certificado digital persona natural · 1 año" (cambia con la elección) | **Vuelve**: "Bolsa de 1 000 firmas" (cambia con la elección) |
| Precio grande + "+ IGV" | Sí, con `SlidingNumber` | **Vuelve**: total de la bolsa elegida, con `SlidingNumber` |
| "Equivale a … por año" | Sí (solo 2 años) | — |
| Botón principal | "Comprar certificado" | "**Comprar 1 000 firmas**" (sin el precio: ya está en grande arriba). Vuelve a ser de una sola línea |
| Botón secundario | "Ver requisitos de persona natural →" | "Ver las 8 bolsas de firmas →" |

Las filas de bolsas **siguen mostrando el total** para poder comparar sin elegir.

**Tamaño del precio:** el panel es angosto (unos 300 px a 1280 px) y "US$ 10,000.00" no cabe a 2.6rem. El panel es un contenedor (`@container`) y el precio usa `text-[clamp(1.75rem,12.5cqi,2.6rem)]` **en los dos paneles**, para que tengan el mismo tamaño. Se probó en el prototipo: a 1280 px queda en unos 32 px y no se desborda.

### 11.3 Criterios de aceptación de la iteración 4

- [ ] Desde 1024 px (`lg`), cada tarjeta ocupa el ancho completo con tres columnas; las dos tarjetas van una debajo de la otra con el "+" entre ellas.
- [ ] Todo lo de la iteración 3 sigue: títulos, metáforas, leyendas en pregunta, chips de ahorro (comprobar contra §10.3, salvo lo que cambia §11.2).
- [ ] Los dos paneles tienen línea del plan, precio grande con "+ IGV" y botones; el precio tiene el mismo tamaño en los dos.
- [ ] Con la bolsa de 20 000 elegida, "US$ 10,000.00 + IGV" no se desborda del panel a 1024, 1280 y 1440 px (`scrollWidth` igual a `clientWidth`).
- [ ] El botón de firmas dice "Comprar {cantidad} firmas" y su `href` lleva el mensaje correcto de las tres bolsas.
- [ ] A 375 px el orden es: cabecera → selectores o bolsas → puntos → panel, sin desborde horizontal.
- [ ] Las clases de la rejilla, del panel y el componente de los puntos existen una sola vez.
- [ ] Sin JS: las dos tarjetas se ven completas.
- [ ] `pnpm build` sin errores ni advertencias.

### 11.4 Tareas

- [x] T15 Módulo compartido de disposición (rejilla, panel, puntos) y `Productos.astro` (una tarjeta por fila, "+" entre filas, padding).
- [x] T16 `CertificadoPlanes`: disposición en tres columnas; vuelve la línea del plan en el panel.
- [x] T17 `FirmasBolsas`: disposición en tres columnas; vuelven la línea del plan y el precio grande en el panel; botón sin precio.
- [x] T18 Pasada de impeccable (`polish`) y verificación ligera de §11.3 en 375, 1024, 1280 y 1440 px; anotar en §8. Commit según lo que el usuario decida (pendiente de T9).

## 8d. Notas de la iteración 4 (2026-11-17)

**Estado previo (incidente):** antes de empezar, `CertificadoPlanes.tsx` coincidía con lo que quedó al cerrar la iteración 3 (cabecera con título y metáfora, leyendas en pregunta, chip en "2 años", precio, puntos por titular, dos botones, sin línea del plan). Solo tenía dos líneas con sangría desalineada en el chip. Después se reescribió el render para la disposición horizontal.

**Cambios:** módulo único [`productos-layout.tsx`](../../../src/components/islands/productos-layout.tsx) con la rejilla (`rejilla`, `zona`), `Cabecera`, `Puntos`, `Panel`, `Precio`, `BotonPrincipal`, `BotonSecundario` y `Flecha`; lo usan `CertificadoPlanes` y `FirmasBolsas`. Las zonas se colocan con `col-start`/`row-start` desde `lg` (en móvil rige el orden del DOM) en lugar de `grid-template-areas`, para no escribir CSS fuera de Tailwind. `Productos.astro`: una tarjeta por fila (`lg:p-10`, sin salto al pasar el cursor, solo cambia la sombra) y el "+" como fila de alto 0 entre las dos (con `gap-6` queda centrado sobre el espacio de 48 px).

**Verificado (verificación ligera, sin Lighthouse), 375 / 1024 / 1280 / 1440 px:**
- `pnpm build` sin errores ni advertencias; `impeccable detect --changed` sin hallazgos.
- Desde 1024 px cada tarjeta ocupa el ancho completo con tres columnas y las dos tarjetas van una bajo la otra con el "+" entre ellas (a 1280 px el círculo queda a 4 px de cada tarjeta). Sin desborde horizontal en ningún ancho.
- Los dos paneles tienen línea del plan, precio grande con "+ IGV" y dos botones; el tamaño del precio es igual en los dos (24 px a 1024, 32 px a 1280, 35.5 px a 1440).
- Con la bolsa de 20 000, "US$ 10,000.00 + IGV" no se desborda (`scrollWidth` = `clientWidth`) a 1024, 1280 y 1440 px. A 1024 salió un desborde de 11 px con el mínimo de `1.75rem`; se bajó el mínimo a `1.5rem`.
- Botón de firmas: "Comprar 10 / 1 000 / 20 000 firmas" (una sola línea, 48 px) y su `href` dice cantidad y total correctos (US$ 10.00, US$ 850.00, US$ 10,000.00).
- 375 px: orden cabecera → selectores o bolsas → puntos → panel, en las dos tarjetas.
- Rejilla, panel y puntos existen una sola vez (`grep` en `src`). Sin JS: ambas tarjetas completas (bolsa de 10 elegida, botones con su enlace).

**Qué aportó impeccable:** el detector no marcó nada; el craft-floor y las mediciones llevaron a bajar el mínimo del precio (desborde a 1024 px que el prototipo no mostraba) y a dejar el signo "+" como fila de alto 0 en el flujo (sin posicionamiento absoluto) para que siga centrado sin conocer la altura de las tarjetas.

**Pendiente:** commit sin hacer (ver pendiente de T9).

---

## 12. Iteración 5 (2026-11-17): estructura "resumen oscuro"

> Aprobada por el usuario el 2026-11-17 a partir de una maqueta con tres estructuras (A: resumen oscuro, B: cabecera + barra de compra, C: pedido en dos pasos). Eligió la **A**. Se implementa sobre la iteración 4 (aún sin commit). La maqueta de referencia se vio en el navegador; lo que importa de ella está descrito aquí.

### 12.1 Por qué

La horizontal de la iteración 4 funciona, pero se lee como un formulario. Hay **cajas dentro de cajas**: la tarjeta, la caja del selector y el panel gris con borde, que además contiene botones con borde. El panel deja un **hueco vacío** entre el precio y los botones, y nada en la fila marca dónde está la decisión de compra. La opción A conserva las tres columnas, pero convierte el panel en una **franja navy de borde a borde**: el precio en blanco ancla la fila y el hueco deja de verse como vacío.

### 12.2 Cambios (todo en `productos-layout.tsx` y la tarjeta de `Productos.astro`, salvo que se diga otra cosa)

**Tarjeta**
- Desde `lg`, la tarjeta pierde su padding (`lg:p-0`) y `overflow-hidden`: cada columna lleva el suyo, para que la franja navy llegue a los bordes superior, inferior y derecho de la tarjeta. Las esquinas redondeadas de la tarjeta recortan la franja.
- Padding sugerido desde `lg`: izquierda `pt-10 pb-10 pl-10 pr-9`; centro `py-10 pr-9`; franja `px-8 py-10`.
- Ancho de la franja: unos 320–340 px (por ejemplo, `lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_330px]`). Si a 1024 px "US$ 10,000.00 + IGV" no cabe, bajar el mínimo del precio como en la iteración 4.

**Columna izquierda:** sin cambios de contenido ("01", título, bajada con la metáfora, línea punteada y puntos).

**Columna central:** sin cambios (selectores y filas de bolsas con sus chips).

**Franja de resumen (antes, panel gris)**

| Elemento | Iteración 4 | Iteración 5 |
|---|---|---|
| Fondo | `bg-fr-paper` con borde y radio | **`bg-fr-navy`**, sin borde ni radio propio. Texto blanco |
| Línea del plan (mono) | "Certificado digital persona natural · 1 año" (se partía en dos líneas) | **Corta**: "Persona natural · 1 año" / "Bolsa de 1 000 firmas", en blanco al 70 % |
| Precio | Navy | **Blanco**; "+ IGV" en blanco al 70 %. Mismo tamaño en las dos franjas |
| Línea bajo el precio (nueva, cambia con la elección) | Solo "Equivale a … por año" con 2 años | Certificado: con 1 año, "**Un solo pago por toda la vigencia.**"; con 2 años, "**Equivale a US$ 17.00 por año.**" · Firmas: "**US$ 0.85 por firma · no vencen.**" (con el precio unitario de la bolsa elegida). En blanco al 75 %, `text-sm` |
| Espacio entre el precio y los botones | Hueco en un panel gris | `flex-1`: los botones quedan al fondo de la franja. Sobre navy, el espacio se lee como parte del bloque |
| Botón principal | Azul tinta | **Sigue azul tinta** (P20). Para que se despegue del navy: sombra oscura (`0 10px 24px -10px rgb(0 0 0 / .6)`) y un contorno blanco al 18 % |
| Botón secundario | Botón con borde y flecha | **Enlace blanco con flecha**, alineado a la izquierda, `font-semibold`, área táctil de al menos 44 px. La flecha se mueve al pasar el cursor, igual que hoy (y no se mueve con `prefers-reduced-motion`) |
| Foco | `outline-fr-tinta` | Dentro de la franja, foco **blanco** (`focus-visible:outline-white`), porque el azul tinta no se ve sobre navy |

**Móvil (< `lg`):** la franja va al final de la tarjeta, **de borde a borde** (márgenes negativos o tarjeta sin padding y columnas con `px-6`), con las esquinas inferiores redondeadas por la tarjeta. El orden es el mismo de la iteración 4: cabecera → selectores o bolsas → puntos → franja.

**Signo "+":** sin cambios.

**Reglas de color (spec 002):** el navy es de la marca y se puede usar como fondo. El azul tinta sigue solo en lo que se pulsa. Los chips de ahorro siguen en la columna central, sobre fondo claro; no se ponen chips ámbar dentro de la franja.

### 12.3 Criterios de aceptación de la iteración 5

- [ ] Desde `lg`, la franja navy toca los bordes superior, inferior y derecho de cada tarjeta, sin hueco ni borde interior; en móvil va al pie de la tarjeta, de borde a borde.
- [ ] Ya no hay panel gris con borde ni botón secundario con borde en la sección.
- [ ] La línea del plan cabe en una línea a 1024, 1280 y 1440 px.
- [ ] La línea bajo el precio cambia con la elección (1 año / 2 años; las tres bolsas) y sus números salen de los datos.
- [ ] Contraste: blanco al 70 % sobre navy cumple AA para texto pequeño (comprobar el valor real); el botón tinta se distingue del fondo.
- [ ] Foco visible en blanco sobre los dos botones de la franja (probado con Tab).
- [ ] "US$ 10,000.00 + IGV" no se desborda a 1024, 1280 y 1440 px.
- [ ] Sin JS: las dos tarjetas completas con su franja.
- [ ] `pnpm build` sin errores ni advertencias.

### 12.4 Tareas

- [x] T19 `productos-layout.tsx`: franja navy (`Panel`), precio y textos en blanco, línea bajo el precio, botón principal con sombra y contorno, `BotonSecundario` como enlace blanco, foco blanco.
- [x] T20 `Productos.astro` y rejilla: tarjeta sin padding desde `lg`, columnas con padding propio, `overflow-hidden`; franja de borde a borde también en móvil.
- [x] T21 Línea corta del plan y línea bajo el precio (props desde `index.astro`).
- [x] T22 Pasada de impeccable (`polish`) y verificación ligera de §12.3 en 375, 1024, 1280 y 1440 px; anotar en §8. Commit según lo que el usuario decida (pendiente de T9).

## 8e. Notas de la iteración 5 (2026-11-17)

**Cambios:** `productos-layout.tsx` ahora trae la franja navy (`Panel`: `bg-fr-navy`, texto blanco, botones al fondo con `mt-auto`), `Precio` en blanco, `BotonPrincipal` (azul tinta con sombra oscura, contorno blanco al 20 % y foco blanco) y `BotonSecundario` como enlace blanco con flecha (44 px de alto táctil). La rejilla pasó a `minmax(0,1fr) minmax(0,1fr) 330px`; la tarjeta ya no tiene padding (`overflow-hidden`) y cada zona (`info`, `elegir`, `puntos`, franja) lleva el suyo, también en móvil. `index.astro` pasa `lineaCorta` ("Persona natural · 1 año") y `lineaBajo` a cada plan ("Un solo pago por toda la vigencia." / "Equivale a US$ 17.00 por año.") y `lineaBajo` a cada bolsa ("US$ 0.85 por firma · no vencen."), todo calculado desde la collection. `porAnioTexto` se reemplazó por `lineaBajo`.

**Verificado (verificación ligera, sin Lighthouse), 375 / 1024 / 1280 / 1440 px:**
- `pnpm build` sin errores ni advertencias; `impeccable detect --changed` sin hallazgos.
- Desde `lg` la franja toca los bordes superior, inferior y derecho de cada tarjeta (1 px de diferencia = el borde de la tarjeta; 330 px de ancho). En 375 px va al pie, de borde a borde (333 de 335 px, descontado el borde).
- Ya no hay panel gris ni botón con borde en la sección (cero enlaces con `border-fr-line-strong`).
- La línea del plan mide 16 px de alto (una línea) a 375, 1024, 1280 y 1440 px, para las cuatro combinaciones de titular y vigencia.
- La línea bajo el precio cambia con la elección: 1 año "Un solo pago por toda la vigencia."; 2 años "Equivale a US$ 17.00 por año."; bolsas "US$ 1.00 / 0.85 / 0.50 por firma · no vencen.". El `href` de las tres bolsas sigue con cantidad y total correctos.
- "US$ 10,000.00 + IGV": `scrollWidth` = `clientWidth` (266 px) a 1024, 1280 y 1440; a 375 px, 285/285. El precio mide 33 px a 1024–1440 (la franja tiene ancho fijo) y 35.6 px a 375.
- **Contraste real sobre `rgb(14, 3, 92)`:** blanco 17.7:1; blanco al 75 % 9.97:1; blanco al 70 % **8.73:1** (cumple AA, incluso AAA para texto pequeño). El texto blanco sobre el azul tinta del botón da 7.37:1; el botón frente al fondo navy da solo 2.40:1, así que no se distingue por color: lo despegan la sombra oscura, el contorno blanco al 20 % y el texto blanco (no es un contraste de texto, pero queda anotado).
- **Foco (probado con Tab):** el botón principal muestra un anillo blanco de 2 px con separación navy (`ring-white!` y `ring-offset-fr-navy!`); el enlace secundario, contorno blanco de 2 px.
- Sin JS (`dist/index.html`): las dos franjas con plan, precio, línea bajo el precio y ambos enlaces; bolsa de 10 elegida.

**Qué aportó impeccable:** el detector no marcó nada; las mediciones y la prueba de teclado destaparon tres fallos que el spec no preveía: (1) el `legend` de la `fieldset` de bolsas ignoraba el padding de la columna y quedaba pegado al borde superior de la tarjeta; se envolvió en un `div` con la zona; (2) el foco del botón principal seguía azul (`ring-fr-tinta/40` ganaba por orden de CSS al `ring-white`); se resolvió con `!`; (3) `outline-none` anulaba el contorno blanco del enlace secundario.

**Pendiente:** commit sin hacer (ver pendiente de T9).

---

## 13. Ajustes aprobados sin iteración formal (2026-11-17)

> Desde aquí, los ajustes de diseño se pasaron como texto directo al chat que implementa, y se documentan al aprobarse. El usuario los aprobó el 2026-11-17.

1. **Tarjetas de opción (inicio).** Columna izquierda: recuadro de ícono de 44 px (`identidad` / `contrato`) en lugar del número suelto; puntos sin línea punteada, con check en círculo. Columna central: un solo lenguaje de tarjetas de opción en los tres grupos. "¿A nombre de quién?" muestra dos tarjetas con ícono (`persona` / `edificio`) y la línea corta "A tu nombre" / "En nombre de tu empresa"; reemplaza la ayuda larga, que sigue en las páginas por titular. "¿Por cuánto tiempo?" muestra dos tarjetas con su precio (US$ 20.00 / US$ 34.00) y el chip de ahorro. Las bolsas son tarjetas separadas. Estado elegido: borde y anillo en tinta, fondo `fr-tinta-soft`.
2. **Compra conjunta (inicio).** Bajo las dos tarjetas, un "=" y una franja "¿Necesitas los dos? Pídelos juntos" con el resumen de lo elegido, el total sumado y el botón "Comprar los dos". El mensaje de WhatsApp sale de la plantilla `combo` en `site.ts`: "Hola, quiero comprar el certificado digital para {titular} con vigencia de {vigencia} y una bolsa de {cantidad} firmas. Total: {total} + IGV." Las islas comparten la elección mediante `src/lib/seleccion-productos.ts` (store mínimo con `useSyncExternalStore`, sin dependencias). La compra individual de cada tarjeta sigue igual.
3. **/certificado-digital/ informativa.** Se quitaron de esta página la matriz de planes (con "Qué incluye" y medios de pago) y la sección de acreditación. Los componentes se siguen usando en otras páginas. El JSON-LD de la página ya no declara ofertas con precio. "Lo que necesitas" pasó a `RequisitosComparados` (requisitos comunes + adicionales de jurídica), que **el spec 011 reemplaza**.

**Estado:** la estructura vigente del inicio es la de §12 (franja navy) más los ajustes 1 y 2. Falta el commit (ver pendiente de T9).
