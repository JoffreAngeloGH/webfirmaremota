# [NNN] Nombre de la funcionalidad

> Estado: `borrador` · Creado: AAAA-MM-DD · Actualizado: AAAA-MM-DD
> Constitución: v0.1.0

<!--
Cómo usar esta plantilla:
- Copiarla a specs/features/NNN-nombre-corto/spec.md.
- En estado `borrador` se llenan las secciones 1 a 5 (qué y por qué).
- Cuando el usuario aprueba, se llenan 6 y 7 (cómo) y el estado pasa a `aprobado`.
- Borrar lo que no aplique; no dejar secciones de relleno.
- Lo que no esté confirmado se marca [POR CONFIRMAR] y no se publica.
-->

## 1. Contexto y objetivo

Qué problema resuelve y para quién. Una o dos frases.

**Objetivo medible:** qué debe lograr el usuario al ver o usar esto (por ejemplo: "entender en 5 s qué es la firma remota y llegar al CTA").

**Fuera de alcance:** lo que explícitamente no se hace aquí.

## 2. Contenido

Qué se muestra y de dónde sale (constitución §5).

| Elemento | Texto o dato | Fuente |
|---|---|---|
| Título (`h1`/`h2`) | … | página / `site.ts` / collection `…` |
| … | … | … |

Datos pendientes de confirmar:
- [POR CONFIRMAR] …

## 3. Comportamiento

- **Estructura y layout:** qué componentes del design system usa (`references/components.md`) y cómo se ordena en móvil y escritorio.
- **Interacción:** qué pasa al hacer clic, hover, foco.
- **Animación:** qué se anima, con qué motor (Motion / GSAP / CSS) y qué pasa con `prefers-reduced-motion`.
- **Enlaces y CTAs:** a dónde lleva cada uno, exactamente.

## 4. SEO

| Campo | Valor |
|---|---|
| URL | `/…/` |
| `title` | … |
| `description` | … (máx. ~155 caracteres) |
| `h1` | … |
| Schema JSON-LD | `…` (constitución §8) |
| Keywords objetivo | … |
| Imagen OG | por defecto / propia |

(Si es una sección y no una página: indicar solo el `h2`, los anclas `#id` y el schema que aporta.)

## 5. Criterios de aceptación

Comprobables, uno por línea. Además de la definición de terminado de la constitución (§11).

- [ ] …
- [ ] …
- [ ] Se ve completo sin JS.
- [ ] Respeta `prefers-reduced-motion`.

---
<!-- Desde aquí, solo cuando el spec está `aprobado`. -->

## 6. Plan técnico

- **Archivos que se crean o modifican:** …
- **`.astro` o isla React:** cuál y por qué; directiva de carga (`client:visible` / `client:idle`).
- **Componentes de terceros:** cuáles, de qué registry y qué se adapta a la marca.
- **Dependencias nuevas:** cuáles y por qué no alcanza con lo existente (o "ninguna").
- **Riesgos o dudas técnicas:** …

## 7. Tareas

Pequeñas y verificables. Se marcan al terminar.

- [ ] T1 …
- [ ] T2 …
- [ ] T3 Verificación: criterios de §5 + definición de terminado.

## 8. Notas de implementación

Decisiones tomadas durante la implementación y cambios al spec (con fecha).
