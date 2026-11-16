/* Generado por la skill girasol-design (scripts/build.mjs) desde tokens/tokens.json. No editar a mano. */
/**
 * Preset de Tailwind v3 del Girasol Design System.
 *   // tailwind.config.js
 *   presets: [require("@girasol/design-system/tailwind-preset")]
 * Carga también dist/tokens.css para poder tematizar; sin él se usan los valores por defecto.
 */
const plugin = require("tailwindcss/plugin");

module.exports = {
  theme: {
    extend: {
      "colors": {
        "gs": {
          "navy": "rgb(var(--gs-color-navy-rgb, 14 3 92) / <alpha-value>)",
          "ink": "rgb(var(--gs-color-ink-rgb, 31 38 62) / <alpha-value>)",
          "action": "rgb(var(--gs-color-action-rgb, 68 137 232) / <alpha-value>)",
          "action-light": "rgb(var(--gs-color-action-light-rgb, 91 161 236) / <alpha-value>)",
          "sky": "rgb(var(--gs-color-sky-rgb, 101 175 255) / <alpha-value>)",
          "muted": "rgb(var(--gs-color-muted-rgb, 71 85 105) / <alpha-value>)",
          "surface": "rgb(var(--gs-color-surface-rgb, 250 250 250) / <alpha-value>)",
          "white": "rgb(var(--gs-color-white-rgb, 255 255 255) / <alpha-value>)",
          "tint-50": "rgb(var(--gs-color-tint-50-rgb, 244 249 255) / <alpha-value>)",
          "tint-100": "rgb(var(--gs-color-tint-100-rgb, 238 245 255) / <alpha-value>)",
          "tint-200": "rgb(var(--gs-color-tint-200-rgb, 230 241 255) / <alpha-value>)",
          "success": "rgb(var(--gs-color-success-rgb, 20 108 58) / <alpha-value>)",
          "success-soft": "rgb(var(--gs-color-success-soft-rgb, 227 247 236) / <alpha-value>)",
          "whatsapp": "rgb(var(--gs-color-whatsapp-rgb, 37 211 102) / <alpha-value>)"
        }
      },
      "backgroundImage": {
        "gs-gradient-action": "var(--gs-gradient-action, linear-gradient(135deg, #4489E8 0%, #5BA1EC 100%))",
        "gs-gradient-tint": "var(--gs-gradient-tint, linear-gradient(90deg, #F4F9FF 0%, #EEF5FF 50%, #E6F1FF 100%))",
        "gs-gradient-navy": "var(--gs-gradient-navy, linear-gradient(135deg, #0E035C 0%, #1F263E 100%))"
      },
      "fontFamily": {
        "gs-heading": [
          "Outfit",
          "sans-serif"
        ],
        "gs-body": [
          "Poppins",
          "sans-serif"
        ]
      },
      "letterSpacing": {
        "gs-eyebrow": "var(--gs-tracking-eyebrow, 0.22em)",
        "gs-badge": "var(--gs-tracking-badge, 0.12em)",
        "gs-tight": "var(--gs-tracking-tight, -0.025em)"
      },
      "borderRadius": {
        "gs-control": "var(--gs-radius-control, 0.75rem)",
        "gs-card-sm": "var(--gs-radius-card-sm, 1rem)",
        "gs-card": "var(--gs-radius-card, 1.5rem)",
        "gs-panel": "var(--gs-radius-panel, 1.75rem)",
        "gs-pill": "var(--gs-radius-pill, 9999px)"
      },
      "boxShadow": {
        "gs-chip": "var(--gs-shadow-chip, 0 2px 8px 0 rgba(68, 137, 232, 0.08))",
        "gs-card": "var(--gs-shadow-card, 0 18px 50px -35px rgba(14, 3, 92, 0.45))",
        "gs-card-hover": "var(--gs-shadow-card-hover, 0 28px 60px -35px rgba(14, 3, 92, 0.5))",
        "gs-card-featured": "var(--gs-shadow-card-featured, 0 24px 48px -24px rgba(68, 137, 232, 0.45))",
        "gs-card-featured-hover": "var(--gs-shadow-card-featured-hover, 0 32px 60px -24px rgba(68, 137, 232, 0.55))",
        "gs-ticket": "var(--gs-shadow-ticket, 0 28px 60px -28px rgba(14, 3, 92, 0.45))",
        "gs-panel": "var(--gs-shadow-panel, 0 30px 80px -50px rgba(14, 3, 92, 0.35))",
        "gs-button": "var(--gs-shadow-button, 0 12px 22px -6px rgba(68, 137, 232, 0.5))",
        "gs-icon": "var(--gs-shadow-icon, 0 8px 16px -6px rgba(68, 137, 232, 0.4))"
      },
      "maxWidth": {
        "gs-container": "var(--gs-layout-container, 1350px)"
      },
      "spacing": {
        "gs-gutter": "var(--gs-layout-gutter, 1.5rem)",
        "gs-section-y": "var(--gs-layout-section-y, 4rem)",
        "gs-section-y-lg": "var(--gs-layout-section-y-lg, 5rem)",
        "gs-nav-offset": "var(--gs-layout-nav-offset, 7rem)"
      },
      "transitionDuration": {
        "gs-fast": "var(--gs-motion-duration-fast, 150ms)",
        "gs-base": "var(--gs-motion-duration-base, 300ms)",
        "gs-slow": "var(--gs-motion-duration-slow, 500ms)",
        "gs-highlight": "var(--gs-motion-duration-highlight, 2200ms)"
      },
      "transitionTimingFunction": {
        "gs-out": "var(--gs-motion-easing-out, cubic-bezier(0.25, 0.46, 0.45, 0.94))"
      }
    },
  },
  plugins: [
    // Contenedor estándar: mismo ancho y gutter que todas las secciones.
    plugin(({ addComponents }) => {
      addComponents({
        ".gs-container": {
          width: "100%",
          maxWidth: "var(--gs-layout-container, 1350px)",
          marginInline: "auto",
          paddingInline: "var(--gs-layout-gutter, 1.5rem)",
        },
      });
    }),
  ],
};
