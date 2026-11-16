import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// Identidad "Tinta digital" (spec 002), derivada de las recetas de botón de Girasol.
// Todas las variantes miden al menos 48px de alto.
const variants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-150 ease-gs-out outline-none select-none focus-visible:ring-2 focus-visible:ring-fr-tinta/40 focus-visible:ring-offset-2 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** Primario: la acción principal del bloque (una sola por bloque). */
        default:
          "bg-fr-tinta text-white shadow-fr-button hover:bg-fr-tinta-hover",
        /** Secundario sobre fondo claro. También para WhatsApp dentro de tarjetas. */
        outline:
          "border-fr-line-strong bg-fr-sheet text-fr-navy hover:border-fr-tinta hover:text-fr-tinta",
        /** Secundario sobre fondo navy, junto al primario. */
        "outline-dark":
          "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
        /** Sólido navy: acción de una tarjeta no destacada. */
        navy: "bg-fr-navy text-white hover:bg-fr-text",
        ghost: "text-fr-navy hover:bg-fr-tinta-soft",
        link: "min-h-0 px-0 text-fr-tinta underline-offset-4 hover:underline",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
      },
      // El radio va en cada tamaño y no en la base: `cn` no reconoce `rounded-fr-*`
      // como clase de radio y no podría reemplazarlo por `rounded-full` en la píldora.
      size: {
        default: "min-h-12 rounded-fr-control px-6",
        /** CTA compacto (callout en línea): mantiene los 48px de área táctil. */
        sm: "min-h-12 rounded-fr-control px-4 text-[13px]",
        /** Píldora: CTA de hero. */
        pill: "min-h-12 rounded-full px-7",
        icon: "size-12 rounded-fr-control",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Clases del botón ya resueltas con `cn` (sin conflictos entre base y variante).
 * Úsalo en .astro sobre un <a> para tener el botón de marca sin cargar React:
 *   <a href="…" class={buttonVariants({ variant: "outline" })}>…</a>
 */
function buttonVariants(props?: Parameters<typeof variants>[0]) {
  return cn(variants(props))
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof variants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
