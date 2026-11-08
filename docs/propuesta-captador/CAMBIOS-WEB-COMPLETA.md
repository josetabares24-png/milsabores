# Mil Sabores: propuesta de web completa (preview)

> Movido a `docs/propuesta-captador/` (ver POSIBLE-MEJORA.md). Las rutas `shots/...` citadas abajo eran capturas locales y no están en el repo; hay una selección en `capturas/`.

Preview: https://milsabores-propuesta-captador.vercel.app (proyecto Vercel aparte, `noindex, nofollow` y robots `Disallow: /`).
La web real, el repo de GitHub y su proyecto de Vercel no se han tocado. No hay push, ni PR, ni comentarios. Todo está solo en la copia local `/workspace/ms-propuesta-captador`.

## 1. Paleta y estilo (según `brand/BRAND-MEMORY.md` y `brand/DECISIONS.md`)

La marca fija como **color principal el azul pastel `#A8C5D9`** (también theme color web/PWA), **fondo crema `#FFF9F0`** o blanco, **mango `#F2B705` solo como acento**, sage/peach como acentos extra, **Quicksand** como fuente principal y Pacifico solo en detalles. Regla del punto 8: "1 color principal + 1 acento + neutrales" y "alto contraste para texto".

Qué se aplicó:
- **Portada (Hero)**: se quitó el fondo negro y el amarillo como color principal. Ahora tiene fondo crema, titular grande en Quicksand bold con texto oscuro (gray-900), botón principal "Fazer Reserva" en azul pastel con texto oscuro (contraste de unos 9:1, pasa WCAG AA) y enlace "Ver Menu Completo" subrayado en pastel oscuro. El mango se queda solo en la pastilla pequeña "Mil Sabores · Rua da Prata 152, Baixa". Se mantienen el titular corto, la foto real y la barra fija de móvil que aparece al hacer scroll (ahora en blanco con botón pastel).
- **Navegación**: fondo blanco sólido y botón "Reservar" en azul pastel (antes mango). El logo no se ha tocado.
- **Banner de cookies**: vuelve al original de la marca (pastel).
- **Botón flotante** (móvil): "Reservar" en pastel con texto oscuro y "Ligar" en `pastel-ink` con texto blanco. Antes era texto blanco sobre pastel, con poco contraste.
- **Colores fuera de marca sustituidos** en toda la web:
  - Degradados morado/rosa de Instagram (inicio y galería) → pastel.
  - Tarjeta morada de Instagram en /reservas → pastel claro.
  - Iconos rosa (email) y "steel" → `pastel-ink`.
  - Hover ámbar en botones → `pastel-dark`.
  - Texto azul cielo → `pastel-ink`.
  - Etiquetas de dieta: vegan en sage, sin gluten con acento mango, nota de alergias en mango suave.
  - Los rojos de los mensajes de error se mantienen porque tienen una función.
- **Títulos**: todos los H1/H2 en gris casi negro (`gray-900`) con `tracking-tight`. Antes estaban en gris `slate`. Quedan más grandes y legibles. Se quitó `font-black` porque Quicksand solo llega a 700.
- Hovers que ponían texto blanco sobre pastel ahora ponen texto oscuro.
- Nada de estilo editorial crema/serif: solo Quicksand, píldoras redondeadas, fotos reales.

## 2. Textos que sonaban a IA (6 idiomas)

El script `scripts/copy_rewrite.py` aplica todos los cambios. El registro antes/después de cada idioma está en `scripts/copy_rewrite_log.json`.

### Lista del compañero (`/workspace/porta/milsabores-textos-ia.md`): 18 puntos

