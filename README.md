# firmaremota.pe

Web de firma remota, un producto de Girasol. Astro 7 + Tailwind v4, con desarrollo guiado por specs.

## Requisitos

- **Node 24 LTS** (mínimo 22.23.4). Con nvm-windows: `nvm install 24.22.3` y `nvm use 24.22.3` (este último, en una terminal de administrador).
- **pnpm 10**: `npm install -g pnpm@10`

## Empezar

```bash
pnpm install
pnpm dev
```

Abre http://localhost:4321.

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Revisa pendientes y tipos, y compila a `dist/` |
| `pnpm preview` | Sirve el build |
| `pnpm check` | Revisa tipos |
| `pnpm pendientes` | Lista los placeholders del código (ver `specs/pendientes.md`) |

## Configuración

Clonar y correr: no hace falta ningún `.env`. Toda la configuración del proyecto vive en el código.

- **Cloudflare Tunnel:** con `pnpm dev` corriendo, en otra terminal:
  `cloudflared tunnel --url http://localhost:4321`. El servidor ya acepta `*.trycloudflare.com`
  (`astro.config.mjs` → `server.allowedHosts`).
- **Indexación:** el sitio está publicado y siempre se indexa. Si queda un placeholder
  (`PENDIENTE: Pxx`, ver `specs/pendientes.md`), `pnpm build` falla a propósito.
- **`.env`:** solo para secretos (claves de API, etc.). Hoy no hay ninguno; si aparece, se documenta en
  `.env.example` y cada uno lo pone en su `.env.local`, que no se sube a git.

## Cómo se trabaja

Antes de tocar código, lee `specs/constitution.md`. Cada cambio empieza como un spec en `specs/features/`
(plantilla en `specs/_templates/spec.md`) y se implementa cuando está aprobado. El mapa del sitio está en
`specs/site.md` y los datos por confirmar, en `specs/pendientes.md`.
