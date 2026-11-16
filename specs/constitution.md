# Constitución — Web Firma Remota

> Versión 0.4.0 · 2026-11-16 · Estado: **borrador, pendiente de aprobación**

Reglas que no cambian de una funcionalidad a otra. Todo spec, plan e implementación de este repositorio las cumple. Si una tarea choca con esta constitución, se detiene y se propone un cambio a la constitución (ver §12) antes de seguir.

Los puntos marcados **[POR CONFIRMAR]** son datos que todavía no tenemos y no se deben inventar.

---

## 1. Propósito y alcance

- Web de **firma remota**, subproducto de **Girasol.pe**. Comparte su marca, su design system y su tono.
- Dominio: **`https://firmaremota.pe`** (dominio propio). Es el valor de `site` en `astro.config` y la base de canonical, sitemap y schema.
- Idioma: español de Perú (`es-PE`). Una sola lengua por ahora; la arquitectura de contenido permite agregar otra sin tocar componentes.
- Producto, precios, requisitos y promesas comerciales: **[POR CONFIRMAR]** con el negocio. Nada de esto se inventa (§5).

---

## 2. Proceso: desarrollo guiado por specs (SDD)

Versión propia y ligera. **Ningún código se escribe sin un spec aprobado**, incluida la infraestructura.

### Estructura

```
specs/
├─ constitution.md           ← este archivo
├─ site.md                   ← mapa del sitio: páginas, URLs, objetivo de cada una
├─ pendientes.md             ← datos por confirmar y sus placeholders (§5.1)
├─ _templates/spec.md        ← plantilla de cada funcionalidad
└─ features/
   └─ NNN-nombre-corto/
      └─ spec.md             ← spec + plan + tareas de una funcionalidad
```

- `NNN` es correlativo (`001-setup`, `002-hero`…) y nunca se reutiliza.
- Una funcionalidad = una página, una sección o un cambio de infraestructura.

### Flujo y estados

| Estado | Qué significa | Quién avanza |
|---|---|---|
| `borrador` | Se están escribiendo qué y por qué (secciones 1–5 del spec) | Claude o el equipo |
| `aprobado` | El qué está acordado; se escribe el plan técnico y las tareas | **El usuario** aprueba |
| `en-curso` | Se implementa tarea por tarea | Claude o el equipo |
| `hecho` | Cumple todos los criterios de aceptación y la definición de terminado (§11) | **El usuario** verifica |

- El spec describe **comportamiento y criterios comprobables**, no código.
- Si durante la implementación algo del spec resulta incorrecto, se corrige el spec primero y luego el código. El spec siempre refleja lo que está construido.
- Specs cortos: una funcionalidad cabe en una página. Si no cabe, se divide.

---

## 3. Stack

| Capa | Elección | Regla |
|---|---|---|
| Framework | **Astro 7**, salida estática | Sin SSR mientras no haya una funcionalidad que lo exija |
| Gestor de paquetes | **pnpm** | No mezclar con npm ni yarn |
| Estilos | **Tailwind v4** (`@tailwindcss/vite`) + tokens de Girasol (§6) | Sin CSS suelto salvo en `src/styles/` |
| Componentes interactivos | **React** vía `@astrojs/react` | Solo donde hay estado o interacción (§4) |
| Base de UI | **shadcn/ui** y registries compatibles (animate-ui, ElevenLabs UI, tripled, animateicons…) | Se copian al repo y se adaptan a la marca (§6.3) |
| Animación en React | **Motion** | Único motor dentro de islas React |
| Animación en `.astro` | **GSAP** + ScrollTrigger (y SplitText si hace falta) | Único motor fuera de React |
| Transiciones de página | View Transitions de Astro (`<ClientRouter />`) | — |
| Tipos | TypeScript estricto | — |

Agregar una dependencia nueva requiere justificarla en el plan del spec: qué resuelve y por qué no alcanza con lo que ya hay.

---

## 4. Arquitectura

