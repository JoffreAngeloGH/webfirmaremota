# [006] Diseño de las páginas de producto, espacios y menú móvil

> Estado: `aprobado` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Aprobado por el usuario el 2026-11-16: todo lo de "Para aprobar" (matriz de planes, textos nuevos, ilustraciones y menú móvil). Se ejecuta en la PC de casa.
> Constitución: v0.3.2 · Depende de: 005 (`hecho`)
> Lo implementa otra sesión. Este spec trae todo lo necesario: no hace falta el historial de la conversación.
> Nota de numeración: la página `/preguntas-frecuentes/` pasa a ser el spec 007.

## 1. Contexto y objetivo

El spec 005 creó `/certificado-digital/` y `/firmas/`. Funcionan y están verificadas, pero al revisarlas el usuario las encontró **poco trabajadas visualmente**, con **dos espacios grandes** que no cuadran. Medido en 1440 px:

| Página | Espacio vacío bajo el hero | Causa |
|---|---|---|
| `/` | 194 px | `Hero` termina con `pb-28` (112 px) y la sección siguiente empieza con `gs-section` (80 px) |
| `/certificado-digital/`, `/firmas/` | 160 px | `ProductoHero` termina con `pb-20` (80 px) + `gs-section` (80 px) |

En los tres casos el hero y la sección siguiente tienen **el mismo color de fondo** (`bg-fr-grid` solo agrega puntos sobre el papel), así que el margen se lee como un hueco.

Además:
- **`ProductoHero` es solo texto:** usa el 58 % del ancho y la mitad derecha queda vacía.
- **Los 6 planes del certificado** se muestran como 6 tarjetas casi iguales en dos secciones (todas a US$ 20.00, P01). Es repetitivo y no ayuda a comparar.
- **En `/firmas/` la única bolsa** ocupa un tercio de la grilla y deja dos tercios vacíos.
- **En móvil no hay menú:** el header oculta los enlaces (`hidden md:block`) y desde arriba no se puede llegar a las páginas de producto. Pendiente que dejó el spec 005.

**Objetivo medible:** que ninguna página tenga más de ~96 px de espacio vacío entre secciones con el mismo fondo; que los 6 planes se comparen de un vistazo; y que en 375 px se pueda llegar a cualquier página desde el header.

**Fuera de alcance:** cambiar precios, requisitos o textos aprobados (salvo los nuevos de §2); la página de preguntas (007).

## 2. Contenido

Solo datos confirmados o placeholders registrados en `specs/pendientes.md`. **No usar P04** ("qué cuenta como una firma"): no tiene respuesta.

### 2.1 Textos nuevos (borrador para aprobar)

**`/certificado-digital/`**
- Chips bajo el subtítulo del hero, en mono: "2 titulares" · "3 vigencias" · "Desde US$ X" (X sale de la collection).
- Sección de planes: etiqueta "Planes" · `h2` "Elige tu *certificado.*" · intro "Mismo certificado en la nube; cambia el titular y cuánto tiempo dura."
- Encabezados de la matriz: filas "Persona natural" y "Persona jurídica" (con la línea de cada una del spec 005); columnas "1 año", "2 años" y "3 años".
- Bajo cada precio, en pequeño: "US$ Y por año" (calculado: precio ÷ años).
- Bloque "Qué incluye", junto a la matriz o debajo:
  - Certificado digital en la nube, sin instalar nada
  - Acceso con usuario y contraseña
  - Cada firma se confirma con tu PIN y un código por WhatsApp
  - Un asesor te acompaña en la compra

  Todo eso ya está confirmado en `specs/site.md` §1.

**`/firmas/`**
- Chips bajo el subtítulo: "No vencen" · "Desde 10 firmas" · "Desde US$ X" (cantidad y precio salen de la collection).
- Columna derecha de la sección de bolsas, el **medidor de saldo**: título "Tu saldo, *a la vista.*" · texto "Cada vez que firmas se descuenta del saldo de tu bolsa. Lo que no usas no vence."

**Requisitos** (`/certificado-digital/`): sin cambios de texto. Solo cambia el diseño (§3).

**Menú móvil:** botón "Menú" (texto accesible "Abrir menú" / "Cerrar menú").

### 2.2 Lo que se mantiene

Todo lo demás aprobado en el 005:
- Los textos y los datos.
- Las anclas `#persona-natural`, `#persona-juridica` y `#natural-1-ano` … `#juridica-3-anos`.
- La etiqueta "Más elegido" en los planes de 2 años.
- "Pronto habrá bolsas más grandes".
- Las preguntas y el JSON-LD.

## 3. Comportamiento y diseño

### 3.1 Espacios (inicio y productos)

