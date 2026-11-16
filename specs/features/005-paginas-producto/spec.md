# [005] Páginas de producto: certificado digital y firmas

> Estado: `en-curso` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Aprobado por el usuario el 2026-11-16: «apruebo todo» (textos nuevos, "Más elegido", pregunta nueva, "Pronto habrá bolsas más grandes" y quitar "Preguntas" del menú).
> Constitución: v0.3.2 · Depende de: 001, 002, 003, 004 (todos `hecho`)
> Lo implementa otra sesión. Este spec trae todo lo necesario: no hace falta el historial de la conversación.

## 1. Contexto y objetivo

El inicio (`/`) ya presenta la firma remota. Faltan las dos páginas que atacan la búsqueda **transaccional**, la de quien ya quiere comprar (ver `specs/site.md` §2 y §3):

- `/certificado-digital/`: los **6 planes** (persona natural y jurídica × 1, 2 y 3 años), cada uno con su ancla para poder enlazarlo.
- `/firmas/`: las bolsas de firmas (hoy solo la de 10).

Además, el inicio y el menú pasan a enlazar a estas páginas, que hasta ahora no existían.

**Objetivo medible:** que alguien que busca "certificado digital persona jurídica" llegue a una página que muestra los 3 planes de ese titular con su precio y un botón que abre WhatsApp con ese plan exacto.

**Fuera de alcance**
- `/preguntas-frecuentes/` y las páginas legales (spec 006 y siguientes).
- Cambiar precios o datos: siguen siendo placeholders (`specs/pendientes.md`).
- Un carrito o una pasarela de pago: la compra sigue siendo por WhatsApp.

## 2. Contenido

Solo datos confirmados (`specs/site.md`) o placeholders registrados (`specs/pendientes.md`). Nada inventado.

### 2.1 `/certificado-digital/`

| # | Sección | Contenido |
|---|---|---|
| — | Migas de pan | Inicio › Certificado digital |
| 1 | **Encabezado** | Etiqueta "Certificado digital" · `h1` "Certificado digital *para firma remota.*" · subtítulo · nota "Te atiende un asesor por WhatsApp · Precios con IGV incluido" |
| 2 | **Persona natural** (`#persona-natural`) | `h2` + una línea + 3 tarjetas de plan (1, 2 y 3 años) |
| 3 | **Persona jurídica** (`#persona-juridica`) | `h2` + una línea + 3 tarjetas de plan |
| 4 | **Requisitos** | Dos columnas, natural y jurídica, con la lista de cada una (**P07, P08**) |
| 5 | **Necesitas los dos** | Reutiliza la sección del inicio, con un enlace a `/firmas/` |
| 6 | **Cómo funciona** | Reutiliza la sección del inicio |
| 7 | **Preguntas** | Las de la collection `faqs` marcadas para `certificado-digital` |
| 8 | **Cierre** | Reutiliza `CtaCierre` |

**Textos nuevos (borrador para aprobar)**

- Subtítulo del encabezado: "Tu identidad digital vive en la nube: firmas con tu usuario, tu PIN y un código que llega a tu WhatsApp. Elige el titular y la vigencia."
- Persona natural: `h2` "Persona natural" · "Para firmar a tu nombre: contratos, documentos personales y trámites."
- Persona jurídica: `h2` "Persona jurídica" · "Para firmar en nombre de tu empresa, como su representante."
- Requisitos: `h2` "Lo que *necesitas.*" · línea bajo las listas: "Un asesor te confirma los requisitos antes de la compra."

**Tarjeta de plan** (una por cada uno de los 6):
- Vigencia como título ("1 año").
- Precio (de la collection), "Incluye IGV" y el nombre del plan en mono.
- Botón **"Comprar"** que abre WhatsApp con el mensaje de ese plan (`productWhatsappUrl`).
- `id` del ancla: `natural-1-ano`, `natural-2-anos`, `natural-3-anos`, `juridica-1-ano`, `juridica-2-anos`, `juridica-3-anos`.
- El plan de **2 años** de cada titular lleva una etiqueta discreta "Más elegido". **[Para aprobar: es un dato comercial no confirmado. Si no se aprueba, no se pone.]**