| # | Clave | Estado |
|---|---|---|
| 1 | gelados.cta.subtitle: fuera "o nosso gelado é o favorito de Lisboa" | Aplicado en los 6: "Visite-nos na Rua da Prata 152 e prove os gelados artesanais." |
| 2 | about.feature1 "Feito com Amor" | Aplicado: "Ingredientes frescos / Preparados na hora, com ingredientes frescos" |
| 3 | about.feature3_desc | Aplicado: "Uma pausa no meio da Baixa". **Adaptado**: el título "Ambiente Acolhedor" pasa a "Na Baixa" para que case con la descripción |
| 4 | about.para3 "experiência simples, cuidada…" | Aplicado: "Fica a dois passos do centro histórico, para uma pausa entre visitas." |
| 5 | about.subtitle | Aplicado: "Brunch e gelados artesanais na Rua da Prata, na Baixa." |
| 6 | gallery.title / subtitle "Galeria de Momentos" | Aplicado: "Galeria / Pratos e gelados do Mil Sabores" |
| 7 | instagram.subtitle, gallery.share_cta | Aplicado. **Adaptado**: el componente añade el @ detrás de instagram.subtitle, así que queda "Marque-nos na sua foto: @milsaboreslx" para no repetir el @. share_cta: "Marque @milsaboreslx na sua foto e podemos partilhá-la". También se cambió instagram.cta ("…apareça na nossa galeria!" → "Se nos marcar, podemos partilhar a sua foto.") |
| 8 | visit.title "Coração de Lisboa" | Aplicado: "Rua da Prata 152, Baixa" |
| 9 | footer.description | Aplicado: "…na Rua da Prata, Baixa de Lisboa." |
| 10 | fullMenu.intro | Aplicado: "Opções doces e salgadas, do pequeno-almoço ao lanche." |
| 11 | para_dos.desc / brunch_duo.description "experiência completa" | Aplicado: "Para partilhar a dois" (se mantiene la lista de lo que incluye) |
| 12 | featuredDish / americano "O autêntico…" | Aplicado: "Pequeno-almoço americano: …" |
| 13 | cocktails.details "A tarde perfeita merece um brinde!" | Aplicado: frase eliminada |
| 14 | beer_promo.details | Aplicado: segunda frase fuera ("Cerveja de pressão a preço especial.") |
| 15 | homeSeo.brunch.p2 | Aplicado: "Na carta há panquecas… Tem o menu online e fica fácil de encontrar na Baixa." |
| 16 | brunchLanding.hero.subtitle (hablaba de "esta página") | Aplicado: "Panquecas, ovos, café e gelados artesanais na Rua da Prata 152." |
| 17 | brunchLanding.story.p2 | Aplicado |
| 18 | brunchLanding.products.items.3.text | Aplicado: "Café e bebidas para acompanhar o brunch." |
| + | "coração da Baixa/Lisboa" (5 sitios) | Aplicado: ya no aparece en ningún texto visible de ningún idioma (about.para1, brunchLanding.story.p1, visit.title, footer, fullMenu.intro). También salió de hero.title y de las meta descriptions FR/IT ("au cœur", "nel cuore") |

No se saltó ninguno.

### Otros textos de relleno corregidos (mismo criterio, sin datos nuevos)
- menu.subtitle: "Pratos artesanais feitos com amor" → "Alguns pratos da carta"
- fullMenu.subtitle: "Fazer brunch é muito mais do que tomar o pequeno-almoço tarde: é fazer uma pausa, partilhar, saborear sem pressa." → "Brunch, hambúrgueres, café e gelados, com preços."
- homeSeo.brunch.p3: "…O foco é apenas o Mil Sabores, sem listas comparativas…" → "Veja o menu antes de vir. Para chegar, use o mapa ou ligue-nos."
- FAQ portada: "O horário visível no site é…" → "Todos os dias, das 7:00 às 19:00."
- /brunch-lisboa: se reescribieron los párrafos p3–p6, las tarjetas de producto, el texto del menú y las FAQ 2 y 3. Antes hablaban de "esta página", del "objetivo do conteúdo" y de "evitar expectativas baseadas em informação desatualizada". Ahora dicen cosas concretas que ya estaban en la web: los dulces llevan gelado a elegir, el gelado va en vaso de 1 a 3 bolas o en affogato, hay opciones vegetarianas y vegan, el horario es 7:00–19:00.
- gelados.subtitle: fuera "apenas sabor puro"; se quedan los datos que ya estaban (hecho a diario, sin conservantes ni colorantes)
- promotions.subtitle "Aproveite as nossas ofertas exclusivas" → "Preços especiais todos os dias, das 13:00 às 18:00"
- reservas: "Estamos aqui para ajudar" → "Ligue-nos ou escreva por WhatsApp"; texto de puntualidad más corto (mismos 15 minutos)
- contacto: "Estamos aqui para ajudar. Envie-nos uma mensagem!" → "Envie-nos uma mensagem e respondemos por email."
- cookies: "Usamos cookies para melhorar a sua experiência" → "Este site usa cookies."
- Meta descriptions EN/IT/DE/FR/ES que empezaban con "Discover / Scopri / Entdecken / Découvrez / Descubre" reescritas con la dirección.
- ES: alt "Experiencia gastronómica" → "Comida en Mil Sabores". FR: "À découvrir" → "Au menu".
- **Error encontrado**: en FR, DE e IT los párrafos de "Sobre nós" (about.para1/para2) estaban en inglés. Traducidos.

No hay rayas largas (—) en los textos. Los CTA son texto, sin flechas.