```
src/
├─ components/
│  ├─ ui/          ← shadcn + registries, en React, ya adaptados a la marca
│  ├─ icons/       ← iconos (lucide / animateicons)
│  ├─ sections/    ← secciones de página en .astro, una carpeta por sección
│  └─ islands/     ← componentes React propios que combinan ui/
├─ config/
│  └─ site.ts      ← datos globales del sitio (§5)
├─ content/        ← Content Collections
├─ layouts/        ← BaseLayout con <SEO />, fuentes y ClientRouter
├─ lib/            ← utilidades (cn, helpers de schema, helpers de GSAP)
├─ styles/
│  ├─ global.css   ← @import "tailwindcss" + tokens de Girasol
│  └─ girasol/     ← tokens generados por la skill (no editar a mano)
└─ pages/
```

- **Astro primero.** Todo lo que no tiene estado es `.astro` y no envía JS al navegador.
- **Islas React** solo para interacción real. Se cargan con `client:visible` o `client:idle`; `client:load` solo con justificación en el plan.
- **Sin textos fijos en `sections/`**: las secciones reciben su contenido por props o lo leen de una collection.
- Alias de imports `@/` → `src/`.
- Nombres: componentes en `PascalCase`, carpetas y archivos de contenido en `kebab-case`.

---

## 5. Contenido

| Tipo | Dónde vive |
|---|---|
| Datos globales (nombre, contacto, WhatsApp, redes, menú, footer) | `src/config/site.ts`, tipado |
| Contenido repetible con la misma forma (FAQs, planes, pasos, testimonios) | Content Collection en YAML/JSON con esquema Zod |
| Contenido largo (legales, blog, guías) | Content Collection en Markdown/MDX |
| Textos de una sección única | En la página, que los pasa a la sección por props |

- Las collections validan con esquema: un dato faltante **rompe el build**, no llega a producción.
- **Nunca inventar** precios, plazos, requisitos ni beneficios. Lo no confirmado se marca `[POR CONFIRMAR]` en el spec y no se publica.
- Tono de Girasol: directo, segunda persona, frases cortas, sin relleno de marketing. FAQs escritas como las preguntaría un cliente y respondidas en 2–3 frases.
- Precios con formato de marca: `S/ 472.00`, `US$ 15.00`.
- Promociones con fecha: el periodo se ve en pantalla y el spec indica cuándo retirarlas.

### 5.1 Placeholders y versión de presentación

Para poder presentar una primera versión antes de tener todos los datos, se permiten **placeholders** con estas reglas:

- **Solo los autoriza el usuario.** Cada uno se registra en [`specs/pendientes.md`](pendientes.md) con un ID (`P01`…) y el valor que se usa mientras tanto. Un dato que no está en esa lista sigue la regla general: no se inventa.
- **Solo viven en los datos** (`site.ts` o las collections), nunca dentro de un componente, y llevan un comentario con su ID (`// PENDIENTE: P15`). Así se encuentran todos con una búsqueda y reemplazarlos no toca el diseño.
- **Se ven como datos reales** en pantalla, para que la presentación sea creíble. Lo que los distingue está en el código y en `pendientes.md`, no en la página.
- **Mientras quede alguno pendiente, el sitio no se indexa:** el build agrega `noindex` y bloquea el sitemap, para que Google no guarde precios o datos de prueba. Al confirmarse todos, se quita.

---

## 6. Diseño: sub-marca "Tinta digital", derivada de Girasol

firmaremota.pe es un producto de Girasol con **identidad propia**. Hereda de Girasol el navy, Outfit, el layout y sus reglas de marca; tiene su propio color de acción, fondo, tipografías de apoyo y motivos. La definición completa está en [`features/002-identidad-visual/spec.md`](features/002-identidad-visual/spec.md).

### 6.1 Tokens

Hay dos capas:

- **Girasol (`gs-*`)**, heredada: se genera con `node <skill>/scripts/build.mjs --out src/styles/girasol` y se versiona. De ahí salen el layout (`gs-container`, `gs-section`) y los valores compartidos. No se edita a mano.
- **firmaremota (`fr-*`)**, propia: `src/styles/firmaremota/tokens.css`. Es la que usan los componentes para color, radio, sombra y fuentes (`bg-fr-paper`, `text-fr-tinta`, `rounded-fr-card`, `font-fr-mono`…).
- Si existe un token `fr-*` para algo, se usa ese y no el `gs-*` equivalente. Nada de valores literales si hay token.
- Fuentes: Outfit (400–800) para títulos y texto, Instrument Serif en cursiva para resaltar palabras, JetBrains Mono para etiquetas y datos. Outfit no tiene peso 900.

