# [001] Setup: base técnica del sitio

> Estado: `hecho` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Constitución: v0.2.0

<!--
Excepción a la plantilla: al ser infraestructura, el "qué" y el "cómo" casi coinciden,
así que este spec trae el plan técnico y las tareas desde el borrador.
La aprobación cubre todo el documento.
-->

## 1. Contexto y objetivo

El proyecto es el Astro 7 recién creado, con el ejemplo por defecto. Antes de construir cualquier página hace falta la base que fija la constitución: estilos con la marca de Girasol, React para las islas, shadcn y sus registries, animación, SEO y el manejo de placeholders.

**Objetivo medible:** que el spec de la primera página (inicio) se pueda implementar **sin instalar ni configurar nada más**, solo creando secciones y contenido.

**Fuera de alcance**
- Cualquier página real: inicio, productos, FAQ y legales tienen su propio spec.
- Las collections `faqs` y `blog`: se crean en el spec que las usa. Sus URLs ya están reservadas en `site.md`.
- Motion: se instala solo con el primer componente de un registry que lo necesite (shadcn lo agrega como dependencia). Así no queda una librería sin usar.
- Lenis (scroll suave): no hace falta por ahora.
- Deploy y hosting.

## 2. Contenido

El setup crea los datos base, con los placeholders registrados en `pendientes.md`.

| Elemento | Dato | Fuente |
|---|---|---|
| Nombre del sitio | firmaremota.pe | `site.ts` |
| URL base | `https://firmaremota.pe` | `astro.config` (`site`) |
| Plantilla de título | `%s \| firmaremota.pe` | `site.ts` |
| Descripción por defecto | Texto corto sobre firma remota | `site.ts` |
| WhatsApp de ventas | `+51 999 999 999` | `site.ts` · **P17** |
| Mensajes prellenados | Uno por producto | `site.ts` · **P10** |
| Razón social y RUC | `RAZÓN SOCIAL S.A.C.` · `20XXXXXXXXX` | `site.ts` · **P13** |
| Mención a Girasol | "Un producto de Girasol" | `site.ts` · **P14** |
| Planes de certificado | Natural y jurídica × 1, 2 y 3 años, US$ 20.00, incluye IGV | collection `productos` · **P01** |
| Bolsa de firmas | 10 firmas, US$ 10.00, no vence, incluye IGV | collection `productos` · **P02** |
| Moneda | USD | collection `productos` · **P03** |
| Imagen Open Graph por defecto | Imagen simple con el nombre del sitio | `public/og/default.png` · **P19** |

## 3. Comportamiento

**Estilos y marca**
- Tailwind v4 funcionando con los tokens de Girasol: las clases `gs-*` (`bg-gs-navy`, `bg-gs-navy/10`, `shadow-gs-card`, `rounded-gs-card`, `gs-container`, `bg-gs-gradient-action`) generan los valores del `DESIGN.md`.
- Fuentes Outfit (600, 700, 800) y Poppins (400, 600, 700) servidas desde el propio sitio, sin Google Fonts, y precargadas.
- Fondo `surface`, texto base en Poppins, foco visible con anillo de 2px en `action`.

**React y shadcn**
- Una isla React se puede usar desde un `.astro` con `client:visible` o `client:idle`.
- shadcn inicializado: los componentes se agregan con `pnpm dlx shadcn add …` y caen en `src/components/ui/`.
- **Las variables de tema de shadcn** (`--primary`, `--ring`, `--radius`, `--background`, `--foreground`, `--muted`, `--border`…) apuntan a los tokens de Girasol. Un componente recién agregado ya sale en azul `action`, con los radios y la tipografía de la marca.
- Los registries (animate-ui, ElevenLabs UI, tripled, animateicons) quedan registrados en `components.json`, para agregarlos por nombre.

**Animación**
- Un helper de GSAP para "revelar al hacer scroll" con los valores del design system (24px, 500ms, easing de marca, cascada de 0.1s). Se activa con un atributo (`data-reveal`) en cualquier `.astro`.
- Sin JS o con `prefers-reduced-motion`, el contenido se ve completo y sin animación.
- View Transitions de Astro activadas en el layout.

**SEO**
- `BaseLayout` exige `title` y `description`: si una página no los pasa, TypeScript da error.
- Cada página sale con canonical (con `/` final), Open Graph, Twitter Card, `robots` y `<html lang="es-PE">`.
- JSON-LD global: `Organization` (con Girasol como organización matriz, P14) y `WebSite`, generados con tipos de `schema-dts` desde `site.ts`.
- Helpers listos para `BreadcrumbList`, `Product` + `Offer` y `FAQPage`, para que los usen los specs de página.
- `@astrojs/sitemap` genera el sitemap en cada build.
- `robots.txt` generado en el build y página 404 con el layout del sitio.

