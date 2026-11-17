# [012] Páginas por titular: menos cajas, más gráficos que explican

> Estado: `en-curso` · Creado: 2026-11-17 · Actualizado: 2026-11-17
> Decisiones del usuario (2026-11-17): rediseñar las cinco secciones de las páginas por titular a partir de una maqueta (vigencia, para qué sirve, lo que necesitas, respaldo y antes de comprar). Se aprobaron las cinco y tres textos nuevos (§2.6). Crítica del usuario: el diseño actual es "muy cuadrado y genérico" y le faltan **gráficos que complementen la explicación**. Referencias: la skill **girasol-design**, **solo para la estructura** (encabezados, tarjeta destacada, tarjeta de paso con línea punteada, CTA discreto), y la skill **impeccable**, para el oficio. Los tokens siguen siendo los de "Tinta digital" (spec 002).
> Constitución: v0.4.0 (verificación ligera; sin Lighthouse) · Depende de: 008, 010 y 011
> Lo implementa otra sesión. Este spec trae todo lo necesario.

## 1. Contexto y objetivo

Páginas: `/certificado-digital/persona-natural/` y `/certificado-digital/persona-juridica/` (`src/pages/certificado-digital/[titular].astro`).

Hoy, las cinco secciones entre el hero y las preguntas siguen el mismo molde: título a la izquierda y una rejilla de recuadros iguales a la derecha (o debajo). Ninguna tiene un gráfico propio. Problemas concretos:
- **Vigencia:** una tabla con una sola fila, una celda vacía arriba a la izquierda y dos botones "Comprar" iguales.
- **Para qué sirve:** cuatro recuadros con un check, que no muestran qué obtiene el cliente.
- **Lo que necesitas:** una tarjeta ancha con 3 ítems en lista y mucho blanco.
- **Normativa y acreditación:** dos secciones seguidas que dicen lo mismo, con 5 tarjetas de ícono en recuadro navy. Además, "Antes de comprar" repite el respaldo legal en una tercera tarjeta.
- **Antes de comprar:** números grandes apilados que se leen como un texto largo.

**Objetivo medible:** cada sección tiene **un** gráfico que explica su idea sin leer el texto (duración, cómo se ve la firma, el recorrido hasta el acceso, la trayectoria de la acreditación y el plazo de devolución), y no queda información repetida entre secciones.

**Fuera de alcance:** el hero, las preguntas, el cierre, el inicio, `/certificado-digital/` y `/firmas/`. Los componentes compartidos con esas páginas no cambian (ver §6).

## 2. Contenido

Los textos viven en `src/content/titulares.yaml`, `src/content/requisitos.yaml`, `src/config/secciones.ts` o en la página. **Nada fijo en los componentes** (constitución §4). Donde dice `{titular}`, va "persona natural" o "persona jurídica".

### 2.1 Vigencia (`#planes`)

| Elemento | Texto o dato | Fuente |
|---|---|---|
| Etiqueta, título y acento | "Planes" · "Elige tu" · "vigencia." (sin cambios) | `planesTitular` |
| Intro (nueva) | "El mismo certificado de {titular}. Cambia cuánto tiempo dura y cuánto pagas por año." | `planesTitular` |
| Una tarjeta por vigencia | `h3` "1 año" / "2 años" y, en mono a la derecha, "12 meses" / "24 meses" | collection `productos` (meses = años × 12) |
| Gráfico de duración | Barra de 24 meses con marcas cada mes; se rellena 12 (1 año) o 24 (2 años). Rótulos mono debajo: "Hoy" · "12 meses" · "24 meses" (el rótulo que queda fuera del plan va atenuado) | calculado |
| Chips (solo en 2 años) | "Más elegido" (navy, texto blanco) y "Ahorras 15 %" (calculado con `ahorroDe`, como en el inicio) | `planesTitular.masElegido` + cálculo |
| Precio | "US$ 20.00" / "US$ 34.00" + "+ IGV" | `productos` |
| Línea bajo el precio | 1 año: "US$ 20.00 por año · renuevas al año" · 2 años: "Equivale a **US$ 17.00 por año** · un solo pago" | `planesTitular` (plantillas) + cálculo |
| Botón | "Comprar 1 año" (secundario con borde) · "Comprar 2 años" (principal azul) → WhatsApp del plan, como hoy | `productos` |
| Marca de agua | El número de años ("1" / "2") en grande, navy al 4 %, `aria-hidden` | decorativo |

### 2.2 Para qué sirve (`#para-que-sirve`)

