# [008] Páginas por titular, "antes de comprar" y footer con menos tipografías

> Estado: `aprobado` · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Aprobado por el usuario el 2026-11-16 con estas decisiones:
> - Contenido (textos) de las páginas de producto de girasol.pe, **sin** sus promociones, precios en soles ni plan de 3 años. Diseño y estructura son de firmaremota.
> - Precios: 1 año US$ 20.00 y 2 años US$ 34.00, iguales para natural y jurídica.
> - Entrega: aproximadamente 1 hora (P09 corregido).
> - Se muestra la política de devolución (P23).
> - Se mencionan SIGM y Contraloría (P24) y se enlaza el registro ROPS de INDECOPI (P25).
> - **No** se incluyen el sello de tiempo ni los logos de clientes.
>
> Se ejecuta en la PC de casa.
> Constitución: **v0.4.0** (§11: verificación ligera en cada spec; Lighthouse y barridos completos solo antes de un push) · Depende de: 007 (implementado)
> Lo implementa otra sesión. Este spec trae todo lo necesario: no hace falta el historial de la conversación.

## 1. Contexto y objetivo

`/certificado-digital/` presenta los dos certificados juntos, lo que sirve para vender. Pero un cliente que solo quiere informarse de **uno** (por ejemplo, el de su empresa) necesita una página propia con todo lo de ese certificado: para qué sirve, requisitos, respaldo, condiciones y preguntas. También sirve para SEO: "certificado digital persona natural" y "certificado digital persona jurídica" son búsquedas distintas (`specs/site.md` §3 ya preveía separarlas).

Además:
- **Footer:** mezcla demasiadas tipografías (Outfit, JetBrains Mono para etiquetas, teléfono, correo, RUC y copyright). El usuario pide menos variación.
- **P09 corregido:** la entrega es **aproximadamente 1 hora** después de completar la solicitud y la validación de identidad, no "inmediata".

**Objetivo medible:** dos páginas nuevas, `/certificado-digital/persona-natural/` y `/certificado-digital/persona-juridica/`, enlazadas desde `/certificado-digital/`, el inicio y el footer. En ellas se puede comprar cada plan por WhatsApp, sin formularios.

**Fuera de alcance:** formularios de cotización (en firmaremota la compra es **solo por WhatsApp**); promociones; logos de clientes; sello de tiempo; Lighthouse (se hace antes del push, constitución §11.2).

## 2. Contenido

### 2.1 Fuente de los textos

- **Persona natural:** https://girasol.pe/producto/certificado-digital-para-persona-natural/
- **Persona jurídica:** https://girasol.pe/producto/certificado-digital-para-contratos-pj/

**Se toman los textos** de esas páginas: para qué sirve, descripciones, requisitos, normativa, "antes de comprar" y preguntas frecuentes. Se adaptan **solo** en lo siguiente:

| En girasol.pe | En firmaremota |
|---|---|
| Precios en soles, 3 planes, "3 años al precio de 2", 25 % de descuento, descuento de partners | Precios de la collection `productos` (US$ 20.00 / US$ 34.00), **solo 1 y 2 años**, **sin promociones** |
| "Solicita tu cotización", formulario, "Cotizar", "Comprar" (compra directa) | Botones de **WhatsApp** con el mensaje del plan ("Comprar"), y "Escríbenos por WhatsApp" para dudas |
| "Emisión en aprox. 1 hora" | Igual: **aprox. 1 hora** tras la solicitud y la validación (P09) |
| Pregunta "¿Tienen promociones o descuentos?" | **No se incluye** |
| Sello de tiempo, logos de clientes, banner de partners | **No se incluyen** |
| Enlace a un PDF de requisitos | No se incluye (los requisitos ya están completos en la página) |

**No inventar.** Si algo de girasol.pe no se lee bien o contradice `specs/pendientes.md`, gana `pendientes.md`. Avisar al usuario de la contradicción.

### 2.2 Contenido de cada página (orden y diseño de firmaremota)

