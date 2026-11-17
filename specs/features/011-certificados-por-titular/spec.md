# [011] /certificado-digital/: "¿Cuál necesitas?" con sus requisitos

> Estado: `en-curso` · Creado: 2026-11-17 · Actualizado: 2026-11-17
> Decisiones del usuario (2026-11-17): fusionar "¿Cuál necesitas?" y "Lo que necesitas" en **una sola sección**. Cada certificado muestra **sus propios requisitos** completos, aunque se repitan: no se combinan. Estructura **selector + ficha**. Cada ficha lleva "Ver detalles" y "Consultar por WhatsApp". La página sigue siendo informativa: los precios quedan en el inicio y en las páginas por titular.
> Constitución: v0.4.0 (verificación ligera; sin Lighthouse) · Depende de: 010 (hecho, sin commit)
> Lo implementa otra sesión con la skill **impeccable**, en modo refinamiento. Este spec trae todo lo necesario.

## 1. Contexto y objetivo

En `/certificado-digital/` hay dos secciones seguidas que hablan de lo mismo:
- **"¿Cuál necesitas?"** (`CualNecesitas.astro`): una tarjeta por titular, con una línea de uso y un enlace.
- **"Lo que necesitas"** (`RequisitosComparados.astro`, del spec 010): los requisitos agrupados en "para los dos" y "además, para jurídica".

El visitante tiene que cruzar las dos para saber qué le toca. Además, agrupar los requisitos obliga a reconstruir la lista de cada titular.

**Objetivo medible:** en una sola sección, el visitante elige su titular y ve en el mismo bloque para qué sirve, la lista completa de lo que necesita y cómo seguir (detalles o WhatsApp).

**Fuera de alcance:** el resto de la página (hero, `NecesitasLosDos`, `ComoFunciona`, preguntas, cierre), las páginas por titular (su sección `Requisitos.astro` queda igual) y el inicio.

## 2. Contenido

Todo texto vive en `src/pages/certificado-digital/index.astro` (props) o en las collections. **Nada fijo en los componentes** (constitución §4).

### Encabezado de la sección

| Elemento | Texto | Fuente |
|---|---|---|
| `id` | `cual-necesitas` (se mantiene) | — |
| Etiqueta | "Titulares" | página |
| Título + acento | "¿Cuál" + "necesitas?" (se mantiene) | página |
| Intro (nueva) | "Elige el tuyo: te mostramos para qué sirve y qué documentos tienes que preparar." | página |

### Selector (pestañas)

Dos opciones, con el mismo lenguaje de **tarjetas de opción** del inicio (spec 010 §13.1): ícono, nombre y línea corta.

| Opción | Ícono | Nombre | Línea corta |
|---|---|---|---|
| Natural | `persona` | Persona natural | A tu nombre |
| Jurídica | `edificio` | Persona jurídica | En nombre de tu empresa |

### Ficha (una por titular; se ve la del titular elegido)

| Zona | Elemento | Natural | Jurídica | Fuente |
|---|---|---|---|---|
| Izquierda | Recuadro de ícono (44 px) + nombre (`h3`) | `persona` · "Persona natural" | `edificio` · "Persona jurídica" | página |
| | Descripción | `textosTitular.natural.linea` (la que ya usa la página) | `textosTitular.juridica.linea` | página (P05) |
| | Etiqueta de usos | "Sirve para" | "Pensado para" | página |
| | Usos (chips) | `paraQueSirve.usos` de `persona-natural` (Contratos · Acuerdos · Cartas y declaraciones · Trámites con notarios) | `paraQueSirve.usos` de `persona-juridica` (Representante legal · Gerente u otro cargo con poderes · Persona autorizada por la empresa) | collection `titulares` |
| | Botón principal | "Consultar por WhatsApp" | igual | página |
| | Enlace con flecha | "Ver detalles de persona natural" → `/certificado-digital/persona-natural/` | "Ver detalles de persona jurídica" → `/certificado-digital/persona-juridica/` | página |
| Derecha | Subtítulo | "Lo que necesitas" | igual | página |
| | Intro de requisitos | `intro` de la collection `requisitos` ("Prepara estos documentos…") | igual | collection `requisitos` |
| | Requisitos | Los **3** de natural, completos y en su orden (DNI y/o CE vigente · Contrato · Validación de identidad), con ícono y detalle | Los **6** de jurídica, completos y en su orden, con el chip "Solo si es vinculado a empresa" en Lista de suscriptores | collection `requisitos` |
| | Nota | "Un asesor te confirma los requisitos antes de la compra." | igual | página |