- **Ningún hero suma su padding inferior al superior de la sección siguiente** cuando las dos tienen el mismo fondo. Opciones, en este orden de preferencia:
  1. La primera sección tras el hero no lleva padding superior extra (`pt-0`), o el hero se reduce a `pb-8`/`pb-12`.
  2. La primera sección cambia de fondo (`bg-fr-paper-2` con `border-y`), y así el corte se ve.
- **Meta:** ≤ 96 px de espacio vacío medido entre el último elemento del hero y el primer título de la sección siguiente, en 1440 px y en 375 px.
- **En el inicio** se aplica lo mismo entre `Hero` y `Ventajas`.

### 3.2 Hero de producto con ilustración

`ProductoHero` pasa a dos columnas desde `lg` (texto | ilustración), como el `Hero` del inicio. La ilustración llega por un `slot` o un prop:
- **Certificado: `CredencialDigital.astro`** (nueva, en `src/components/illustrations/`). Dos credenciales apiladas y algo giradas: delante "Persona natural" y detrás "Persona jurídica".
  - Cada una con su avatar (silueta de persona / edificio), líneas de datos, una banda "Vigencia 1–3 años" en mono y el `Sello` ámbar.
  - Animación de entrada en CSS (como `DocumentoFirmado`): la de atrás se desliza, la de adelante llega y el sello cae.
  - Termina en su estado final sin JS y no se anima con "reducir movimiento".
- **Firmas:** `FichasFirmas` en grande, o una versión de hero con más fichas y el contador ×N.
- **Chips** (§2.1) en mono, con borde `fr-line`. Sin color de acción, porque no son botones.
- En móvil la ilustración va debajo del texto, más chica, o se oculta por debajo de 640 px si empuja el contenido. Decidirlo midiendo.

### 3.3 Matriz de planes (`/certificado-digital/`)

Reemplaza las dos secciones `PlanesTitular` por **una sola sección** con una matriz:

```
                 1 año          2 años [Más elegido]   3 años
Persona natural  US$ 20.00      US$ 20.00              US$ 20.00
                 US$ 20 / año   US$ 10 / año           US$ 6.67 / año
                 [Comprar]      [Comprar]              [Comprar]
Persona jurídica …
```

- **Desde 1024 px:** una tarjeta con la grilla (titular a la izquierda, una columna por vigencia). La columna de 2 años va resaltada con fondo `fr-paper` y "Más elegido" arriba.
- **Por debajo de 1024 px:** un bloque por titular, con tres filas compactas (vigencia · precio · por año · botón).
- **Cada celda o fila** conserva su `id` (`natural-2-anos`…) y el atributo `data-destacable`, para que `src/lib/destacar.ts` la siga centrando y resaltando.
- **`#persona-natural` y `#persona-juridica`** siguen existiendo: en la fila, o en el bloque de cada titular en móvil.
- **Semántica:** una `<table>` real con `<caption>`, `<th scope="col">` para las vigencias y `<th scope="row">` para los titulares. En móvil se puede usar otra estructura (como la comparación del inicio), con el contenido equivalente.
- **Botones:** variante `default` (tinta) con texto "Comprar" + `sr-only` con el nombre del plan, como en el 005.
- **"Qué incluye":** lista con checks navy, a la derecha de la matriz en pantallas anchas o debajo.
- **El precio por año** se calcula en la página (`precio / vigenciaAnios`, con `formatPrice`). Nada escrito a mano.

### 3.4 Bolsas (`/firmas/`)

- **Dos columnas desde `md`:** la tarjeta de la bolsa (o las bolsas) a la izquierda y el **medidor de saldo** a la derecha.
  - Si algún día hay 3 o más bolsas, la grilla de tarjetas vuelve a ocupar todo el ancho y el medidor pasa debajo.
- **`MedidorSaldo.astro`** (nueva ilustración):
  - Una barra o anillo de saldo con el número de firmas disponibles (empieza en N, la cantidad de la bolsa) y, al lado, documentos pequeños que se van firmando.
  - Animación con GSAP (`data-anim="saldo"` en `src/lib/ilustraciones.ts`): al entrar en pantalla se firman 3 documentos (`FirmaMini`) y el saldo baja de N a N−3, con el número contando hacia abajo.
  - **El HTML trae el estado final** (N−3 y los 3 documentos firmados).
  - Decorativa (`aria-hidden`); el texto de la columna explica la idea.

### 3.5 Requisitos como checklist ilustrado

- Cada columna (natural / jurídica) lleva un ícono grande arriba: persona / edificio.
- Cada requisito lleva su ícono lineal pequeño (DNI → tarjeta de identidad, RUC → documento, vigencia de poder → documento con sello, correo → sobre, celular → teléfono).
  - Iconos SVG en línea, en navy. El mapeo ícono-requisito va en el YAML (campo nuevo opcional `icono`) o en la página, **no** en el componente.