**Requisitos (placeholders ya autorizados en `pendientes.md`):**
- Natural (**P07**): DNI · correo electrónico · celular con WhatsApp.
- Jurídica (**P08**): RUC de la empresa · DNI del representante legal · vigencia de poder · celular con WhatsApp.
- Viven en una collection nueva `requisitos` (`src/content/requisitos.yaml`), con `# PENDIENTE: P07` y `# PENDIENTE: P08`.

**Preguntas de esta página** (en `src/content/faqs.yaml`, agregar `certificado-digital` a `paginas`):
- Existentes: "¿Qué es la firma remota?", "¿Qué necesito para firmar?", "¿Puedo usar un certificado de otro proveedor?", "¿La firma remota tiene validez legal?".
- Nueva: "¿Qué diferencia hay entre persona natural y persona jurídica?" → "El certificado de persona natural es para firmar a tu nombre. El de persona jurídica es para firmar en nombre de una empresa, como su representante legal." **[Para aprobar]**

### 2.2 `/firmas/`

| # | Sección | Contenido |
|---|---|---|
| — | Migas de pan | Inicio › Firmas |
| 1 | **Encabezado** | Etiqueta "Firmas" · `h1` "Firmas para tu *certificado digital.*" · subtítulo · nota igual que arriba |
| 2 | **Bolsas** (`#bolsas`) | Una tarjeta por bolsa de la collection (hoy solo la de 10, **P02**). Cada tarjeta: ilustración `FichasFirmas`, cantidad, precio, "Incluye IGV", "No vencen" y "Comprar" a WhatsApp con su mensaje |
| 3 | **Funcionan con tu certificado** | `h2` + texto + dos tarjetas: "Con nuestro certificado" / "Con el certificado de otro proveedor" |
| 4 | **Necesitas los dos** | Reutiliza la sección, con un enlace a `/certificado-digital/` |
| 5 | **Preguntas** | Las marcadas para `firmas` |
| 6 | **Cierre** | `CtaCierre` |

**Textos nuevos (borrador para aprobar)**
- Subtítulo: "Las firmas son el saldo que usas cada vez que firmas. No vencen: se descuentan a medida que las usas."
- Sección 3: `h2` "Sirven con *tu certificado.*" · "Puedes comprarnos solo las firmas y usarlas con un certificado de otro proveedor, o comprar los dos juntos."
- Tarjetas: "Con nuestro certificado" → "Compras el certificado y las firmas, y te atiende un mismo asesor." / "Con otro proveedor" → "Ya tienes certificado: solo sumas las firmas que necesitas."
- Si la collection tiene **una sola bolsa**, la sección 2 dice debajo: "Pronto habrá bolsas más grandes." **[Para aprobar; P02]**

**Preguntas de esta página:** "¿Las firmas vencen?", "¿Puedo usar un certificado de otro proveedor?", "¿Qué necesito para firmar?" y "¿Cuánto cuesta?" (marcarlas con `firmas`). **No** agregar "¿Qué cuenta como una firma?": es P04 y no tiene respuesta confirmada.

### 2.3 Cambios en el inicio y el menú

- **Header**, en todas las páginas: los enlaces pasan a ser **Certificado digital** (`/certificado-digital/`), **Firmas** (`/firmas/`) y **Cómo funciona** (`/#como-funciona`). El de "Preguntas" se quita del menú hasta que exista su página (006).
- **Inicio, tarjetas de productos:** debajo del botón de compra, un enlace de texto "Ver los 6 planes" (certificado) y "Ver bolsas de firmas" (firmas), con el estilo `link` del botón.
- **Footer:** una columna "Productos" con los dos enlaces.

## 3. Comportamiento

- **Migas de pan:** componente `Breadcrumbs.astro`, un `<nav aria-label="Migas de pan">` con `<ol>`. El último elemento no es enlace y lleva `aria-current="page"`.
- **Anclas de planes:** ir a `/certificado-digital/#juridica-2-anos` centra la tarjeta en pantalla y la resalta durante 2.2 s con un anillo **ámbar** de 3px (regla de Girasol "resaltar un destino", con el color del spec 002). Con "reducir movimiento", sin scroll suave ni animación, pero con el anillo.
- **Animación:** las mismas reglas de siempre (constitución §7). Entrada con `data-reveal` en las tarjetas y `data-anim="fichas"` en la ilustración de cada bolsa. Nada animado en el primer pantallazo.
- **Sin islas React nuevas:** las tarjetas de plan son `.astro` estáticas (no hace falta el selector, se muestran todas).
- **Todos los "Comprar"** abren WhatsApp en una pestaña nueva, con el mensaje del plan o de la bolsa.

