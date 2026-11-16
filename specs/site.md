# Mapa del sitio — firmaremota.pe

> Estado: `borrador` · Creado: 2026-11-16 · Constitución: v0.1.1

Qué es el sitio, qué vende, qué páginas tiene y qué busca la gente que llega a cada una. Es la referencia de la que salen los specs de cada página.

---

## 1. El negocio en una página

**Objetivo del sitio:** vender la firma remota. Es informativo y comercial; **no hay pasarela de pagos**. Toda compra termina en una conversación de WhatsApp.

**Qué es la firma remota:** una firma que no se descarga ni se instala. El certificado vive en la nube y el cliente firma sus documentos desde ahí.

### Los dos productos

| | Certificado digital | Firmas |
|---|---|---|
| Qué es | La identidad digital del firmante | El "saldo" que se consume al firmar |
| Para quién | Persona natural y persona jurídica | Cualquier titular de un certificado |
| Planes | Vigencia de **1, 2 o 3 años**, para cada tipo (6 planes) | **Bolsas** de firmas; la mínima es de **10** |
| Precio | **US$ 20.00** en los 6 planes (placeholder, P01) | **US$ 1.00 por firma**: bolsa de 10 = **US$ 10.00**. Otras bolsas por confirmar (P02) |
| Vence | Al terminar su vigencia | **No vence** |
| Se compra | Por WhatsApp | Por WhatsApp |

Todos los precios **incluyen IGV**. Se indica con una nota discreta junto al precio ("Incluye IGV"), visible pero sin protagonismo.

**La regla que el sitio tiene que dejar clarísima:** para firmar se necesitan **las dos cosas**.

| Tiene certificado | Tiene firmas | ¿Puede firmar? |
|---|---|---|
| Sí | Sí | **Sí** |
| Sí | No | No |
| No | Sí | No |
| No | No | No |

Son independientes: el cliente puede tener el certificado de firmaremota.pe y gestionar sus firmas por otro lado, o comprarnos firmas y tener el certificado de otro proveedor.

### Cómo firma el cliente

1. Recibe **usuario y contraseña** (no se le entrega un archivo para instalar).
2. Al firmar, ingresa su **PIN**.
3. Confirma con un **código OTP que le llega por WhatsApp**.

### Cómo compra

Botón "Comprar" → enlace de WhatsApp con un **mensaje prellenado** que indica el producto (certificado persona natural / jurídica y su vigencia, o la bolsa de firmas). Así el equipo de ventas sabe qué quiere el cliente sin preguntar.

**Lo que este sitio no es:** no tiene login, ni panel de usuario, ni plataforma para firmar. Eso vive en otro sistema y no se enlaza desde aquí.

---

## 2. Intención de búsqueda

Hay cuatro intenciones y el sitio cubre las cuatro, cada una con una página distinta para que no compitan entre sí:

| Intención | Qué busca la persona | Ejemplos de búsqueda | Dónde se atiende |
|---|---|---|---|
| **Informativa** | Entender algo | "qué es la firma remota", "firma remota vs firma digital", "cómo firmar un PDF sin token" | Inicio (lo básico), FAQ y **blog** (lo detallado) |
| **Comercial / de investigación** | Comparar antes de decidir | "firma remota precio", "mejor firma digital Perú", "firma remota o token" | Inicio, páginas de producto |
| **Transaccional** | Comprar ya | "comprar certificado digital persona natural", "certificado digital persona jurídica precio" | Páginas de producto |
| **Navegacional** | Llegar a la marca | "firmaremota", "firma remota girasol" | Inicio. El sitio no tiene login, así que esta intención se reduce a la marca |

Hay un matiz local importante: la gente busca "**en Perú**", "**SUNAT**", "**validez legal**" y "**RENIEC / INDECOPI**". Ahí está gran parte de la confianza y del posicionamiento.

**Regla:** las páginas de producto atacan las búsquedas transaccionales y comerciales; el blog ataca las informativas y enlaza a los productos. Un artículo del blog nunca compite por "comprar certificado digital".

---

## 3. Páginas

URLs con `/` final (constitución §8).