**Placeholders e indexación (constitución §5.1)**
- **Por defecto el sitio no se indexa:** `noindex` en todas las páginas y `robots.txt` con `Disallow: /`.
- Para indexar hay que activar `INDEXABLE=true` al compilar, y el build **falla** si con eso activo todavía queda algún `PENDIENTE: Pxx` en el código.
- `pnpm pendientes` lista todos los placeholders del código con su ID y archivo.

**Proyecto**
- Se quita el ejemplo de Astro (`Welcome.astro` y sus assets).
- `index.astro` queda como **página de verificación temporal**: un título, botones y una tarjeta con los tokens, un componente shadcn y un bloque con `data-reveal`. El spec del inicio la reemplaza.

## 4. SEO

No crea páginas indexables. Deja la infraestructura de la constitución §8:

| Campo | Valor |
|---|---|
| `site` | `https://firmaremota.pe` |
| `trailingSlash` | `"always"` · `build.format: "directory"` |
| Plantilla de título | `%s \| firmaremota.pe` |
| Schema global | `Organization` + `WebSite` |
| Indexación | Desactivada mientras haya pendientes |

## 5. Criterios de aceptación

Verificados el 2026-11-16 (detalle en §8).

**Base**
- [x] `pnpm install`, `pnpm dev` y `pnpm build` funcionan sin errores ni advertencias nuevas.
- [x] `pnpm check` (astro check): 0 errores, 0 advertencias, 0 sugerencias.
- [x] El alias `@/` funciona en `.astro`, `.ts` y `.tsx`.
- [x] No queda nada del ejemplo de Astro.

**Marca**
- [x] `--gs-color-navy` vale `#0E035C` en el navegador.
- [x] `bg-gs-navy/10` da navy al 10 % (Tailwind v4 lo expresa en `oklab`); `shadow-gs-card` y `bg-gs-gradient-action` generan estilos.
- [x] `gs-container` mide como máximo 1350px (1024px por debajo de 1200px), con 24px de padding (20px por debajo de 576px).
- [x] Un elemento con `border` tiene `borderTopStyle: "solid"` (ningún reset borra los bordes).
- [x] Outfit y Poppins cargan desde el propio dominio, sin peticiones a Google Fonts; no se usa el peso 900.
- [x] Un `Button` de shadcn sale con la marca. **Ajuste:** el tema le da color, radio y tipografía sin tocar nada, pero la altura de 48px, el degradado y la sombra exigieron adaptar una vez la copia de `button.tsx` (§8).

**Interacción y animación**
- [x] Una isla React con `client:visible` se hidrata y responde.
- [x] Un bloque con `data-reveal` aparece con la animación de marca al hacer scroll (24px → 0, opacidad 0 → 1, ~500ms).
- [x] Sin JS (el HTML no oculta nada) y con `prefers-reduced-motion` (no se crea ninguna animación), el bloque se ve completo.

**SEO e indexación**
- [x] Una página sin `title` o `description` no compila (`pnpm build` corre `astro check`).
- [x] El HTML trae canonical con `/` final, Open Graph, Twitter Card y `lang="es-PE"`.
- [ ] El JSON-LD de `Organization` y `WebSite` valida en el validador de schema.org. **Parcial:** la estructura la garantizan los tipos de `schema-dts`; falta pasarlo por el validador externo cuando haya una URL pública.
- [x] Con `INDEXABLE=true` el build genera el sitemap; `/404` usa el layout del sitio.
- [x] Sin `INDEXABLE`: todas las páginas tienen `noindex` y `robots.txt` bloquea todo.
- [x] Con `INDEXABLE=true` y placeholders en el código, el build falla y lista los IDs pendientes.
- [x] `pnpm pendientes` lista P01, P02, P03, P10, P13, P14, P17 y P19.

**Calidad**
- [x] Sin desborde horizontal y con los bordes del contenido alineados en 375, 768, 1024 y 1280px.
- [x] Lighthouse móvil ≥ 90: Performance 99 · Accesibilidad 93 · Buenas prácticas 100 · SEO 100 (LCP 1.8 s, CLS 0, TBT 0 ms). Ver el hallazgo de contraste en §8.

---

## 6. Plan técnico

**Versiones** (verificadas el 2026-11-16; se fijan las que instale pnpm)