| Elemento | Natural | Jurídica | Fuente |
|---|---|---|---|
| Etiqueta (nueva) | "Para qué sirve" | igual | `titulares.yaml` |
| Título + acento (cambian) | "Tu firma," + "con validez legal." | "La firma de tu empresa," + "con validez legal." | `titulares.yaml` → `paraQueSirve` |
| Texto | Sin cambios (`paraQueSirve.texto`) | Sin cambios | `titulares.yaml` |
| Usos (píldoras con ícono lineal) | Los 4 de hoy | Los 3 de hoy | `paraQueSirve.usos` (se agrega un `icono` por uso, de `src/lib/iconos.ts`) |
| "También es válido para" (nuevo bloque, tras una línea punteada) | Registro de garantías mobiliarias (SIGM) · Declaraciones juradas de Contraloría | **No se muestra** (jurídica no tiene ítems de este tipo) | Salen de la `normativa` actual (ver §2.4) |
| Gráfico: PDF firmado | Documento "Contrato de servicios.pdf", pág. 3 de 3, líneas de texto simuladas y un **panel de firma**: "Firmado digitalmente por" · **Ana Torres Ríos** · "Persona natural · DNI ••••4512 · 17/11/2026 10:24" · "✓ Firma válida · certificado acreditado" | Documento "Acta de directorio.pdf" · **Ana Torres Ríos** · "Representante legal · Empresa Ejemplo S.A.C. · RUC •••••••2512 · 17/11/2026 10:24" · mismo check | `titulares.yaml` → `paraQueSirve.ejemplo` |
| Nota sobre el gráfico | "Quien recibe el PDF ve **quién firmó y cuándo**, y que la firma es válida." (recuadro navy pequeño, montado sobre la esquina inferior derecha del PDF) | igual | `titulares.yaml` |

El nombre, el DNI, el RUC y la empresa del ejemplo son **ficticios** y forman parte del dibujo. Todo el gráfico es `aria-hidden="true"`. La nota también se dice en texto real para lectores de pantalla (`sr-only`), junto al texto de la sección.

### 2.3 Lo que necesitas (`#requisitos`)

| Elemento | Texto o dato | Fuente |
|---|---|---|
| Etiqueta (nueva), título y acento | "Requisitos" · "Lo que" · "necesitas." | página |
| Intro | `intro` de la collection (sin cambios) | `requisitos.yaml` |
| Pasos | Un paso por requisito, **todos los del titular y en su orden** (natural: 3; jurídica: 6). Cada paso: número "01", "02"…, ícono del ítem en un recuadro, título y detalle. "Lista de suscriptores" lleva su chip "Solo si es vinculado a empresa" | `requisitos.yaml` |
| Detalle nuevo | "Validación de identidad" agrega `detalle: En línea, desde tu celular.` (en los dos titulares). Esto también aparece en las fichas de `/certificado-digital/` (spec 011), que leen el mismo dato | `requisitos.yaml` |
| Paso final | Recuadro navy con ícono de reloj; título "**≈ 1 hora** y listo" ("≈ 1 hora" en Instrument Serif itálica) y texto "Recibes tu usuario y contraseña para firmar." | `entrega.destacado` de `titulares.yaml` + página |
| Nota | "Un asesor te confirma los requisitos antes de la compra." como CTA discreto: recuadro pequeño (patrón "CTA en línea" de girasol-design) | página |

El ícono de reloj no existe en `src/lib/iconos.ts`: agregar `reloj` (círculo + manecillas, mismo trazo que los demás).

### 2.4 Respaldo (`#respaldo`): une "Normativa" y "Acreditación"

| Elemento | Texto o dato | Fuente |
|---|---|---|
| Sello | El sello circular "ACREDITADA ANTE INDECOPI" que ya dibuja `Acreditacion.astro` (reutilizar su SVG o extraerlo a un componente), unos 150 px, encima del título | `acreditacion.sello` |
| Etiqueta, título y acento | "Respaldo" · "Cumplimos con las" · "normativas peruanas." | `normativa` (secciones.ts) |
| Intro | La de `acreditacion.intro` (razón social, Ley N.° 27269 y su Reglamento) | `secciones.ts` |
| Enlace | "Verifica nuestra acreditación en INDECOPI ↗" → `site.rops` | `normativa.enlaceLabel` |
| Línea de tiempo vertical (a la derecha) | 2020 · **Entidad de Registro** · "Validamos tu identidad de forma directa y confidencial, sin intermediarios." / 2023 · **Software de firma Firmeasy** · "Incluye software acreditado para firmar tus documentos con validez legal." / 2024 · **Entidad de Certificación** · "Emitimos tu certificado con los más altos estándares de seguridad para garantizar su valor legal." El año más reciente va en píldora navy; los otros, en píldora blanca. Línea punteada vertical que los une | `acreditacion.hitos` + `detalle` nuevo por hito (los textos de la `normativa` actual) |