| URL | Página | Intención principal | Keyword principal | Schema |
|---|---|---|---|---|
| `/` | Inicio | Comercial + informativa | firma remota | `Organization`, `WebSite`, `Service`, `FAQPage` |
| `/certificado-digital/` | Certificado digital (natural y jurídica) | Transaccional | certificado digital persona natural / jurídica | `Product` + `Offer`, `BreadcrumbList`, `FAQPage` |
| `/firmas/` | Paquetes de firmas | Transaccional | comprar firmas digitales / paquete de firmas | `Product` + `Offer`, `BreadcrumbList`, `FAQPage` |
| `/preguntas-frecuentes/` | FAQ completo | Informativa | preguntas sobre firma remota | `FAQPage`, `BreadcrumbList` |
| `/terminos-y-condiciones/` | Legal | — | — | `BreadcrumbList` |
| `/politica-de-privacidad/` | Legal (Ley 29733, datos personales) | — | — | `BreadcrumbList` |
| `/404` | No encontrada | — | — | — |
| `/blog/` y `/blog/<slug>/` | **Más adelante** | Informativa | por artículo | `Blog`, `Article`, `BreadcrumbList` |

### Decisiones de estructura

- **Un solo `/certificado-digital/` con natural y jurídica dentro** (anclas `#persona-natural` y `#persona-juridica`), porque el precio es el mismo y la diferencia está en los requisitos. Dentro de cada tipo, los planes de 1, 2 y 3 años se muestran como tarjetas de oferta, con anclas `#natural-1-ano`, `#juridica-3-anos`, etc., para poder enlazar a un plan concreto. Si más adelante la diferencia crece (requisitos, plazos, búsquedas propias con volumen), se separa en `/certificado-digital/persona-natural/` y `/persona-juridica/` con redirección de las anclas. Esto se decide con datos de Search Console, no antes.
- **Sin página `/precios/`** al inicio: los precios están en el inicio y en cada producto. Una página de precios aparte competiría con ellas por las mismas búsquedas.
- **"Cómo funciona" es una sección del inicio**, no una página: son tres pasos.
- **El blog entra en un spec propio** cuando haya artículos. La arquitectura (collection `blog`, layout de artículo) se deja preparada desde el setup para no cambiar URLs después.

---

## 4. Inicio: secciones propuestas

Orden pensado para llevar de "qué es" a "comprar". Cada sección será un spec o parte del spec de inicio.

1. **Hero:** qué es la firma remota en una frase + CTA "Comprar" (WhatsApp) + CTA secundario "Cómo funciona".
2. **Qué es / ventajas:** sin descargas ni instalaciones, firma desde cualquier lugar, seguridad con PIN + OTP. Comparación breve con el certificado tradicional (token o archivo instalado).
3. **Los dos productos:** certificado y firmas, con precio y botón de compra cada uno.
4. **"Necesitas los dos":** la tabla de arriba explicada de forma visual. Es el punto que más confusión va a generar.
5. **Cómo funciona:** 3 pasos (compras → recibes usuario y contraseña → firmas con PIN + OTP por WhatsApp). Usa la *tarjeta de paso* del design system.
6. **Preguntas frecuentes:** las 5–6 más importantes, con enlace a la página completa.
7. **CTA de cierre:** sección navy del design system.

---

## 5. Componentes y datos que se repiten

- **`site.ts`:** número de WhatsApp, mensajes prellenados por producto, datos legales de la empresa.
- **Collection `productos`:** los 6 planes de certificado (tipo × vigencia) y las bolsas de firmas, con precio, moneda, "incluye IGV" y cantidad. Alimenta las tarjetas, el schema `Offer` y los mensajes de WhatsApp. Un cambio de precio se hace en un solo lugar, y agregar una bolsa nueva es agregar un registro.
- **Collection `faqs`:** cada pregunta indica en qué páginas aparece. El schema `FAQPage` se genera de lo que se muestra en cada página.
- **Selectores de plan** (islas React): en el certificado, elegir tipo y vigencia; en firmas, elegir la bolsa. El precio y el mensaje de WhatsApp cambian según la elección. Son las únicas interacciones reales del sitio y el lugar natural para componentes de animate-ui. Con una sola bolsa confirmada, el selector de firmas espera a P02; mientras tanto se muestra la bolsa de 10 como tarjeta fija.

### CTA de compra y el design system

El design system de Girasol dice que el botón de WhatsApp es **secundario** y nunca verde. Aquí **comprar por WhatsApp es la acción principal**, así que se propone:

- El CTA "Comprar" usa el **botón primario** (degradado azul `action`) con el ícono de WhatsApp. Sigue sin ser verde, que es lo que protege la marca.
- El texto dice la acción, no el canal: "Comprar certificado", "Comprar firmas". Una línea debajo aclara "Te atendemos por WhatsApp".

Pendiente de aprobación (**P20**). Si se aprueba, se agrega a la constitución §6.2.

---

## 6. Datos por confirmar

Viven en **[pendientes.md](pendientes.md)**, con su ID, el placeholder que usa la web y su estado. Ese archivo es la única lista: no se duplican aquí.