| # | Sección | Contenido |
|---|---|---|
| — | Migas | Inicio › Certificado digital › Persona natural (o Persona jurídica) |
| 1 | **Hero** (`ProductoHero` + `CredencialDigital` con ese titular adelante) | `h1` = nombre del producto ("Certificado digital para persona natural" / "Certificado digital para persona jurídica y vinculado a empresa"); descripción de girasol.pe; chips "1 o 2 años" · "Desde US$ 20.00" · "Entrega aprox. 1 hora"; botones "Ver planes" (ancla) y "Escríbenos por WhatsApp" |
| 2 | **Planes** (`#planes`) | 2 tarjetas o una fila de la matriz de `/certificado-digital/` solo con ese titular: 1 año y 2 años, precio, "por año", "Incluye IGV", "Más elegido" en 2 años y "Comprar" (WhatsApp con el mensaje del plan). Anclas `#natural-1-ano` / `#natural-2-anos` (o `juridica-…`), con `data-destacable` |
| 3 | **Para qué sirve** | Texto y usos de girasol.pe (natural: contratos, acuerdos, trámites notariales, PDF a tu nombre; jurídica: firmar a nombre de la empresa como representante legal, gerente u otro cargo con poderes, o persona autorizada). Con el texto P05 de `pendientes.md` como base |
| 4 | **Requisitos** | Solo los de ese titular (collection `requisitos`), con el componente `Requisitos` en **una columna** |
| 5 | **Respaldo y normativa** | `Acreditacion` (spec 007) + tarjetas de normativa de girasol.pe: Entidad de Certificación, Entidad de Registro y software de firma (incluido). **Natural:** + "Registro de garantías mobiliarias (SIGM)" y "Declaraciones juradas de Contraloría" (P24). **Jurídica:** las que tenga su página en girasol.pe, **sin** sello de tiempo. Enlace "Verifica nuestra acreditación en INDECOPI" al registro **ROPS**: usar la misma URL que enlaza girasol.pe (P25) |
| 6 | **Antes de comprar** (nueva, `AntesDeComprar.astro`) | 4 bloques: **Devolución** (P23, texto de girasol.pe), **Entrega** (aprox. 1 hora tras la solicitud y la validación de identidad), **Pagos** (P06; reutilizar `MediosPago`), **Respaldo legal** (acreditación + Ley 27269) |
| 7 | **Preguntas** | Las de girasol.pe para ese certificado, **sin** la de promociones: para qué sirve, qué requisitos necesito, dónde pagar, cómo hago la validación de identidad (dos opciones: en línea por QR o enlace, o asistida por videollamada agendada), cuánto demora la emisión. Más las de firmaremota que apliquen (`que-necesito-para-firmar`, `validez-legal`) |
| 8 | **Cierre** | `CtaCierre` |

**Textos propios de firmaremota** (los de girasol.pe se copian):
- Planes: etiqueta "Planes" · `h2` "Elige tu *vigencia.*"
- Antes de comprar: etiqueta "Antes de comprar" · `h2` "Compra con *tranquilidad.*"
- Respaldo: reutilizar los de `Acreditacion` (`src/config/secciones.ts`).

### 2.3 Cambios en otras páginas

- **`/certificado-digital/`** (se mantiene como página de comparación):
  - En la matriz, cada titular enlaza a su página ("Ver detalles de persona natural →").
  - Nuevo bloque "¿Cuál necesitas?", antes de la matriz o justo después del hero: dos tarjetas (natural / jurídica) con una línea de P05 y el enlace a su página.
  - Se mantienen las anclas actuales (`#natural-1-ano`…) en esta página.
- **Inicio:** en la tarjeta del certificado, debajo de "Ver los 4 planes", dos enlaces pequeños: "Persona natural" · "Persona jurídica".
- **Footer, columna "Productos":** Certificado digital · Persona natural · Persona jurídica · Firmas.
- **Preguntas `cuanto-tarda`** (inicio y certificado): pasa a "Aproximadamente 1 hora después de completar tu solicitud y la validación de identidad recibes tu usuario y contraseña." Buscar en `src/` cualquier otro "inmediat" referido a la entrega y corregirlo.

### 2.4 Footer: menos tipografías

- **Todo el footer en Outfit** (la fuente de texto del sitio). **Sin JetBrains Mono** en ningún elemento del footer: etiquetas de columna, teléfono, correo, RUC y línea final.
- Etiquetas de columna: Outfit, semibold, `text-xs`, mayúsculas con poco espaciado, `text-white/60`.
- Teléfono, correo y RUC: Outfit normal, con `tabular-nums` en los números.
- El logotipo se mantiene (su serif es parte de la marca).
- Revisar que no haya más de **dos pesos** de Outfit en el footer (normal y semibold).