**Cambio de datos:** la `normativa` de `titulares.yaml` mezcla acreditaciones (EC, ER, software) con usos (SIGM, Contraloría). Se separa:
- Los tres textos de acreditación pasan a `acreditacion.hitos[].detalle` y a `acreditacion.hitos[].titulo` (título corto) en `secciones.ts`. El inicio sigue usando `anio` y `texto`, así que no cambia.
- SIGM y Contraloría pasan a `paraQueSirve.validoPara` (natural). Jurídica no tiene ninguno.
- `normativa` se borra de `titulares.yaml` y del esquema en `content.config.ts`.

### 2.5 Antes de comprar (`#antes-de-comprar`)

| Elemento | Texto o dato | Fuente |
|---|---|---|
| Etiqueta, título y acento | Sin cambios | `antesDeComprar` |
| Intro (cambia) | "Cómo pagas y qué pasa si cambias de opinión." (la entrega pasó a §2.3) | `antesDeComprar.intro` |
| Tarjeta "Garantía de devolución" (ancha, ~1.5fr) | Subtítulo: el `plazo` actual. **Gráfico:** 5 casillas navy "Día 1" … "Día 5" y una sexta casilla rayada "Ya no procede". Debajo, 3 casos en mini tarjetas: **100 %** "si aún no validaste tu identidad." · **80 %** "si ya la validaste; el 20 % cubre gastos administrativos." · **≤ 15 días** "hábiles para recibir tu dinero, desde que aprobamos la solicitud." Pie: "Pídela a" + correos + "Ver política completa" | `titulares.yaml` → `devolucion`: se reemplazan `puntos` por `dias: 5`, `diaLabel: Día`, `fueraDePlazo: Ya no procede` y `casos: [{ destacado, texto }]` (textos de esta tabla) |
| Tarjeta "Pagas como prefieras" (~1fr) | Subtítulo: "Tu asesor te indica los datos al confirmar la compra." Los 6 medios de hoy (BCP, Tarjeta de crédito, Tarjeta de débito, Izipay, Culqi, Yape), en una rejilla de 2 columnas. Cada uno lleva un recuadro de 30 px con monograma (por ejemplo "BCP", "TC", "TD", "IZ", "CQ", "YP") en navy sobre `fr-tinta-soft` | `mediosPago.medios` + monogramas por props |
| Se quitan | La tarjeta "Entrega" (pasó al paso final de §2.3) y la tarjeta "Respaldo legal" (duplica §2.4). También el esquema `entrega.titulo` y `entrega.texto` si quedan sin uso (se conserva `entrega.destacado`) | — |

**Monogramas, no logos:** no se usan logotipos de BCP, Izipay, Culqi ni Yape (no tenemos los archivos ni el permiso). Los monogramas son tipográficos y genéricos.

### 2.6 Textos nuevos aprobados por el usuario (2026-11-17)

- "En línea, desde tu celular." (detalle de la validación de identidad).
- "renuevas al año" / "un solo pago" (bajo los precios).
- El ejemplo ficticio del PDF (Ana Torres Ríos, DNI ••••4512; Empresa Ejemplo S.A.C., RUC •••••••2512).

## 3. Comportamiento

**Reglas de estructura** (girasol-design como referencia, con tokens de "Tinta digital"):
- **Fondos alternos** para separar secciones: vigencia, requisitos y antes de comprar en `fr-paper-2` con bordes `fr-line` arriba y abajo; para qué sirve y respaldo, en `fr-paper`.
- **Una acción principal por bloque:** en vigencia, solo "Comprar 2 años" es azul relleno. Es la tarjeta destacada: borde de 2 px tinta al 55 % y sombra teñida de tinta.
- **Líneas punteadas** como conector (requisitos y respaldo) y como separador (vigencia y para qué sirve).
- **Sin manchas difuminadas nuevas.**