- Mantener `PENDIENTE: P07` / `P08` en `requisitos.yaml`.

### 3.6 Menú móvil

- Por debajo de `md`, el header muestra junto a "Comprar" un botón "Menú" (ícono de 3 líneas, 48 × 48 px).
- Usar el **atributo `popover`** nativo (`popovertarget`) o `<details>`. **Sin React.**
  - El panel lista los mismos enlaces del header, a pantalla completa o como hoja bajo el header, con fondo `fr-paper` y enlaces de 48 px de alto.
- Accesibilidad: el botón tiene `aria-expanded` o lo resuelve el `popover`; se cierra con Esc y al elegir un enlace; el foco vuelve al botón.
- Con `ClientRouter`, el panel tiene que cerrarse al cambiar de página.

### 3.7 Reglas de siempre

- Constitución §7: sin JS y con "reducir movimiento", todo en estado final.
- Nada animado en el primer pantallazo salvo las ilustraciones de los heros (ya permitido para el `DocumentoFirmado`).
- Reparto del color (spec 002 §2): azul tinta solo en lo que se pulsa; ámbar decorativo.

## 4. SEO

- `/certificado-digital/`: el `h1` no cambia. Los `h2` "Persona natural" y "Persona jurídica" se reemplazan por un `h2` "Elige tu certificado"; los titulares pasan a ser `th` de la tabla (y `h3` en la versión móvil, si se usa otra estructura).
- **JSON-LD sin cambios:** 6 `Product`/`Offer`, `BreadcrumbList` y `FAQPage`.
- Sin cambios de URL, `title` ni `description`.

## 5. Criterios de aceptación

**Espacios**
- [ ] En `/`, `/certificado-digital/` y `/firmas/`, el espacio vacío entre el hero y el primer título de la sección siguiente es ≤ 96 px en 1440 y en 375 px (medido).

**Productos**
- [ ] Los heros de producto tienen ilustración y chips; en 1440 px el contenido del hero ocupa todo el ancho del contenedor.
- [ ] Los 6 planes se ven en una matriz desde 1024 px y en bloques por titular por debajo. Cada uno muestra precio, "por año" calculado, "Incluye IGV" y su botón con el mensaje de WhatsApp de ese plan.
- [ ] Las 8 anclas (`#persona-natural`, `#persona-juridica` y las 6 de planes) siguen funcionando con `destacar.ts`: centran y resaltan.
- [ ] El bloque "Qué incluye" está en la página.
- [ ] `/firmas/` tiene la bolsa y el medidor de saldo lado a lado desde `md`, sin columnas vacías.
- [ ] Los requisitos tienen sus íconos, y `pnpm pendientes` sigue listando P07 y P08.

**Menú móvil**
- [ ] En 375 px se puede abrir el menú, llegar a `/certificado-digital/`, `/firmas/` y `/#como-funciona`, y cerrarlo con Esc; el foco vuelve al botón.
- [ ] Al navegar con el menú abierto, la página nueva carga con el menú cerrado.

**Movimiento y accesibilidad**
- [ ] Sin JS y con "reducir movimiento": ilustraciones en estado final y el medidor en N−3.
- [ ] La tabla de planes tiene `caption` y `th` con `scope`; el lector de pantalla anuncia titular, vigencia y precio de cada celda.
- [ ] Ninguna animación usa `transition-all` sobre elementos que mueve GSAP.

**Calidad**
- [ ] Sin desborde lateral en 375, 768, 1024 y 1280 px en las tres páginas.
- [ ] Lighthouse móvil ≥ 90 en las cuatro categorías en las tres páginas, y LCP ≤ 2.5 s (hoy está justo en 2.5 s: que no empeore; si empeora, quitar `preload` de las fuentes no críticas o mover la ilustración del hero a CSS más simple).
- [ ] `pnpm build` sin errores ni advertencias.

## Para aprobar

1. **La matriz de planes** en lugar de las 6 tarjetas, con "por año" calculado.
2. **Los textos nuevos de §2.1:** chips, "Elige tu certificado", "Qué incluye" y el medidor de saldo.
3. **La ilustración de credenciales** en el hero del certificado y el **medidor de saldo** en firmas.
4. **El menú móvil** con `popover` o `<details>`.

---

## 6. Plan técnico

**Archivos nuevos**
```
src/components/illustrations/CredencialDigital.astro   hero del certificado
src/components/illustrations/MedidorSaldo.astro        saldo de firmas (data-anim="saldo")
src/components/sections/MatrizPlanes.astro             tabla de planes + versión móvil + "Qué incluye"
src/components/layout/MenuMovil.astro                  botón + panel (popover nativo)
```