## 3. Comportamiento

- **Ruta dinámica:** `src/pages/certificado-digital/[titular].astro`, con `getStaticPaths` que genera `persona-natural` y `persona-juridica` desde los datos.
  - Mover `src/pages/certificado-digital.astro` a `src/pages/certificado-digital/index.astro` para que convivan sin conflicto. La URL `/certificado-digital/` no cambia.
- **Datos de cada página** en una collection nueva `titulares` (`src/content/titulares.yaml`), una entrada por titular. Campos:
  - `slug`, `titular`, `nombre`, `h1`, `descripcion` (hero) y `seo` (`title`, `description`).
  - `usos[]` (lista de "para qué sirve") y `normativa[]` (tarjetas: título, texto, ícono).
  - `antesDeComprar` (textos de devolución y entrega).
  - Las preguntas viven en `faqs.yaml`, con valores nuevos en `paginas`: `persona-natural` y `persona-juridica` (actualizar el `enum` de `content.config.ts`).
- **Los componentes no llevan textos fijos:** reciben todo por props (constitución §4).
- **"Ver planes"** baja a `#planes` con el scroll suave existente (sin scroll suave si se pide "reducir movimiento").
- Reglas de siempre: constitución §7 (sin JS y con "reducir movimiento", todo en su estado final) y el reparto de color del spec 002 (azul tinta solo en lo que se pulsa; ámbar decorativo).

## 4. SEO

| Página | `title` | `description` | Schema |
|---|---|---|---|
| `/certificado-digital/persona-natural/` | Certificado digital para persona natural | De girasol.pe adaptada, con el precio "desde" calculado (~155 caracteres) | 2 `Product`/`Offer` (1 y 2 años) + `BreadcrumbList` (3 niveles) + `FAQPage` |
| `/certificado-digital/persona-juridica/` | Certificado digital para persona jurídica | Ídem | Ídem |

- Canonical con `/` final. Con `INDEXABLE=true` el sitemap incluye las dos páginas.
- **Contenido duplicado:** como los textos vienen de girasol.pe, son similares pero no idénticos (precios, CTA y estructura distintos). No se agrega `rel=canonical` hacia girasol.pe: cada sitio vende su producto. Lo anoto para que el usuario lo sepa.

## 5. Criterios de aceptación

**Verificación ligera** (constitución §11.1). **No** correr Lighthouse ni barridos de todas las páginas: eso se hace antes del push.

- [ ] Las dos páginas existen y muestran las 8 secciones de §2.2 con los textos de girasol.pe adaptados según §2.1.
- [ ] No aparecen soles, "3 años", promociones, formularios, sello de tiempo ni logos de clientes (comprobar con `grep` sobre `dist/`).
- [ ] Cada página muestra solo sus 2 planes con precio desde la collection y su botón de WhatsApp con el mensaje del plan; las anclas resaltan la tarjeta.
- [ ] "Antes de comprar" muestra devolución (P23), entrega aprox. 1 hora (P09), pagos (P06) y respaldo legal; el enlace ROPS (P25) funciona.
- [ ] `/certificado-digital/`, el inicio y el footer enlazan a las dos páginas.
- [ ] La pregunta `cuanto-tarda` dice aprox. 1 hora, y no queda "inmediato" referido a la entrega.
- [ ] El footer no usa JetBrains Mono (comprobar en el HTML: ninguna clase `font-fr-mono` ni `fr-eyebrow` dentro de `<footer>`).
- [ ] El `FAQPage` de cada página coincide con sus preguntas visibles.
- [ ] Capturas en 375 y 1440 px de las **dos páginas nuevas** y del **footer**, sin desborde lateral.
- [ ] `pnpm build` sin errores ni advertencias.

---

## 6. Plan técnico

