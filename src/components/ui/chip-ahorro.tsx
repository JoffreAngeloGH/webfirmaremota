import type { ReactNode } from 'react';

/** Chip de ahorro ("Ahorras 15 %"): mismo estilo en los selectores del certificado y de las bolsas. No es un control. */
export function ChipAhorro({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-full border border-fr-line-strong bg-fr-paper px-2 py-0.5 text-[11px] leading-none font-semibold whitespace-nowrap text-fr-navy">
			{children}
		</span>
	);
}