| Paquete | Versión | Para qué |
|---|---|---|
| `tailwindcss` + `@tailwindcss/vite` | 4.3.x | Estilos |
| `@astrojs/react` + `react` + `react-dom` | 7.1.x · 19.x | Islas |
| `@astrojs/sitemap` | 3.7.x | Sitemap |
| `gsap` | 3.15.x | Animación en `.astro` |
| `schema-dts` (dev) | 2.1.x | Tipos de JSON-LD |
| `tw-animate-css` | 1.4.x | Animaciones CSS que usa shadcn |
| `lucide-react` | 1.x | Iconos (lo pide shadcn) |
| API de fuentes de Astro (`fontProviders.fontsource()`) | incluida en Astro 7 | Fuentes servidas desde el sitio, con precarga |
| `cn` | 0.5.x | `cn()` oficial de shadcn (reemplaza `clsx` + `tailwind-merge`) |
| `radix-ui` + `class-variance-authority` | — | Base de los componentes de shadcn (los instala shadcn) |
| `typescript` (dev) | 6.0.x | `@astrojs/check` todavía no admite TypeScript 7 |

**Archivos**

```
astro.config.mjs              site, trailingSlash, build.format, integraciones, plugin de Tailwind
tsconfig.json                 alias @/ y JSX de React
components.json               configuración de shadcn + registries
package.json                  scripts: pendientes, check;
                              build = pendientes --check + astro check + astro build
scripts/pendientes.mjs        busca "PENDIENTE: Pxx" en src/ y los lista;
                              con INDEXABLE=true y resultados, sale con error
scripts/indexable.mjs         lee INDEXABLE del entorno y de los .env (script y astro.config)
src/lib/format.ts             formato de precio y etiquetas (titular, vigencia)
src/components/ui/button.tsx  Button de shadcn adaptado a las recetas de Girasol
src/components/islands/VerificacionIsla.tsx   isla de prueba (temporal)
.claude/launch.json           servidor de desarrollo para el panel de vista previa
src/styles/global.css         @import tailwindcss, tw-animate-css, tokens; tema shadcn → tokens gs
src/styles/girasol/           tokens generados por la skill (no se editan a mano)
src/config/site.ts            datos globales con sus marcas PENDIENTE
src/content.config.ts         collection productos (esquema Zod)
src/content/productos.yaml    6 planes de certificado + bolsa de 10 (un solo YAML)
src/lib/utils.ts              cn()
src/lib/seo/schema.ts         helpers de JSON-LD tipados
src/lib/whatsapp.ts           arma el enlace wa.me con el mensaje del producto
src/lib/reveal.ts             helper GSAP para data-reveal, con reduced-motion
src/components/seo/SEO.astro  meta, canonical, OG, robots
src/components/seo/JsonLd.astro
src/layouts/BaseLayout.astro  html es-PE, fuentes, SEO, JSON-LD global, ClientRouter, reveal
src/pages/index.astro         página de verificación temporal
src/pages/404.astro
src/pages/robots.txt.ts       robots según INDEXABLE
public/og/default.png         imagen OG por defecto (placeholder)
```

**Decisiones**
- **Tokens:** se generan con `node ~/.claude/skills/girasol-design/scripts/build.mjs --out src/styles/girasol` y se versionan. Es la primera vez que se usa la salida para Tailwind v4: si algo no funciona, se corrige aquí en el proyecto y se propone el arreglo a la skill (sin editarla sin permiso).
- **Tema de shadcn:** se mapea en `global.css`, no en cada componente. Un componente de un registry que use colores fijos (no variables) se ajusta en su copia del repo.
- **Fuentes con la API de fuentes de Astro** (proveedor Fontsource): se descargan en el build, van en el mismo dominio, se precargan y generan fuentes de respaldo con métricas ajustadas. No hacen falta paquetes `@fontsource/*`.
- **Indexación segura por defecto:** es más difícil indexar por error una versión con datos falsos que olvidarse de activarla.
- **Layout único** (`BaseLayout`) en esta etapa; un layout de artículo llega con el spec del blog.

**Riesgos**
- **Versión de Node:** tienes **v22.14.0** y el `package.json` exige **≥ 22.23.4**. Antes de instalar hay que actualizar Node (por ejemplo, la última 22 LTS o la 24 LTS). Es un cambio en tu equipo, así que lo haces tú. Si se instala con la versión vieja, Astro 7 puede fallar de formas poco claras.
- **Salida v4 de los tokens sin probar:** cubierto por los criterios de "Marca".
- **shadcn + Astro:** `shadcn init` detecta Astro, pero el CSS y los alias se revisan a mano después de correrlo.

