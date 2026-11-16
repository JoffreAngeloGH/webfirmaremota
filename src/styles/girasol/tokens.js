/* Generado por la skill girasol-design (scripts/build.mjs) desde tokens/tokens.json. No editar a mano. */
/** Valores finales de los tokens (sin var()). Útil para GSAP, canvas, charts o emails. */
export const tokens = {
  "color": {
    "navy": "#0E035C",
    "ink": "#1F263E",
    "action": "#4489E8",
    "action-light": "#5BA1EC",
    "sky": "#65AFFF",
    "muted": "#475569",
    "surface": "#FAFAFA",
    "white": "#FFFFFF",
    "tint-50": "#F4F9FF",
    "tint-100": "#EEF5FF",
    "tint-200": "#E6F1FF",
    "success": "#146C3A",
    "success-soft": "#E3F7EC",
    "whatsapp": "#25D366"
  },
  "gradient": {
    "action": "linear-gradient(135deg, #4489E8 0%, #5BA1EC 100%)",
    "tint": "linear-gradient(90deg, #F4F9FF 0%, #EEF5FF 50%, #E6F1FF 100%)",
    "navy": "linear-gradient(135deg, #0E035C 0%, #1F263E 100%)"
  },
  "font": {
    "family": {
      "heading": "\"Outfit\", sans-serif",
      "body": "\"Poppins\", sans-serif"
    },
    "weight": {
      "regular": 400,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "tracking": {
    "eyebrow": "0.22em",
    "badge": "0.12em",
    "tight": "-0.025em"
  },
  "radius": {
    "control": "0.75rem",
    "card-sm": "1rem",
    "card": "1.5rem",
    "panel": "1.75rem",
    "pill": "9999px"
  },
  "shadow": {
    "chip": "0 2px 8px 0 rgba(68, 137, 232, 0.08)",
    "card": "0 18px 50px -35px rgba(14, 3, 92, 0.45)",
    "card-hover": "0 28px 60px -35px rgba(14, 3, 92, 0.5)",
    "card-featured": "0 24px 48px -24px rgba(68, 137, 232, 0.45)",
    "card-featured-hover": "0 32px 60px -24px rgba(68, 137, 232, 0.55)",
    "ticket": "0 28px 60px -28px rgba(14, 3, 92, 0.45)",
    "panel": "0 30px 80px -50px rgba(14, 3, 92, 0.35)",
    "button": "0 12px 22px -6px rgba(68, 137, 232, 0.5)",
    "icon": "0 8px 16px -6px rgba(68, 137, 232, 0.4)"
  },
  "layout": {
    "container": "1350px",
    "gutter": "1.5rem",
    "section-y": "4rem",
    "section-y-lg": "5rem",
    "nav-offset": "7rem"
  },
  "motion": {
    "duration": {
      "fast": "150ms",
      "base": "300ms",
      "slow": "500ms",
      "highlight": "2200ms"
    },
    "easing": {
      "out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },
    "distance": {
      "reveal": "24px"
    }
  }
};

/** Nombre de la variable CSS de un token: cssVar("color.navy") → "var(--gs-color-navy)". */
export const cssVar = (path) => `var(--gs-${path.replaceAll(".", "-")})`;
