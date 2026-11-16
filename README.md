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

## Configuración por PC (`.env.local`)

Copia `.env.example` como `.env.local`. Ese archivo no se sube a git, así que cada PC tiene el suyo.

- **Cloudflare Tunnel:** si ves el sitio a través de un túnel (`*.trycloudflare.com`), agrega
  `DEV_ALLOWED_HOSTS=.trycloudflare.com` y reinicia `pnpm dev`. Sin esa línea, el servidor solo acepta
  `localhost` y bloquea el túnel con el error "Blocked request. This host … is not allowed".
- **Indexación:** el sitio sale con `noindex` mientras haya placeholders. `INDEXABLE=true` solo cuando
  `specs/pendientes.md` esté vacío; si no, el build falla a propósito.

## Cómo se trabaja

Antes de tocar código, lee `specs/constitution.md`. Cada cambio empieza como un spec en `specs/features/`
(plantilla en `specs/_templates/spec.md`) y se implementa cuando está aprobado. El mapa del sitio está en
`specs/site.md` y los datos por confirmar, en `specs/pendientes.md`.