## 3. SEO
- Cada página e idioma tiene title y meta description únicos (13 páginas × 6 idiomas, comprobado; titles ≤ 60 caracteres, descriptions ≤ 151).
- Un solo H1 por página (comprobado en /, /menu, /reservas, /galeria, /brunch-lisboa, /fr/menu). Las secciones van en H2/H3.
- Canonical y hreflang (pt-PT, en, es, fr, de, it, x-default) siguen apuntando al dominio de producción del repo `https://www.milsaboresbrunch.com`.
- JSON-LD Restaurant/CafeOrCoffeeShop/IceCreamShop sale de `src/config/restaurant.ts`, así que el NAP es igual en todas las páginas: Mil Sabores Lisboa, Rua da Prata 152, 1100-619 Lisboa, +351 21 347 0214, todos los días 07:00–19:00. Coincide con el footer, la sección Visite-nos y el menú.
- Enlaces internos: la portada enlaza ahora a /brunch-lisboa desde la sección "Brunch na Baixa" (además de a /menu y /reservas). /menu y /brunch-lisboa se enlazan entre sí.
- Alt de imágenes: el alt de la foto del hero estaba fijo en portugués y ahora va traducido. El alt del gelado en /menu ("Gelato Artesanal Mil Sabores", fijo) también se traduce. Todas las imágenes usan next/image con `sizes`, con lazy load por defecto y `priority` solo arriba del todo.
- Rendimiento: en /menu, /reservas y /galeria la cabecera y la primera rejilla empezaban invisibles (animación desde opacidad 0) hasta que cargaba el JavaScript. Ahora salen visibles desde el primer render, lo que es mejor para el LCP y para los bots.
- Preview sigue en noindex: cabecera `X-Robots-Tag: noindex, nofollow` (next.config.ts) y robots.ts `Disallow: /`. Verificado con 200 en 8 URLs. **Antes de pasar a producción hay que quitar las dos cosas.**

## 4. Lo que José tiene que decidir o confirmar
1. **Dominio**: resuelto. `brunchmilsabores.com` no existe (NXDOMAIN); el bueno es `www.milsaboresbrunch.com`. Corregido en brand/BRAND-MEMORY.md, DECISIONS.md y SOCIAL-CONTENT.md (copia local).
2. **Gelados**: la web dice "feito diariamente no nosso espaço, sem conservantes nem corantes artificiais". Lo he dejado porque ya estaba, pero no lo puedo verificar. ¿Es cierto? Si no, se quita.
3. **Vista a la Igreja de São Nicolau** (sección Visite-nos): viene del repo. ¿Se confirma?
4. **Política de reservas**: "cancelación gratis hasta 24h" y "mesa guardada 15 minutos" vienen del repo. ¿Siguen vigentes con resmio?
5. **Promociones 13:00–18:00** (imperial a 1,50 €, cócteles a 5 €, hamburguesa + patatas a 10/12 €): ¿siguen vigentes?
6. En ES la web mezcla "gelados/panquecas" (portugués) y "helados/tortitas". En los textos nuevos he usado "helados/tortitas". ¿Se unifica todo así?
7. La portada no tiene botón directo a /brunch-lisboa arriba del todo. Lo he puesto en la sección de abajo para no recargar el hero.

