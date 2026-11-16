# [004] Inicio: vida visual, planes del certificado y ajustes

> Estado: `hecho` (verificado por el usuario el 2026-11-16, tras la iteración 2) · Creado: 2026-11-16 · Actualizado: 2026-11-16
> Constitución: v0.3.2 · Depende de: 003-inicio

## 1. Contexto y objetivo

Al revisar el inicio (003), el usuario aprobó el contenido, pero lo encontró **plano**: la información no tiene nada visual que la acompañe. Pidió además tres ajustes:

1. **Las preguntas frecuentes se abren de golpe:** les falta una transición al desplegarse.
2. **"Compras por WhatsApp" no es exacto:** el cliente **habla con un asesor**, que lo atiende por WhatsApp.
3. **Los productos no muestran que hay dos certificados** (persona natural y persona jurídica), **cada uno con 3 vigencias** (1, 2 y 3 años).

**Objetivo medible:** que cada sección tenga un elemento visual que **explique** su contenido, no que solo lo adorne, y que el visitante pueda ver el precio de cualquiera de los 6 planes del certificado sin salir del inicio.

**Fuera de alcance:** las páginas de producto (pasan a ser el spec 005 y siguientes); fotos reales (no hay material todavía).

## 2. Contenido

### Cambios de texto

| Dónde | Antes | Después |
|---|---|---|
| Cómo funciona · paso 1 | **Compras por WhatsApp** · "Eliges tu certificado o tu bolsa de firmas y te atendemos por WhatsApp." | **Hablas con un asesor** · "Nos escribes por WhatsApp y un asesor te ayuda a elegir tu certificado y tus firmas." |
| Hero · nota | "Te atendemos por WhatsApp · Precios con IGV incluido" | "Te atiende un asesor por WhatsApp · Precios con IGV incluido" |
| Productos · intro | (se mantiene) | (se mantiene) |

El resto del texto aprobado en el 003 no cambia.

### Productos: los 6 planes del certificado

La tarjeta del certificado deja de mostrar un precio único y pasa a tener **dos selectores**:

- **Titular:** `Persona natural` | `Persona jurídica`. Los dos visibles siempre, para que quede claro que son dos certificados.
- **Vigencia:** `1 año` | `2 años` | `3 años`.

Al elegir, cambian **el nombre del plan, el precio** (con el número deslizándose) y **el mensaje de WhatsApp**. Por ejemplo: *"Hola, quiero comprar el certificado digital para persona jurídica con vigencia de 2 años."*

- Los 6 precios salen de la collection `productos` (hoy todos son US$ 20.00, **P01**).
- Opción inicial: persona natural, 1 año.

Se mantiene la idea de "**dos piezas, una firma**": certificado y firmas siguen siendo las dos tarjetas.

## 3. Comportamiento: lo visual por sección

Todas las ilustraciones son **SVG propios** en el estilo de la marca: línea navy, acentos ámbar, nada de stock. Son livianos, se ven nítidos y no hay imágenes que cargar.

| Sección | Qué se agrega | Qué explica | Cómo se anima |
|---|---|---|---|
| **Ventajas** | Cada tarjeta reemplaza su icono por una **mini-ilustración**: (1) una flecha de descarga tachada que se convierte en una nube con un documento; (2) laptop, celular y tablet con la misma firma; (3) cuatro puntos de PIN que se llenan y luego el código OTP con un check | Las tres ventajas, mostradas en lugar de dichas | Se reproduce **una vez al entrar** en pantalla (GSAP) |
| **Productos · certificado** | Selectores de titular y vigencia + precio que se desliza (`sliding-number` de animate-ui) + mini-credencial con el titular elegido | Que hay 2 certificados × 3 vigencias | Resaltado del selector que se desliza (`tabs` de animate-ui, Motion) |
| **Productos · firmas** | Una pila de "fichas de firma" con el contador **×10** | Qué es una bolsa | El contador sube de 0 a 10 al entrar (`counting-number`) |
| **Necesitas los dos** | La ecuación se vuelve **dos piezas que encajan**: certificado (izquierda) y firmas (derecha) se deslizan y se unen; aparece el resultado con su check dibujándose | Que solo juntas sirven | Al entrar en pantalla (GSAP) |
| **Cómo funciona** | (1) una conversación de WhatsApp con un asesor (burbujas + "escribiendo…"); (2) una tarjeta de acceso con usuario y contraseña que se escriben; (3) el PIN + OTP actual con un check final. Una **línea punteada** une los tres pasos y se dibuja con el scroll | El proceso real, paso a paso | Línea ligada al scroll; cada ilustración se reproduce al entrar |
| **Preguntas** | **Despliegue suave**: el contenido se abre y se cierra animando la altura; el "+" gira a "×" | — | CSS (`interpolate-size` + `::details-content`). Si el navegador no lo soporta, se abre sin animación, como ahora. Sigue funcionando sin JS |
| **Cierre** | Una firma grande que se dibuja de lado a lado bajo el título | Cierra con la idea de firmar | Al entrar en pantalla (CSS, como la del hero) |