**Por sección:**
- **Vigencia:** dos tarjetas lado a lado desde `md` y una debajo de otra en móvil. Barra de 14 px de alto con las marcas de mes como degradado repetido, `aria-hidden`; la duración ya la dicen el `h3` y el rótulo mono.
- **Para qué sirve:** dos columnas desde `lg` (texto `~1fr` y gráfico `~1.05fr`, centradas en vertical). En móvil, el gráfico va debajo del texto, **sin rotación** y con la nota debajo del PDF (no montada). Desde `lg`, el PDF va girado −1.5° y se endereza al pasar el cursor. Con `prefers-reduced-motion`, sin giro.
- **Lo que necesitas:** `<ol>` de pasos.
  - Desde `lg`: rejilla de 4 columnas con una línea punteada horizontal (`border-t-2 border-dashed`, tinta al 30 %) detrás de los recuadros de ícono, una por fila. La línea va **fuera** de la `<ol>` o como pseudo-elemento, para que el lector de pantalla no la cuente.
  - Natural: 3 pasos + el final en una fila. Jurídica: 6 + el final, en dos filas de 4 y 3.
  - Móvil: lista vertical con la línea punteada vertical a la izquierda.
  - El paso final no lleva número.
- **Respaldo:** dos columnas desde `lg` (sello, texto y enlace a la izquierda; línea de tiempo a la derecha). En móvil, la línea de tiempo va debajo.
- **Antes de comprar:** dos tarjetas desde `lg` (`1.5fr` / `1fr`); en móvil, una debajo de otra. Las casillas de días ocupan todo el ancho de la tarjeta; en móvil pueden bajar a 36 px de alto, con el rótulo "D1"… si "Día 1" no cabe (el texto completo queda en `aria-label` de la lista).
- **Animación:** entrada al hacer scroll con el patrón existente (`data-reveal`). Opcional: la barra de duración se rellena de 0 a su valor al entrar en pantalla (CSS o GSAP), con el estado final en el HTML y sin animación con `prefers-reduced-motion`.
- **Sin JS:** todo se ve completo (no hay interacción nueva).

## 4. SEO

- `h2` de cada sección como en §2; `h3` en las tarjetas de vigencia, los pasos y los hitos.
- Anclas que se mantienen: `#planes`, `#para-que-sirve`, `#requisitos`, `#antes-de-comprar`. Nueva: `#respaldo` (antes `#normativa` y `#respaldo`); revisar con `grep` los enlaces a `#normativa` y redirigirlos.
- Schema sin cambios: las ofertas siguen visibles en la sección de vigencia.

## 5. Criterios de aceptación

**Verificación ligera** (constitución §11.1): sin Lighthouse.

- [ ] En las dos páginas por titular, cada una de las cinco secciones tiene su gráfico: barra de duración, PDF firmado, recorrido de pasos, sello con línea de tiempo y casillas de días.
- [ ] Ya no existen por separado "Cumplimos con las normativas" y "Firma con validez legal": hay una sola sección `#respaldo`. "Antes de comprar" ya no tiene las tarjetas "Entrega" ni "Respaldo legal".
- [ ] Vigencia: "Ahorras 15 %" y "US$ 17.00 por año" calculados; solo "Comprar 2 años" en azul relleno; los dos botones abren el WhatsApp correcto.
- [ ] Natural muestra "También es válido para" con SIGM y Contraloría; jurídica no muestra ese bloque.
- [ ] Natural: 3 pasos + final; jurídica: 6 pasos + final, en el orden de `requisitos.yaml`, con el chip de "Lista de suscriptores".
- [ ] El inicio sigue mostrando la acreditación igual que antes (usa `anio` y `texto`).
- [ ] `/certificado-digital/` muestra "En línea, desde tu celular." bajo "Validación de identidad" en las dos fichas.
- [ ] `/firmas/` sigue igual (su `MediosPago` no cambia).
- [ ] Los gráficos son `aria-hidden` y la información que dan también está en texto real.
- [ ] Sin desborde lateral a 375, 768, 1024 y 1280 px; capturas de las cinco secciones en 375 y 1280 px de **las dos** páginas.
- [ ] Con `prefers-reduced-motion`: sin giro del PDF y sin relleno animado.
- [ ] `pnpm build` sin errores ni advertencias (incluye `astro check` con el esquema nuevo).

---

## 6. Plan técnico

**Componentes (`src/components/sections/`):**