**Archivos que cambian**
- `src/components/sections/ProductoHero.astro`: dos columnas, `slot` para la ilustración, prop `chips`, menos `pb`.
- `src/components/sections/Hero.astro` (inicio): reducir `pb` o ajustar la sección siguiente.
- `src/components/sections/Bolsas.astro`: layout de dos columnas con slot o prop para el medidor.
- `src/components/sections/Requisitos.astro`: íconos.
- `src/content.config.ts` y `src/content/requisitos.yaml`: si se agrega `icono` a cada requisito (por ejemplo, `items` como lista de `{ texto, icono }`; actualizar el esquema).
- `src/components/layout/Header.astro`: incluir `MenuMovil`.
- `src/lib/ilustraciones.ts`: animación `saldo`.
- `src/pages/certificado-digital.astro`: usar `MatrizPlanes` en lugar de las dos `PlanesTitular` (borrar `PlanesTitular.astro` si queda sin uso).
- `src/pages/firmas.astro` y `src/pages/index.astro`: los nuevos props.

**Reutilizar:** `Sello`, `FirmaMini`, `FichasFirmas`, `Etiqueta`, `SectionHeading`, `buttonVariants`, `formatPrice`, `vigenciaLabel`, `productWhatsappUrl`, `destacar.ts`, `secciones.ts`.

**Reglas y trampas conocidas de este proyecto (leer antes de escribir código)**
- Constitución: `specs/constitution.md`. Identidad y reparto del color: `specs/features/002-identidad-visual/spec.md` §2–3. Tokens `fr-*`; nada de valores literales si hay token.
- **Sin textos fijos en `src/components/sections/`:** llegan por props, desde `src/config/secciones.ts` o desde una collection. Los textos que son parte de un dibujo (rótulos de una ilustración) pueden vivir en la ilustración, como en `DocumentoFirmado.astro`.
- **No usar `transition-all`** en elementos que anima GSAP (`data-reveal`, `data-anim`). Para hovers: `transition-[translate,box-shadow]`.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular y rompe el archivo. Usar `const v = x ?? 0; v / y`. Ojo: el precio por año es una división.
- **`buttonVariants()`** ya pasa por `cn`. No poner radios `rounded-fr-*` en la base de un `cva`.
- **Animaciones GSAP:** el HTML trae el estado FINAL y GSAP anima "desde". Ver el patrón en `src/lib/ilustraciones.ts` (`ANIMACIONES`, `escribir()` para `FirmaMini`, `dibujar()` para trazos). No animar lo que ya está en pantalla al cargar.
- **Placeholders:** solo en datos, con `# PENDIENTE: Pxx`, una marca por línea.
- **Servidor de desarrollo:** Astro 7 permite uno solo por proyecto. Si `pnpm dev` dice que ya hay uno, usarlo (http://localhost:4321) o `pnpm astro dev stop`.
- **Windows + Git Bash:** los heredocs largos fallan a veces. Para archivos, usar la herramienta de escritura de archivos.
- **Verificación visual:** el panel del navegador de la app puede estar oculto y no ejecutar animaciones. Usar Chrome sin interfaz:
  - `puppeteer-core` está en `%LOCALAPPDATA%/npm-cache/_npx/*/node_modules/puppeteer-core` (viene con `npx lighthouse@12`).
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
  - Medir los espacios: distancia entre el `bottom` del último elemento del hero y el `top` del primer `h2`/etiqueta de la sección siguiente.
- **Lighthouse:** `INDEXABLE=true pnpm astro build --outDir dist-lh`, luego `pnpm astro preview --outDir dist-lh --port 4400`, medir con `npx -y lighthouse@12 <url> --form-factor=mobile` y borrar `dist-lh`.
- **Git:** commits **sin** `Co-Authored-By` ni mención de la IA (el autor es el usuario); mensaje `[006] …`; **no hacer push** salvo que el usuario lo pida.

## 7. Tareas

- [ ] T1 Espacios: hero del inicio y `ProductoHero` (medir antes y después).
- [ ] T2 `ProductoHero` en dos columnas + chips + `CredencialDigital` (certificado) + ilustración de firmas.
- [ ] T3 `MatrizPlanes` (tabla + móvil + "Qué incluye"), conectada a `destacar.ts`.
- [ ] T4 `Bolsas` en dos columnas + `MedidorSaldo` + animación `saldo`.
- [ ] T5 Requisitos con íconos.
- [ ] T6 `MenuMovil` en el header.
- [ ] T7 Verificación: criterios de §5 con Chrome sin interfaz (capturas en 375 y 1440 px de las tres páginas, medición de espacios, anclas, menú con teclado) y Lighthouse en las tres páginas. Anotar resultados y decisiones en §8, y dejar el spec en `en-curso` para revisión.

## 8. Notas de implementación

_(vacío)_