## 4. SEO

| Campo | `/certificado-digital/` | `/firmas/` |
|---|---|---|
| `title` | Certificado digital persona natural y jurídica | Firmas digitales: bolsas para tu certificado |
| `description` (generada con precios de la collection) | "Certificado digital para firma remota, persona natural o jurídica, de 1 a 3 años desde US$ X. Sin instalar nada. Te atiende un asesor por WhatsApp." | "Bolsas de firmas para tu certificado digital desde US$ X. No vencen y sirven con certificados de otros proveedores. Compra por WhatsApp." |
| `h1` | Certificado digital para firma remota. | Firmas para tu certificado digital. |
| Schema | `Product` por plan (6) con su `Offer` + `BreadcrumbList` + `FAQPage` | `Product` por bolsa + `BreadcrumbList` + `FAQPage` |
| Keywords | certificado digital persona natural · certificado digital persona jurídica · certificado digital Perú precio | comprar firmas digitales · bolsa de firmas · firmas para certificado digital |

- Con `INDEXABLE=true`, el sitemap incluye las dos páginas.
- Canonical con `/` final.

## 5. Criterios de aceptación

**Contenido**
- [x] `/certificado-digital/` muestra los 6 planes, agrupados por titular, cada uno con precio, "Incluye IGV" y su botón con el mensaje de WhatsApp de ese plan.
- [x] `/firmas/` muestra una tarjeta por bolsa de la collection (agregar una bolsa al YAML la muestra sin tocar código).
- [x] Los requisitos salen de la collection `requisitos`, con sus marcas `PENDIENTE: P07` y `PENDIENTE: P08`, y `pnpm pendientes` los lista.
- [x] Ningún precio, cantidad ni mensaje está escrito a mano en las páginas.
- [x] El menú, el inicio y el footer enlazan a las dos páginas; ningún enlace lleva a una página que no existe.

**Comportamiento**
- [x] Cada ancla de plan (`#natural-1-ano` … `#juridica-3-anos`) centra y resalta su tarjeta, también al llegar desde otra página.
- [x] Las migas de pan son navegables con teclado y anuncian la página actual.
- [x] Sin JS y con "reducir movimiento", todo el contenido se ve completo.

**SEO**
- [x] Un `h1` por página y un `h2` por sección, sin saltos.
- [x] El JSON-LD de cada página tiene sus `Product`/`Offer`, `BreadcrumbList` y `FAQPage`; las preguntas del `FAQPage` son exactamente las visibles.
- [x] Con `INDEXABLE=true`, el sitemap incluye `/certificado-digital/` y `/firmas/`, y no `/sistema-visual/`.

**Calidad**
- [x] Sin desborde lateral en 375, 768, 1024 y 1280px.
- [x] Lighthouse móvil ≥ 90 en las cuatro categorías en las dos páginas (SEO medido con `INDEXABLE=true`).
- [x] `pnpm build` sin errores ni advertencias.

## Para aprobar

1. Los textos nuevos de §2.1 y §2.2.
2. La etiqueta **"Más elegido"** en los planes de 2 años (dato comercial no confirmado).
3. La pregunta nueva sobre persona natural y jurídica.
4. La línea "Pronto habrá bolsas más grandes".
5. Quitar "Preguntas" del menú hasta el spec 006.

---

## 6. Plan técnico

**Reutilizar (no duplicar):** `BaseLayout`, `Header`, `Footer`, `SectionHeading`, `NecesitasLosDos`, `ComoFunciona`, `Preguntas`, `CtaCierre`, `FichasFirmas`, `Etiqueta`, `buttonVariants`, `getFaqs()`, `formatPrice()`, `productWhatsappUrl()`, `productSchema()`, `breadcrumbSchema()`, `faqSchema()`.