**Reglas de movimiento** (constitución §7, se mantienen):
- Las ilustraciones son decorativas (`aria-hidden`); el texto explica por sí solo.
- Sin JS: se ven en su **estado final**, completas.
- Con "reducir movimiento": estado final, sin animar.
- Nada se repite en bucle salvo el sello y el "escribiendo…", que son sutiles y se detienen con "reducir movimiento".
- No se anima el primer pantallazo, salvo la firma del hero (ya existente).

**Islas React:** solo el selector del certificado y el contador de firmas (`client:visible`). Todo lo demás es SVG + GSAP o CSS en `.astro`.

## 4. SEO

- El `Service` del inicio pasa a incluir **las 7 ofertas** (6 planes del certificado + la bolsa de firmas). Hoy tiene 2.
- Nuevos `h3` dentro de la tarjeta del certificado: ninguno. Los selectores son controles, no encabezados.
- El texto de los planes que no está seleccionado **sigue en el HTML** (en el JSON-LD). La página no pierde contenido por usar un selector.
- Sin cambios de URL, `title` ni `description`.

## 5. Criterios de aceptación

**Contenido**
- [x] El paso 1 dice "Hablas con un asesor" con su texto nuevo, y la nota del hero menciona al asesor.
- [x] Se pueden ver los 6 planes del certificado; cada uno muestra su nombre y precio desde la collection y abre WhatsApp con su propio mensaje.

**Visual**
- [x] Ventajas, productos, "necesitas los dos", cómo funciona y el cierre tienen su ilustración o animación según §3.
- [x] Las preguntas se despliegan y repliegan con transición en navegadores que lo soportan, y sin transición (pero funcionando) en los demás.
- [x] Las ilustraciones usan solo colores de la marca (navy, ámbar, papel; el azul solo en controles).

**Movimiento y accesibilidad**
- [x] Sin JS, todas las ilustraciones se ven completas y el certificado muestra el plan inicial con su botón de compra funcionando.
- [x] Con "reducir movimiento", nada se anima ni se repite.
- [x] Los selectores funcionan con teclado (flechas y Tab) y anuncian el plan elegido a lectores de pantalla.
- [x] Las animaciones no usan `transition-all` en elementos que anima GSAP (regla de `reveal.ts`).

**Calidad**
- [x] Sin desborde lateral en 375, 768, 1024 y 1280px.
- [x] Lighthouse móvil ≥ 90 en las cuatro categorías, y CLS 0 (las ilustraciones reservan su espacio).
- [x] `pnpm build` sin errores ni advertencias.

## Para aprobar

1. **Las ilustraciones de §3.** Puedes cambiar cualquiera, por ejemplo si prefieres otra metáfora para "necesitas los dos".
2. **El selector dentro de la tarjeta del certificado.** La alternativa es mostrar **tres tarjetas** (certificado natural, certificado jurídica y firmas), cada una con su selector de vigencia. Recomiendo el selector: mantiene la idea de "dos piezas" y deja visibles los dos titulares.
3. **Los textos nuevos** del paso 1 y de la nota del hero.

---
<!-- Desde aquí, solo cuando el spec está `aprobado`. -->

## 6. Plan técnico

- **Una sola isla React:** `CertificadoPlanes.tsx` (`client:visible`). Selectores propios con `role="radiogroup"` sobre radios nativos (teclado gratis), un resaltado que se desliza con `layoutId` de Motion y el precio con `SlidingNumber` de animate-ui. Se renderiza en el servidor con el plan inicial, así que sin JS se ve completa y su botón funciona. Lleva `MotionConfig reducedMotion="user"`.
- **El contador ×10 de firmas** se hace con GSAP en `.astro`, no con `counting-number`: el HTML ya trae "10" (sin JS se ve el valor final) y GSAP lo anima desde 0 solo si está bajo el primer pantallazo. Así no hace falta una segunda isla.
- **Ilustraciones** en `src/components/illustrations/`, como SVG en `.astro`. Cada una marca sus partes con `data-parte` y declara su animación con `data-anim="nombre"`.
- **`src/lib/ilustraciones.ts`:** un registro de animaciones GSAP por nombre que se reproduce una vez al entrar en pantalla. Mismas reglas que `reveal.ts`: no anima lo que ya está en pantalla y respeta "reducir movimiento". La línea que une los pasos usa `scrub`.
- **Firmas que se dibujan al verse** (la del cierre): CSS como la del hero, pero en pausa hasta que un IntersectionObserver agrega `.is-visible`. La pausa solo aplica con la clase `js` en `<html>`; sin JS se dibuja igual.
- **Preguntas:** `interpolate-size: allow-keywords` + transición de `::details-content`.
- **Dependencias nuevas:** `motion` (la trae animate-ui). Es el motor de React previsto en la constitución.

## 7. Tareas