### Mensaje de WhatsApp (nuevo)

En `src/config/site.ts` → `whatsappMessages`, agregar:
`certificadoTitular: 'Hola, quiero información sobre el certificado digital para {titular}.'`

El enlace se arma en el servidor con `whatsappUrl()` y `fill`, con `{titular}` = `titularLabel[titular]` ("persona natural" / "persona jurídica"). Si `fill` no se exporta, exportarlo o agregar una función `certificadoTitularUrl(titular)` en `src/lib/whatsapp.ts`.

## 3. Comportamiento

- **Componente nuevo:** `src/components/sections/CertificadosPorTitular.astro`, en Astro y **sin isla React**. El cambio de pestaña lo hace un `<script>` pequeño del componente.
- **Pestañas accesibles (patrón ARIA tabs):** `role="tablist"` con dos `role="tab"` (`aria-selected`, `aria-controls`, `tabindex` itinerante) y dos `role="tabpanel"` (`aria-labelledby`). Flechas izquierda/derecha, Inicio y Fin mueven entre pestañas, y el clic o la flecha activan la pestaña.
- **Sin JS:** el `tablist` está oculto y **se ven las dos fichas**, una debajo de la otra. El script, al cargar, muestra el `tablist` y oculta con `hidden` el panel no elegido. Así no hay contenido que solo exista con JS.
- **Enlace directo:** si la URL trae `#persona-juridica` o `#persona-natural`, se abre esa pestaña y la página baja hasta la sección. Los ids de los paneles son esos.
- **Estado elegido de la pestaña:** el mismo estilo de tarjeta elegida del inicio: borde y anillo tinta, fondo `fr-tinta-soft` al 40 %, punto de radio en tinta. Si en el inicio ese estilo vive en `productos-layout.tsx` (React), replicar las **mismas clases** en Astro. Si conviene, mover la cadena de clases a un módulo `.ts` compartido para no duplicarla.
- **Disposición de la ficha** (tarjeta `bg-fr-sheet`, borde `fr-line`, `rounded-fr-card`, sombra de tarjeta):
  - Desde `lg`: dos columnas, izquierda `~1fr` y derecha `~1.25fr`, separadas por una línea vertical fina `fr-line`. Padding `lg:p-10`.
  - Requisitos en una rejilla de **2 columnas** desde `sm` (natural: 2 filas; jurídica: 3 filas) y de 1 en móvil. Cada ítem: ícono en círculo (como en `Requisitos.astro`), texto y detalle en `text-sm fr-muted`.
  - Chips de usos: pequeños, borde `fr-line`, fondo `fr-paper`, texto navy. **No** usar ámbar como texto sobre papel (spec 002).
  - Botón principal azul tinta (P20) y, debajo o al lado, el enlace con flecha (mismo componente o clases que "Ver requisitos →" del inicio).
- **Selector:** dos tarjetas lado a lado (`grid-cols-2`, también en móvil), con un ancho máximo de unos 560 px, alineadas a la izquierda sobre la ficha.
- **Animación:** al cambiar de pestaña, el panel nuevo entra con un fundido corto (150–200 ms, CSS). Con `prefers-reduced-motion`, sin animación.
- **Se borran** `CualNecesitas.astro` y `RequisitosComparados.astro` si no quedan usos (hoy solo los usa esta página). Revisar con `grep` antes de borrar.

## 4. SEO

- `h2`: "¿Cuál necesitas?". `h3`: "Persona natural" y "Persona jurídica" (los dos están en el HTML, aunque uno esté `hidden`).
- Anclas: `#cual-necesitas`, `#persona-natural`, `#persona-juridica`. Si algo enlazaba a `#requisitos` en esta página, redirigirlo a `#cual-necesitas`.
- Schema: sin cambios (breadcrumb y FAQPage).