**Archivos nuevos**
```
src/content/requisitos.yaml                 requisitos por titular (P07, P08)
src/components/layout/Breadcrumbs.astro     migas de pan
src/components/sections/ProductoHero.astro  encabezado de página de producto (sin ilustración grande)
src/components/sections/PlanesTitular.astro grupo de 3 tarjetas de un titular (recibe planes por props)
src/components/sections/Requisitos.astro    dos columnas de requisitos
src/components/sections/Bolsas.astro        tarjetas de bolsas de firmas
src/components/sections/CompatibleCon.astro "sirven con tu certificado" (2 tarjetas)
src/pages/certificado-digital.astro
src/pages/firmas.astro
```

**Archivos que cambian**
- `src/content.config.ts`: collection `requisitos` (`titular`, `items: string[]`, `orden`).
- `src/content/faqs.yaml`: agregar `certificado-digital` y `firmas` a `paginas` según §2, más la pregunta nueva si se aprueba.
- `src/components/layout/Header.astro`: enlaces por defecto, para no repetirlos en cada página (hoy los recibe por props desde el inicio).
- `src/components/layout/Footer.astro`: columna "Productos".
- `src/components/sections/Productos.astro` y `src/components/islands/CertificadoPlanes.tsx`: enlaces "Ver los 6 planes" / "Ver bolsas de firmas" (el texto llega por props).
- `src/components/sections/NecesitasLosDos.astro`: prop opcional `enlace` ({label, href}).
- `src/pages/index.astro`: los nuevos props.
- `src/lib/ilustraciones.ts` (o un `src/lib/destacar.ts` nuevo): resaltar el destino de un ancla al cargar y en `hashchange`.

**Reglas y trampas conocidas de este proyecto (leer antes de escribir código)**
- Constitución: `specs/constitution.md`. Identidad y reparto del color: `specs/features/002-identidad-visual/spec.md` §2–3.
  - Azul tinta **solo** en lo que se pulsa.
  - Ámbar como decoración (como texto, solo sobre navy o `fr-ink`).
  - Tokens `fr-*`; nada de valores literales si hay token.