| Componente | Lo usan hoy | Qué se hace |
|---|---|---|
| `MatrizPlanes.astro` | Solo `[titular].astro` | Reemplazar por `PlanesVigencia.astro` (nuevo) y borrar `MatrizPlanes` si queda sin uso |
| `ParaQueSirve.astro` | Solo `[titular].astro` | Rehacer en el lugar; el gráfico va en `src/components/illustrations/PdfFirmado.astro` |
| `Requisitos.astro` | Solo `[titular].astro` | Rehacer en el lugar como recorrido de pasos |
| `Normativa.astro` | Solo `[titular].astro` | Reemplazar por `Respaldo.astro` (nuevo) y borrar `Normativa` |
| `Acreditacion.astro` | `[titular].astro` **e inicio** | **No se modifica.** Se quita solo de `[titular].astro`. Si `Respaldo` reutiliza el sello, extraerlo a `src/components/illustrations/SelloIndecopi.astro` y que `Acreditacion` lo use sin cambiar su aspecto |
| `AntesDeComprar.astro` | Solo `[titular].astro` | Rehacer en el lugar; deja de usar `MediosPago` dentro |
| `MediosPago.astro` | `/firmas/` (y hoy `AntesDeComprar`) | **No se modifica** |

**Datos:**
- `src/content.config.ts`: esquema de `titulares`. Se agregan `paraQueSirve.etiqueta`, `paraQueSirve.usos[]` como `{ texto, icono }`, `paraQueSirve.validoPara?: { texto, icono }[]`, `paraQueSirve.ejemplo` (documento, nombre, línea de datos, fecha), `devolucion.dias`, `devolucion.diaLabel`, `devolucion.fueraDePlazo` y `devolucion.casos`. Se quitan `normativa`, `devolucion.puntos` y, si quedan sin uso, `entrega.titulo` y `entrega.texto`.
- `src/content/titulares.yaml`, `src/content/requisitos.yaml` (detalle de la validación).
- `src/config/secciones.ts`: `planesTitular` (intro y plantillas por año), `acreditacion.hitos[].titulo` y `detalle`, `antesDeComprar.intro`, monogramas de pago.
- `src/lib/iconos.ts`: ícono `reloj`.
- `src/pages/certificado-digital/[titular].astro`: nuevo orden: hero → vigencia → para qué sirve → requisitos → respaldo → antes de comprar → preguntas → cierre.

**Dependencias nuevas:** ninguna.

**Reglas y trampas conocidas:**
- Constitución v0.4.0. Reparto del color del spec 002: azul tinta solo en lo que se pulsa; ámbar solo como acento decorativo, nunca como texto sobre papel; navy como fondo permitido.
- **Sin textos fijos en `src/components/`** (constitución §4). Los rótulos del dibujo del PDF también llegan por props.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular.
- El sitio usa **ClientRouter**: si algún gráfico necesita JS (relleno de la barra), inicializar en `astro:page-load` y evitar la doble inicialización (lección del spec 011).
- **Antes de empezar, revisar `git status`:** si hay cambios sin commit de otros specs, **preguntar al usuario**.
- **Servidor de desarrollo:** uno solo por proyecto; si hay que reiniciarlo, avisar al usuario.
- **Git:** commit **sin** `Co-Authored-By` ni mención de la IA; mensaje `[012] …`; **no hacer push**.

## 7. Tareas

- [x] T1 Datos: esquema, `titulares.yaml`, `requisitos.yaml`, `secciones.ts`, ícono `reloj`.
- [x] T2 `PlanesVigencia.astro` (tarjetas con barra de duración).
- [x] T3 `ParaQueSirve.astro` + `PdfFirmado.astro`.
- [x] T4 `Requisitos.astro` como recorrido de pasos.
- [x] T5 `Respaldo.astro` (+ `SelloIndecopi.astro` si se extrae) y retiro de `Normativa` y `Acreditacion` de la página.
- [x] T6 `AntesDeComprar.astro` (casillas de días, casos y medios de pago).
- [x] T7 Página `[titular].astro` (orden y props) y borrado de componentes sin uso.
- [x] T8 Pasada de impeccable (`polish`) y verificación ligera de §5. Anotar en §8 lo verificado y qué aportó impeccable; dejar el spec en `en-curso`.

## 8. Notas de implementación