### 6.2 Reglas de marca que más se rompen

- **El azul tinta es solo para lo que se pulsa** (botones, enlaces, foco). Títulos, etiquetas, iconos y decoración van en navy, gris o ámbar.
- **El ámbar girasol es decorativo** y se usa poco (sello, subrayados, puntos, un resultado destacado). Nunca como texto sobre papel; como texto, solo sobre navy o tinta negra (`fr-ink`).
- No se agregan otros colores (verdes, rojos…) para llamar la atención.
- **Una acción principal por bloque.** El resto son secundarios con borde o enlaces.
- **WhatsApp:** nunca verde. Como aquí comprar es escribir por WhatsApp, el botón "Comprar" usa el **primario** (tinta) con texto de acción ("Comprar", "Comprar firmas"), no "WhatsApp" (P20, aprobado). Un contacto genérico por WhatsApp va como secundario.
- Sombras teñidas de navy o tinta, nunca negras.
- La serif cursiva solo resalta **una o dos palabras** por título; nunca un párrafo.
- Todo alineado a `gs-container`; nunca `max-w-*` sueltos.
- Ritmo vertical de sección: 64px en móvil, 80px desde 768px.
- Destinos de anclas con `scroll-margin-top: 7rem`.
- Antes de inventar un patrón, buscar uno en `references/components.md`.

### 6.3 Componentes de terceros (shadcn y registries)

Traen su propio aspecto y por defecto **no se ven como la marca**. Por eso:

1. Las variables de tema de shadcn (`--primary`, `--background`, `--radius`, `--ring`…) se mapean **una sola vez** a los tokens `fr-*` en `global.css`.
2. Al agregar un componente se revisa contra el spec 002: color de acción, radios, sombras, tipografía y movimiento. Lo que no encaja se ajusta en la copia del repo.
3. Se usan con mesura: el efecto de un registry debe servir al contenido. Si un componente nativo o un `.astro` hace lo mismo (por ejemplo, el FAQ con `<details>`), gana el nativo.
4. Un patrón nuevo que funcione y se repita se propone para la skill (la skill es compartida por todas las apps de Girasol: se pregunta antes de editarla).

---

## 7. Animación

- Valores del design system: `fast` 150ms, `base` 300ms, `slow` 500ms, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (≈ `power2.out`), desplazamiento de entrada 24px, cascada de 0.1s.
- **Un motor por contexto:** Motion dentro de React, GSAP en `.astro`, CSS para microinteracciones (hover, foco). No se combinan dos motores en el mismo elemento.
- **El contenido no depende de la animación:** sin JS la página se ve completa.
- **`prefers-reduced-motion`** se respeta siempre: sin entradas animadas, sin scroll suave, sin parallax ni elevaciones.
- Animaciones que bloquean la lectura (texto que tarda en aparecer, intros) no están permitidas en el primer pantallazo.

---

## 8. SEO

### URLs
- Español, minúsculas, con guiones, sin fechas ni IDs: `/firma-remota/`, `/precios/`, `/preguntas-frecuentes/`.
- **`trailingSlash: "always"`**, igual que girasol.pe (`/cupones/`), para que ambos sitios sigan la misma convención.
- Máximo dos niveles de profundidad.
- Una URL publicada no se borra: si cambia, se agrega una redirección en `astro.config`.
- Las anclas que otras páginas enlazan (`#cotizar_N`, etc.) se conservan en los rediseños.

### Por página (obligatorio, lo exige el tipado del layout)
- `title` (con plantilla `%s | Marca`) y `description` propios.
- Canonical, Open Graph, Twitter Card, `robots`, `<html lang="es-PE">`.
- Un solo `h1`; un `h2` por sección; jerarquía sin saltos.

### Datos estructurados (JSON-LD, tipados con `schema-dts`)
| Dónde | Schema |
|---|---|
| Todo el sitio | `Organization` (relacionada con Girasol) y `WebSite` |
| Páginas de servicio | `Service` y `Offer` para cada plan, generados de la collection de planes |
| Páginas internas | `BreadcrumbList` |
| FAQs | `FAQPage`, generado **de los mismos datos visibles**; nunca incluye preguntas que no se ven |
| Blog (si existe) | `Article` |