## 7. Tareas

- [x] **T0** (usuario) Actualizar Node a ≥ 22.23.4 y confirmar con `node -v`.
- [x] **T1** Limpiar el ejemplo de Astro; configurar `astro.config` (site, trailingSlash, build.format) y el alias `@/`.
- [x] **T2** Tailwind v4 + generar los tokens de Girasol + `global.css` + fuentes.
- [x] **T3** React + shadcn init + mapear su tema a los tokens + registrar los registries + agregar `Button` de prueba.
- [x] **T4** `site.ts` y collection `productos` con los placeholders marcados.
- [x] **T5** `BaseLayout`, `SEO`, `JsonLd`, helpers de schema, sitemap, `robots.txt`, 404.
- [x] **T6** Script de pendientes, chequeo de `INDEXABLE` antes del build.
- [x] **T7** GSAP + helper `data-reveal` + View Transitions.
- [x] **T8** Página de verificación temporal.
- [x] **T9** Verificación: criterios de §5 medidos en el navegador (375, 768, 1024, 1280px) y Lighthouse.

## 8. Notas de implementación

**2026-11-16 — implementación**

- **Node:** se actualizó a 24.22.3 LTS con nvm-windows (T0).
- **TypeScript 6**, no 7: `@astrojs/check` exige `typescript < 7`.
- **Fuentes:** se usó la API de fuentes de Astro en lugar de paquetes de Fontsource (§6, Decisiones). Las variables `--ff-outfit` y `--ff-poppins` alimentan `--gs-font-family-heading` y `--gs-font-family-body` en `global.css`.
- **`cn`:** shadcn (estilo Nova) usa el paquete oficial `cn`. `@/lib/utils` lo reexporta para los componentes de registries que importan desde ahí.
- **Button:** la copia de `button.tsx` se adaptó a las recetas de Girasol. Variantes: `default` (primario), `outline` (secundario claro), `outline-dark`, `navy`, `ghost` y `link`. Tamaños: `default`, `sm`, `pill` e `icon`, todos de al menos 48px.
  - `buttonVariants()` pasa siempre por `cn`, para usarlo en `.astro` sobre un `<a>` sin cargar React. Sin eso, el borde del secundario quedaba transparente por el conflicto entre las clases de la base y las de la variante.
  - El radio va en cada tamaño: `cn` no reconoce `rounded-gs-*` como clase de radio y no podía reemplazarlo por `rounded-full` en la píldora.
  - **Regla para futuros componentes:** no poner clases `gs-*` de radio o sombra en la base de un `cva` si una variante las va a cambiar.
- **Sitemap:** la integración solo se carga con `INDEXABLE=true`. Sin eso, el plugin avisaba "No pages found!" en cada build.
- **Collection `productos`:** un solo archivo YAML con el loader `file()`, en lugar de una carpeta. Es más fácil de mantener con 7 registros.
- **`pnpm build` corre `astro check`:** sin eso, una página sin `title` igual compilaba; solo lo marcaba el editor.
- **Registries:** animate-ui y animateicons funcionan sin configuración. ElevenLabs UI (`@elevenlabs`) y tripled (`@tripled`) quedaron registrados en `components.json`. tripled se probó; ElevenLabs respondió 429 (límite de peticiones) y queda por probar al agregar el primer componente.
- **tripled usa `framer-motion`**, no `motion`. Al agregar un componente de tripled, cambiar sus imports a `motion/react` para mantener un solo motor (constitución §7).
- **Verificación de la animación:** el panel del navegador estaba oculto, y así se detiene `requestAnimationFrame`. Se verificó avanzando el reloj de GSAP a mano y midiendo opacidad y desplazamiento. Conviene una revisión visual con el panel visible.

**Hallazgo de accesibilidad (design system de Girasol)**

Lighthouse marcó contraste insuficiente en el badge píldora (`text-gs-action` sobre `bg-gs-action/10`, 10px): **3.13:1**, cuando AA pide 4.5:1. Por cálculo, el mismo problema afecta a recetas que Lighthouse no puede medir por estar sobre degradados:
- Texto blanco sobre el botón primario (`action` → `action-light`): entre **~3.5:1 y ~2.9:1**, en 14px bold.
- Eyebrow en `action` sobre fondos claros: **~3.3:1**, en 11px.

Son recetas del design system, que comparten todas las apps de Girasol, así que no se cambiaron aquí. Queda registrado como **P21** en `pendientes.md`.