## 5. Criterios de aceptación

**Verificación ligera** (constitución §11.1): sin Lighthouse.

- [ ] En `/certificado-digital/` hay **una** sección donde antes había dos; "¿Cuál necesitas?" y "Lo que necesitas" ya no existen por separado.
- [ ] La ficha de natural muestra sus 3 requisitos y la de jurídica sus 6, completos y en el orden de la collection (no se combinan ni se agrupan).
- [ ] Los usos salen de `titulares.yaml` y los requisitos de `requisitos.yaml` (nada escrito a mano en la página).
- [ ] Pestañas: clic, flechas, Inicio y Fin funcionan; `aria-selected` y `hidden` se actualizan; foco visible.
- [ ] `/certificado-digital/#persona-juridica` abre la ficha de jurídica.
- [ ] Sin JS: se ven las dos fichas completas y no se ve el selector.
- [ ] "Consultar por WhatsApp" abre wa.me con "Hola, quiero información sobre el certificado digital para persona natural." (y "… persona jurídica." en la otra ficha).
- [ ] "Ver detalles de …" lleva a la página del titular.
- [ ] Las páginas por titular no cambian (su sección de requisitos sigue igual).
- [ ] `CualNecesitas.astro` y `RequisitosComparados.astro` borrados si no tienen otros usos; sin importaciones huérfanas.
- [ ] Capturas en 375 y 1280 px con cada pestaña: sin desborde y con la ficha de jurídica sin hueco notorio en la columna izquierda.
- [ ] `pnpm build` sin errores ni advertencias.

---

## 6. Plan técnico

**Archivos:**
- Nuevo: `src/components/sections/CertificadosPorTitular.astro`.
- `src/pages/certificado-digital/index.astro`: reemplazar `<CualNecesitas>` y `<RequisitosComparados>` por la sección nueva; pasarle los datos (titulares con ícono, nombre, línea corta, descripción, etiqueta y usos, requisitos de la collection, enlace a WhatsApp y a detalles) y los textos.
- `src/config/site.ts` (`certificadoTitular`) y `src/lib/whatsapp.ts` (enlace por titular).
- Si hace falta: un módulo `.ts` con las clases de la tarjeta de opción, compartido con `productos-layout.tsx`.
- Borrar `src/components/sections/CualNecesitas.astro` y `src/components/sections/RequisitosComparados.astro` si quedan sin uso.

**Dependencias nuevas:** ninguna.

**Reglas y trampas conocidas:**
- Constitución v0.4.0; reparto del color del spec 002: el azul tinta solo en lo que se pulsa (pestañas, botón, enlace).
- **Sin textos fijos en `src/components/`** (constitución §4).
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular.
- El `<script>` del componente debe funcionar si en el futuro hay dos instancias en la misma página: buscar por un `data-` del contenedor, no por id global.
- **Antes de empezar, revisar `git status`:** el spec 010 está aprobado pero **sin commit**. No mezclar: preguntar al usuario si primero se hace el commit del 010.
- **Servidor de desarrollo:** uno solo por proyecto; si hay que reiniciarlo, avisar al usuario.
- **Git:** commit **sin** `Co-Authored-By` ni mención de la IA (o lo que el usuario haya decidido para el 010); mensaje `[011] …`; **no hacer push**.

## 7. Tareas

- [x] T1 Mensaje `certificadoTitular` y enlace por titular.
- [x] T2 `CertificadosPorTitular.astro`: selector, fichas, script de pestañas, comportamiento sin JS y enlace directo por hash.
- [x] T3 Integración en `/certificado-digital/` y borrado de `CualNecesitas` y `RequisitosComparados`.
- [x] T4 Pasada de impeccable (`polish`) y verificación ligera de §5. Anotar en §8 lo verificado y qué aportó impeccable; dejar el spec en `en-curso`.

## 8. Notas de implementación