- [x] T1 Textos (paso 1, nota del hero) y `serviceSchema` con las 7 ofertas.
- [x] T2 Isla `CertificadoPlanes` + `SlidingNumber`.
- [x] T3 Ilustraciones y `ilustraciones.ts` (ventajas, firmas, necesitas los dos, pasos, línea).
- [x] T4 Despliegue suave de las preguntas y la firma del cierre.
- [x] T5 Verificación: criterios de §5.

## 8. Notas de implementación

**2026-11-16**

- **Verificado con Chrome sin interfaz (puppeteer-core):** el panel de navegador de la app estaba oculto y no renderiza, así que ahí ni IntersectionObserver ni requestAnimationFrame funcionan. Se usó un script que:
  - Hidrata la isla y elige "persona jurídica · 3 años": cambian el nombre, el anuncio `aria-live` y el mensaje de WhatsApp, y el precio usa `SlidingNumber` (4 rodillos). Con las flechas del teclado pasa a "2 años".
  - Comprueba que las ilustraciones empiezan ocultas bajo el pliegue y quedan en opacidad 1 al verse; el contador pasa de 0 a 10; la línea de los pasos avanza con el scroll.
  - Mide el acordeón: `::details-content` pasa de 45 px a mitad de transición a 76 px al final, con una pregunta abierta a la vez.
  - Comprueba que la firma del cierre se dibuja al llegar a la sección.
  - Con "reducir movimiento" y sin JS, todo queda en su estado final: precio "US$ 20.00" en texto, botón "Comprar certificado", contador "10" y firma completa.
  - En 375px no hay desborde.
- **El contador ×10 es GSAP en `.astro`**, no `counting-number` de animate-ui. El HTML trae el valor final y así no hace falta una segunda isla.
- **`SlidingNumber` oculta los dígitos hasta medirse:** en SSR no se ven. La isla muestra el precio como texto hasta hidratar, y la versión animada queda con `aria-hidden` (pinta 10 dígitos por posición).
- **"Puedes firmar ✓" → "Puedes firmar" + icono de check** que se dibuja: el ✓ quedaba duplicado.
- **"Incluye IGV" con `whitespace-nowrap`:** en 375px se partía en dos líneas.
- **`<html class="js">`** con un script en línea en el `<head>`: la firma del cierre solo queda en pausa si hay JS para reanudarla.
- **Lighthouse móvil:** 97 · 100 · 100 · 100. El LCP pasa de 2.1 s a 2.5 s (sigue en "bueno") y el TBT de 0 a 70 ms, por React + Motion en la isla. Si sube, la opción es `client:idle` o separar Motion.
- **`Service`** con las 7 ofertas (6 planes + bolsa de firmas).

**2026-11-16 — iteración 2 (revisión del usuario)**

El usuario marcó como mejorables tres animaciones y pidió una firma más realista.

- **Firma realista.**
  - `scripts/generar-firma.mjs` genera una firma con un trazo central suave (Catmull-Rom) y una "tinta" de grosor variable: gruesa al bajar, fina al subir y en los extremos, como un bolígrafo. Tiene mayúscula con bucle, letras enlazadas, un punto y una rúbrica que vuelve por debajo. Salida: `src/components/brand/firma-trazos.json`.
  - `Firma.astro` revela cada trazo con una máscara que recorre su línea central, a velocidad constante y en orden de escritura (trazo, punto, rúbrica). Solo CSS.
  - `FirmaMini.astro` usa la misma firma dentro de otras ilustraciones (el recorte se ensancha con GSAP).
  - Ojo con el compilador de Astro: `x! / y` en el frontmatter se confunde con una expresión regular y rompe el archivo. Queda anotado en `Firma.astro`.
- **Hero.** Secuencia en CSS: llegan los dígitos del código → se escribe la firma → cae el sello con un golpe. Termina en unos 3.6 s y sin JS queda en su estado final.
- **Ventajas, rediseñadas como escenas:**
  - **Sin instalar nada:** un instalador empieza a cargar, se tacha y queda atrás; el documento sube a la nube, se firma y aparece un check.
  - **Desde donde estés:** una nube manda pulsos a laptop, tablet y celular, y la misma firma se escribe en los tres.
  - **Doble verificación:** en el celular se marca el PIN, llega la notificación con el código y un escudo confirma.
- **Recorrido de pasos:** línea sólida que se llena con el scroll y una plumilla de pluma fuente que viaja en la punta. Cada número pasa de contorno a relleno ámbar al alcanzarlo. Sin JS y con "reducir movimiento", todos los números quedan activos.
- **Verificación** (Chrome sin interfaz, fotogramas intermedios y finales): sin errores de consola. Siguen pasando la isla, el teclado, el acordeón, "reducir movimiento", la página sin JS y el móvil. Lighthouse móvil 97 · 100 · 100 · 100.
- **Peso:** los trazos de la firma se repiten 7 veces y el HTML del inicio pesa 186 KB (34 KB con gzip). Si hace falta reducirlo, se puede definir la firma una sola vez como `<symbol>` y referenciarla con `<use>`.