**Archivos nuevos**
```
src/pages/certificado-digital/[titular].astro
src/pages/certificado-digital/index.astro          (movido desde src/pages/certificado-digital.astro)
src/content/titulares.yaml
src/components/sections/AntesDeComprar.astro
src/components/sections/ParaQueSirve.astro
src/components/sections/Normativa.astro            (tarjetas + enlace ROPS)
src/components/sections/CualNecesitas.astro        (2 tarjetas en /certificado-digital/)
```

**Archivos que cambian:** `src/content.config.ts` (`titulares` y el enum de `faqs.paginas`), `src/content/faqs.yaml`, `src/components/sections/Requisitos.astro` (si hace falta para una sola columna), `src/components/illustrations/CredencialDigital.astro` (prop para el titular de adelante), `src/components/sections/MatrizPlanes.astro` (enlace por titular), `src/components/layout/Footer.astro`, `src/pages/index.astro`, `specs/pendientes.md` (marcar P09, P23, P24 y P25 como "Aplicado en el código (spec 008)").

**Reglas y trampas conocidas de este proyecto (leer antes de escribir código)**
- Constitución: `specs/constitution.md` (**v0.4.0**). Identidad y reparto del color: `specs/features/002-identidad-visual/spec.md` §2–3. Tokens `fr-*`; nada de valores literales si hay token.
- **Sin textos fijos en `src/components/sections/`:** llegan por props, desde `src/config/secciones.ts` o desde una collection.
- **No usar `transition-all`** en elementos que anima GSAP (`data-reveal`, `data-anim`). Para hovers: `transition-[translate,box-shadow]`.
- **En el frontmatter de `.astro`, no escribir `x! / y`:** el compilador de Astro lo confunde con una expresión regular. Usar `const v = x ?? 0; v / y` (el precio por año es una división).
- **`buttonVariants()`** ya pasa por `cn`. No poner radios `rounded-fr-*` en la base de un `cva`.
- **Placeholders:** solo en datos, con `# PENDIENTE: Pxx`, una marca por línea. Al terminar, `pnpm pendientes` debe seguir listando solo P19.
- **Contenido externo:** leer las dos páginas de girasol.pe completas, pueden requerir varias lecturas. Copiar los textos sin "mejorarlos", salvo las adaptaciones de §2.1.
- **Servidor de desarrollo:** Astro 7 permite uno solo por proyecto. **Al agregar archivos de contenido (collections nuevas o `.md`/`.yaml` nuevos), el servidor que ya está corriendo puede no cargarlos** y dar 404, como pasó con la política de privacidad. Si una página nueva da 404 en `pnpm dev` pero existe en `pnpm build`, reiniciar el servidor (`pnpm astro dev stop` y `pnpm dev`) **avisando al usuario**, que puede tenerlo abierto en su terminal.
- **Windows + Git Bash:** los heredocs largos fallan a veces. Para archivos, usar la herramienta de escritura de archivos.
- **Verificación visual:** usar Chrome sin interfaz.
  - `puppeteer-core` está en `%LOCALAPPDATA%/npm-cache/_npx/*/node_modules/puppeteer-core`.
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
  - Solo lo de §5: las dos páginas nuevas y el footer, en 375 y 1440 px.
- **Sin Lighthouse en este spec** (constitución §11.1).
- **Git:** commits **sin** `Co-Authored-By` ni mención de la IA (el autor es el usuario); mensaje `[008] …`; **no hacer push**.

## 7. Tareas

- [ ] T1 Leer las dos páginas de girasol.pe y armar `titulares.yaml` y las preguntas en `faqs.yaml` con las adaptaciones de §2.1.
- [ ] T2 Mover `certificado-digital.astro` a `certificado-digital/index.astro` y crear `[titular].astro`.
- [ ] T3 Componentes `ParaQueSirve`, `Normativa`, `AntesDeComprar` y `CualNecesitas`; `Requisitos` en una columna; `CredencialDigital` con prop de titular.
- [ ] T4 Enlaces desde `/certificado-digital/`, el inicio y el footer; corregir P09 (aprox. 1 hora).
- [ ] T5 Footer en una sola familia tipográfica (§2.4).
- [ ] T6 Verificación ligera de §5. Anotar en §8 lo verificado, las decisiones y cualquier contradicción con girasol.pe; actualizar `specs/pendientes.md`; dejar el spec en `en-curso` para revisión.

## 8. Notas de implementación

_(vacío)_