### Técnico
- `@astrojs/sitemap`: el sitemap se regenera en cada build.
- `robots.txt` y página 404 propia.
- Imagen Open Graph por página (una por defecto al inicio).
- Imágenes con `astro:assets` (formato moderno, dimensiones explícitas, `alt`).

---

## 9. Rendimiento y accesibilidad

- Objetivo Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO, en móvil.
- Core Web Vitals en verde: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Fuentes precargadas, con `font-display: swap`.
- Contraste AA, foco visible (anillo de 2px en `fr-tinta`), área táctil mínima de 48px.
- Decoraciones con `aria-hidden`; listas como `<ol>`/`<ul>`; carruseles que pausan con hover o foco.
- Responsive mobile-first, verificado en 375, 768, 1024 y 1280px, sin desborde horizontal.

---

## 10. Convenciones de código

- TypeScript estricto; las props de cada componente tienen tipo.
- Utilidad `cn()` para combinar clases.
- Un componente por archivo; una carpeta por sección.
- Comentarios solo donde el porqué no es obvio.
- Git: commits pequeños, uno o varios por tarea del spec, con el número del spec en el mensaje (`[002] hero: …`).

---

## 11. Definición de terminado

La verificación tiene **dos niveles**, para no gastar tiempo ni tokens en cada iteración.

### 11.1 Verificación ligera: en cada spec o iteración

Una funcionalidad pasa a `hecho` si:

- [ ] Cumple los criterios de aceptación de su spec que **no** dependen de la verificación completa.
- [ ] `pnpm build` termina sin errores ni advertencias nuevas (incluye `astro check` y el chequeo de pendientes).
- [ ] Se comprobó **lo que cambió**: las páginas o secciones tocadas, en 375 y 1440 px, con mediciones o capturas puntuales de esas partes; sin desborde lateral.
- [ ] Lo nuevo con animación o interacción tiene su estado final sin JS (revisado en el código o con una prueba puntual).
- [ ] Todo dato no confirmado es un placeholder registrado en `pendientes.md` y marcado en el código (§5.1).
- [ ] El spec refleja lo construido.

**No** se corren en esta etapa Lighthouse, la matriz completa de anchos, los barridos de todas las páginas ni los validadores externos.

### 11.2 Verificación completa: solo antes de un push a GitHub

Cuando el usuario decide subir, una sola vez sobre todo lo acumulado:

- [ ] Lighthouse móvil ≥ 90 en las cuatro categorías en todas las páginas públicas.
- [ ] 375, 768, 1024 y 1280 px en todas las páginas, midiendo (alineación con el contenedor, sin desborde, bordes visibles).
- [ ] Todas las páginas sin JS y con `prefers-reduced-motion`.
- [ ] JSON-LD coherente con lo visible en cada página (y validado en Rich Results Test cuando haya URL pública).
- [ ] Un **resumen** para el usuario: qué se verificó, los números y lo que haya que corregir. Si algo falla, se corrige antes del push.

---

## 12. Cambios a esta constitución

- Se propone el cambio indicando qué regla cambia y por qué.
- Solo el usuario lo aprueba.
- Versionado SemVer: *patch* aclara, *minor* agrega una regla, *major* cambia o elimina una.
- Se registra abajo.

### Historial
- **0.1.0** (2026-11-16): primera versión.
- **0.1.1** (2026-11-16): dominio confirmado, `firmaremota.pe`.
- **0.2.0** (2026-11-16): se agrega §5.1, placeholders y versión de presentación, con su lista en `pendientes.md`.
- **0.3.0** (2026-11-16): §6 pasa de "consumir Girasol" a una sub-marca derivada, "Tinta digital" (spec 002), con tokens propios `fr-*`.
- **0.3.1** (2026-11-16): §6.2 reparte el color: azul tinta solo para lo accionable y ámbar girasol como acento decorativo.
- **0.3.2** (2026-11-16): §6.2 regla de WhatsApp: "Comprar" usa el botón primario (P20).
- **0.4.0** (2026-11-16): §11 se divide en verificación ligera (cada spec) y verificación completa (Lighthouse y barridos, solo antes de un push).