**Implementación (2026-11-17):**
- `CertificadosPorTitular.astro` (Astro, sin isla React): selector `role="tablist"` con dos `role="tab"` y dos `role="tabpanel"`; el script del componente (busca por `[data-por-titular]`, sirve para varias instancias) muestra el selector, oculta con `hidden` la ficha no elegida, atiende clic, flechas, Inicio y Fin (`tabindex` itinerante) y abre la ficha del hash `#persona-natural` / `#persona-juridica`, bajando a la sección. Entrada de la ficha: fundido de 180 ms (`.animar-ficha` en `src/styles/global.css`, solo con `prefers-reduced-motion: no-preference`).
- Clases de la tarjeta de opción: movidas a [`src/lib/opcion-clases.ts`](../../../src/lib/opcion-clases.ts) y usadas por `productos-layout.tsx` (radio, `:checked`) y por las pestañas (`aria-selected`). El inicio queda con el mismo aspecto.
- Mensaje: `whatsappMessages.certificadoTitular` en `site.ts` y `certificadoTitularUrl(titular)` en `whatsapp.ts` (usa `rellenar`, que el spec llamaba `fill`).
- `index.astro`: las fichas se arman con `titulares.yaml` (usos) y `requisitos.yaml` (requisitos completos y en su orden, intro); se quitó el cálculo de comunes/adicionales. Se borraron `CualNecesitas.astro` y `RequisitosComparados.astro` (sin otros usos). Ya no hay enlaces a `#requisitos` en esta página.
- Disposición de la ficha: columnas `1fr / 1.3fr` (el spec decía ~1fr / ~1.25fr; se subió a 1.3 para que jurídica quede equilibrada) y los botones de la ficha se apilan desde ese ancho.

**Verificado (verificación ligera, sin Lighthouse):**
- `pnpm build` sin errores ni advertencias. Una sola sección en la página (`cual-necesitas`); ya no existen "Lo que necesitas" ni "¿Cuál necesitas?" por separado.
- Natural: 3 requisitos; jurídica: 6, completos y en el orden de la collection, con el chip "Solo si es vinculado a empresa" (comprobado en el HTML generado y en el navegador). Usos: Contratos · Acuerdos · Cartas y declaraciones · Trámites con notarios / Representante legal · Gerente u otro cargo con poderes · Persona autorizada por la empresa (de `titulares.yaml`).
- Pestañas: clic, Flecha derecha, Inicio y Fin cambian `aria-selected`, `tabindex` y `hidden`; el foco se ve (`:focus-visible` con contorno tinta). `/certificado-digital/#persona-juridica` abre la ficha de jurídica y deja la sección arriba.
- WhatsApp: "Hola, quiero información sobre el certificado digital para persona natural." / "… persona jurídica." (decodificado). "Ver detalles de …" lleva a `/certificado-digital/persona-natural/` y `/persona-juridica/`.
- Sin JS (`dist/certificado-digital/index.html`): el selector lleva `hidden` (clase) y los dos paneles no tienen `hidden`, así que se ven las dos fichas completas, una debajo de la otra.
- Páginas por titular sin cambios (`Requisitos.astro`, `MatrizPlanes` y `[titular].astro` intactos; cada una conserva su `#requisitos` y su `#planes`).
- 1280 px: sin desborde. Jurídica: hueco de 41 px (solo el padding) abajo en las dos columnas y 40 px entre los usos y los botones. Natural: 41 px abajo en la izquierda; la derecha tiene unos 107 px de aire sobre su padding porque solo lleva 3 requisitos (la nota queda abajo, alineada con los botones).
- 375 px: sin desborde, selector en 2 columnas, ficha en una columna con los requisitos bajo una línea.

**Qué aportó impeccable:** el detector no marcó nada en lo nuevo (solo un hallazgo previo en `global.css:249`, un `border-left` de 3 px que ya existía y no es de este spec). El craft-floor y las mediciones llevaron a: (1) reajustar las columnas de la ficha porque con `1fr / 1.25fr` los botones se apilaban y jurídica dejaba 176 px de hueco entre los usos y los botones; (2) que el estado de las pestañas use exactamente las clases de la tarjeta de opción del inicio, extraídas a un módulo compartido en vez de copiadas; (3) que el selector oculto sin JS sea una clase (`hidden`) que el script reemplaza por `grid`, para que `hidden` del panel y el `display` del selector no se pisen.

**Pendiente:** commit [011] sin hacer. El usuario decidió no commitear el 010 antes de empezar: ambos están sin commit en el árbol.