**Implementación (2026-11-17):**
- Datos: `titulares.yaml` y su esquema en `content.config.ts` (usos con ícono, `validoPara` solo en natural, `ejemplo` ficticio del PDF, devolución con `dias`/`diaLabel`/`fueraDePlazo`/`casos`, `entrega` solo con `destacado`; se quitó `normativa`); `requisitos.yaml` (detalle "En línea, desde tu celular."); `secciones.ts` (`acreditacion.hitos[].titulo` y `detalle`, `planesTitular` con intro y plantillas, `respaldoTitular`, `antesDeComprar.pagos` con monogramas, `recorridoRequisitos`); ícono `reloj` en `iconos.ts`.
- Componentes nuevos: `PlanesVigencia.astro` (barra de 24 meses con marcas cada mes en un degradado, rótulos Hoy · 12 · 24 meses, marca de agua con los años), `PdfFirmado.astro` (en `illustrations/`), `Respaldo.astro` (sello `brand/Sello.astro` + línea de tiempo). Rehechos en el lugar: `ParaQueSirve.astro`, `Requisitos.astro` (recorrido de pasos con paso final navy), `AntesDeComprar.astro` (casillas de días, tres casos, medios de pago con monograma). Borrados: `MatrizPlanes.astro` y `Normativa.astro` (sin otros usos); `celdasDe` salió de `lib/planes.ts`. `Acreditacion.astro` y `MediosPago.astro` no se modificaron (el inicio y `/firmas/` los siguen usando). El sello ya existía como `Sello.astro`, así que no hizo falta extraer `SelloIndecopi.astro`.
- Textos con plantillas en `secciones.ts` (`{precio}`, `{n}`, `{vigencia}`, `{titular}`); la negrita de la línea bajo el precio va entre `**`.

**Verificado (verificación ligera, sin Lighthouse):**
- `pnpm build` sin errores ni advertencias (incluye `astro check` con el esquema nuevo).
- Las dos páginas por titular tienen, en este orden, `#planes`, `#para-que-sirve`, `#requisitos`, `#respaldo` y `#antes-de-comprar`, cada una con su gráfico (barra de duración, PDF firmado, recorrido de pasos, sello con línea de tiempo y casillas de días). No existen `Normativa` ni la sección "Firma con validez legal" por separado, ni las tarjetas "Entrega" y "Respaldo legal"; no hay enlaces a `#normativa`.
- Vigencia: "Ahorras 15 %" y "Equivale a US$ 17.00 por año" calculados; solo "Comprar 2 años" es azul relleno (la tarjeta destacada lleva borde de 2 px tinta al 55 % y sombra teñida); los dos botones abren el WhatsApp correcto (decodificado: natural y jurídica, 1 y 2 años). Las ofertas del JSON-LD siguen.
- Natural muestra "También es válido para" con SIGM y Contraloría; jurídica no. Natural: 3 pasos + final; jurídica: 6 + final en dos filas (4 y 3), en el orden de `requisitos.yaml`, con el chip de "Lista de suscriptores".
- El inicio sigue mostrando la acreditación (`Acreditacion.astro` intacto); `/certificado-digital/` muestra "En línea, desde tu celular." en las fichas; `/firmas/` conserva su `MediosPago` y sus ofertas.
- 1280 y 375 px, capturas de las cinco secciones de natural y jurídica en el navegador: sin desborde horizontal en ningún caso; en 375 px el PDF no gira y su nota va debajo, el recorrido pasa a lista vertical con línea punteada, y las casillas de días usan "D1…D5". No medí 768 ni 1024 px.
- Sin JS: no hay interacción nueva, todo está en el HTML generado. `prefers-reduced-motion`: el giro del PDF solo existe con `motion-safe:` (comprobado en el código, no emulando la preferencia); no se implementó el relleno animado de la barra (era opcional).

**Qué aportó impeccable:** el detector no marcó nada en lo nuevo (solo el hallazgo previo de `global.css:249`, ajeno a este spec). El craft-floor y las mediciones llevaron a: (1) reservar la fila de chips en las dos tarjetas de vigencia desde `md` para que los precios queden a la misma altura; (2) el título del paso final navy salía navy sobre navy ("y listo" invisible): se fijó `text-white`; (3) detectar que el detalle "En línea, desde tu celular." se cortaba en la coma dentro del YAML de una sola línea y citarlo; (4) el PDF y los recuadros usan íconos y monogramas en vez de logotipos.

**Observaciones:** (a) el servidor de desarrollo de otra sesión (puerto 4321) quedó devolviendo 404 en las páginas por titular tras el cambio de esquema (su almacén de contenido quedó con el esquema anterior); no lo reinicié. La verificación visual se hizo con `pnpm preview` en el puerto 4322 (ya detenido). (b) En natural la tarjeta "Pagas como prefieras" queda más corta que la de devolución y deja unos 100 px de aire abajo (las tarjetas se estiran en la misma fila).

**Pendiente:** commit [012] sin hacer; el 010 y el 011 siguen sin commit (el usuario decidió no commitearlos antes).