## 5. Ronda 3 (comentarios de José: "aún se ve IA" y banner de privacidad muy grande)
- **Banner de cookies**: ahora es una franja blanca de una línea (unos 56 px en móvil): "Este site usa cookies. Saber mais", con Recusar y Aceitar pequeños. Sin icono ni tarjeta. Mientras está abierto no se ve la barra de reservar.
- **Barra de reservar en móvil**: es más fina (botones de 48 px, fondo crema, deja sitio para la zona segura del iPhone). Lleva "Reservar Mesa" y "Ligar Agora", y ahora está en todas las páginas menos /reservas. Sustituye al botón flotante redondo. En la portada aparece cuando el botón del hero ya no se ve; en las demás páginas, después de bajar un poco.
- **Volver arriba**: más pequeño (40 px, blanco) y oculto en móvil cuando está la barra o el banner.
- **Contacto**: las tarjetas de colores con iconos (Endereço/Horário/Telefone/Email) pasan a ser una lista de dos columnas (etiqueta y dato) con líneas finas, en la portada y en /reservas. En /reservas había dos bloques con el mismo título "Entre em Contacto"; ahora es uno solo, "Contacto", con la lista y el formulario.
- **Pie de página**: "Links Rápidos" pasa a "Páginas" en los 6 idiomas. Más compacto, sin iconos de colores, Instagram y Facebook como texto. "Sobre Nós" lleva a la sección real (/#about).
- **Patrones de plantilla eliminados**:
  - Etiquetas pequeñas encima de cada título.
  - Títulos centrados con subtítulo en cada sección (ahora alineados a la izquierda).
  - Logo grande repetido en la cabecera de /menu, /galeria, /reservas, /cookies y /privacidad.
  - Efecto 3D "tilt" con brillo en los platos.
  - Zoom al pasar el ratón, botones que crecen, sombras de colores, halo difuminado detrás de la foto.
  - Icono de destellos y flecha en "Ver no Menu".
  - Tarjetas de preguntas frecuentes: ahora es una lista con divisores.
  - Iconos con check en la política de cancelación.
  - Animaciones de entrada en todas las secciones de la portada.
- **Títulos genéricos cambiados** (6 idiomas):
  - "A Nossa História" → "Brunch e gelados na Rua da Prata"
  - "Destaques do Menu / Pratos artesanais…" → "Pratos da carta / Tostas, panquecas e poke."
  - "Prato em Destaque" → "Brunch"
  - "Brunch na Baixa de Lisboa, sem sair do centro" (repetía el H1) → "Panquecas, crepes e bowls na Baixa"
  - "Entre em Contacto" → "Contacto"
  - "Prefere Reservar por Telefone?" → "Prefere ligar?"
  - "Produtos do brunch no Mil Sabores" → "O que há na carta"
  - "Consultar o menu antes de visitar" → "Ver o menu antes de vir"
  - "Ofertas Especiais" → "13:00 - 18:00"
  - También se acortaron los textos de "Brunch na Baixa", la ubicación y el subtítulo de reservas, y se quitó el "Sim!" de la FAQ de grupos.
- Los alt de las fotos de Instagram en la portada estaban fijos en español; ahora salen traducidos.
- Script: `scripts/copy_rewrite_v3.py` (registro en `scripts/copy_rewrite_v3_log.json`).

## 6. Galería: vuelta a la versión anterior (comentario de José: "Galería me gustaba más la versión anterior")
- La última ronda que cambió `/galeria` fue la **ronda 3**. Las rondas 4 y 5 no tocaron esa página, solo el pie y la barra móvil, que son comunes a toda la web. Así que la versión anterior es la de la **ronda 2** (la de las capturas `shots/full-galeria-*.png`).
- No hay commits por ronda: la ronda 2 se ha reconstruido a partir del original del repo (`git show HEAD`) más los dos cambios que se hicieron en la ronda 2:
  - El morado/rosa de Instagram pasa a azul pastel.
  - La cabecera, los filtros y la rejilla se ven nada más cargar (`initial={false}`), en vez de empezar invisibles hasta la animación.
  - Además, los títulos van en gris oscuro.
- Lo que se ha deshecho de la ronda 3:
  - Vuelven el logo grande y la etiqueta "GALERIA" encima del título, y la cabecera centrada con el título grande.
  - Vuelven los filtros grandes y centrados, con sombra en el activo.
  - Vuelven las fotos con borde blanco, esquinas grandes, sombra, zoom e icono al pasar el ratón, en una columna en móvil.
  - Vuelve el bloque de Instagram centrado con icono y título "Siga-nos @milsaboreslx", ahora en azul pastel.
- Copia de la versión de la ronda 3 por si se quiere volver: `backups/galeria-page.ronda3.tsx`.
- Capturas: `shots/v6-galeria-m.png` y `shots/v6-galeria-d.png`. El resto de páginas no cambia.

## 7. Galería sin huecos y fuera el bloque de tres puntos (José: "No dejes espacios vacíos")
- **/galeria** (se mantiene el diseño de la ronda 2):
  - Las 6 primeras fotos cargan con prioridad. Mientras carga una foto, la tarjeta se ve en azul pastel claro, nunca en blanco.
  - Rejilla nueva sin huecos:
    - En escritorio: la primera foto es grande y las últimas se ensanchan para cerrar la última fila.
    - En tablet: la última foto ocupa las dos columnas si el número de fotos es impar.
    - En móvil: una columna.
  - Comprobado sin huecos en Todos, Comida, Bebidas y Eventos, en móvil, tablet y escritorio.
  - Las 25 fotos existen y cargan; no había ninguna rota.
  - El filtro "Interior" no tenía fotos y dejaba la página vacía; ahora se oculta.
  - El bloque de Instagram del final es más compacto y hay menos espacio debajo.
- **Inicio**: se ha quitado de la sección "Brunch e gelados na Rua da Prata" el bloque de tres puntos ("Ingredientes frescos", "Carta Variada", "Na Baixa"), junto con sus textos en los 6 idiomas. Tras el último párrafo van directamente las fotos.
- Capturas: `shots/v7-galeria-m.png`, `shots/v7-galeria-d.png` (página completa con todas las fotos cargadas) y `shots/v7-home-m.png`.