- **Sin textos fijos en `src/components/sections/`:** todo llega por props desde la página o desde una collection.
- **No usar `transition-all`** en elementos que anima GSAP (`data-reveal`, `data-anim`). Para hovers: `transition-[translate,box-shadow]`.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular y rompe el archivo. Usar `const v = x ?? 0; v / y`.
- **`buttonVariants()`** ya pasa por `cn`. En `.astro`, usarlo sobre `<a>`. No poner radios `rounded-fr-*` en la base de un `cva`.
- **Placeholders:** solo en datos (`site.ts` o collections), con `# PENDIENTE: Pxx`, **una marca por línea** (dos en la misma línea no se detectan).
- **Servidor de desarrollo:** Astro 7 permite **uno solo** por proyecto. Si `pnpm dev` dice que ya hay uno, usar ese (http://localhost:4321) o `pnpm astro dev stop`.
- **Windows + Git Bash:** los heredocs largos con comillas a veces fallan. Para archivos, usar la herramienta de escritura de archivos y no `cat <<EOF`.
- **Verificación visual:** el panel de navegador de la app puede estar oculto, y entonces no ejecuta animaciones ni IntersectionObserver. Verificar con Chrome sin interfaz: `puppeteer-core` viene con `npx lighthouse@12`, en `%LOCALAPPDATA%/npm-cache/_npx/*/node_modules/puppeteer-core`. Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
- **Lighthouse:** compilar una copia con `INDEXABLE=true pnpm astro build --outDir dist-lh`, servirla con `pnpm astro preview --outDir dist-lh --port 4400`, medir con `npx -y lighthouse@12 <url> --form-factor=mobile` y borrar `dist-lh` al terminar.
- **Git:**
  - Commits **sin** `Co-Authored-By` ni ninguna mención de la IA; el autor es el usuario.
  - Mensaje con el número del spec: `[005] …`.
  - **No hacer push** salvo que el usuario lo pida.

## 7. Tareas

- [x] T1 Collection `requisitos` y marcas de FAQs por página.
- [x] T2 `Breadcrumbs`, `ProductoHero`, `PlanesTitular`, `Requisitos`, `Bolsas`, `CompatibleCon`.
- [x] T3 Página `/certificado-digital/` con su SEO y JSON-LD.
- [x] T4 Página `/firmas/` con su SEO y JSON-LD.
- [x] T5 Header, footer, enlaces del inicio y prop `enlace` en `NecesitasLosDos`.
- [x] T6 Resaltado de anclas de planes.
- [x] T7 Verificación: criterios de §5 (Chrome sin interfaz + Lighthouse en las dos páginas). Anotar resultados y decisiones en §8, y dejar el spec en `en-curso` para que el usuario lo revise.

## 8. Notas de implementación

**2026-11-16**

Verificado con Chrome sin interfaz (puppeteer-core) y Lighthouse 12 móvil sobre `INDEXABLE=true pnpm astro build --outDir dist-lh` (borrada al terminar):

| Página | Perf. | Accesib. | Buenas prácticas | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/certificado-digital/` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 30 ms |
| `/firmas/` | 97 | 100 | 100 | 100 | 2.4 s | 0 | 10 ms |

- `pnpm build`: 0 errores, 0 advertencias, 5 páginas. `pnpm pendientes` lista P07 y P08 en `requisitos.yaml`.
- Sin desborde lateral en 375, 768, 1024 y 1280 px (`scrollWidth` = ancho de ventana); contenedor en `left: 0` y ancho completo, un `h1` y un `h2` por sección sin saltos. Capturas revisadas en 375 y 1280 px.
- Anclas: las 6 centran la tarjeta (centro a 400 de 800 px) y la resaltan con anillo ámbar de 3px que se apaga a los 2.2 s, con carga directa, por `hashchange` y desde otra página (router). Con "reducir movimiento": scroll instantáneo y anillo igual.
- Sin JS: las dos páginas muestran todo y los botones de WhatsApp están (8 y 3).
- JSON-LD: 6 `Product`+`Offer` / 1 `Product`, `BreadcrumbList` y `FAQPage`, con las preguntas idénticas a las visibles. Sitemap con las dos páginas y sin `/sistema-visual/`. No se corrió el Rich Results Test de Google (requiere URL pública).

**Decisiones**
- **`SectionHeading`: `etiqueta` pasa a opcional.** El spec pide `h2` sin etiqueta en varias secciones y no quise inventar textos.
- **`h2` de la sección de bolsas: "Bolsas de firmas"** (el spec no lo define; es descriptivo y sin relleno). Revisar si prefieres otro.
- **Textos repetidos en `src/config/secciones.ts`** (nota de atención, "Necesitas los dos", "Cómo funciona", preguntas, cierre): las tres páginas los usan y así no se desincronizan. El inicio también los lee de ahí; su contenido no cambió.
- **`destacar.ts`:** no usa `scrollIntoView` porque suma el `scroll-margin-top` y deja la tarjeta 36px bajo el centro; calcula la posición con `offsetTop` (ignora el transform de `data-reveal`). Además espera 50 ms: `ClientRouter` hace `scrollTo(0, 0)` en el mismo instante de `astro:page-load` y cancelaba el scroll suave.
- **Enlace "Necesitas los dos" sobre navy:** `link` en blanco (el azul tinta no se lee sobre navy), ámbar al pasar el cursor.
- En el inicio, "Necesitas los dos" no lleva enlace (el spec solo lo pide en las páginas de producto).
- "Ver los 6 planes" se calcula con la cantidad de planes de la collection.
- Cada botón "Comprar" lleva el nombre del plan/bolsa en texto solo para lectores de pantalla.

**Pendiente / a revisar**
- LCP de 2.5 s (justo en el límite de la constitución, `< 2.5 s`) en `/certificado-digital/`; el puntaje de Performance es 97.
- El menú de navegación sigue oculto en móvil (`hidden md:block`, ya era así): en 375 px no hay forma de llegar a las dos páginas desde el header; solo desde el footer y las tarjetas del inicio. Fuera del alcance de este spec.
- Precios y requisitos siguen siendo placeholders (P01, P02, P07, P08).
