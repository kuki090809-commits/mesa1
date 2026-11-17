# Estado — MAISON DUVAL · Travel Essentials

> Proyecto nuevo e independiente de FlexiDesk. Tienda de accesorios de viaje premium (España + UE).
> El dominio de la tienda de vista previa NO se guarda aquí (repo público y la tienda aún no está
> guardada en una cuenta: cualquiera con la dirección podría editarla).

## Dónde está cada cosa
- Tienda: tienda de vista previa de Shopify (PreviewStore), sin guardar todavía en la cuenta del usuario.
- Tema: **"MAISON DUVAL"** (`gid://shopify/OnlineStoreTheme/190856888701`), **SIN publicar** (el usuario quiere verlo antes).
- Código del tema: `maison-duval/tema/` (Dawn 16.1.1 + secciones propias `md-*`). Zip: `maison-duval/maison-duval-tema.zip`.
- Textos legales y FAQ (con `[PENDIENTE: …]`): `maison-duval/contenido/`. Lista de datos que faltan: `contenido/_datos.md`.

## Cómo se sube el tema a la tienda de vista previa
- Las tiendas de vista previa no aceptan zips por `stagedUploadsCreate` (solo imágenes).
- Tema completo: `zip` → commit + push → `themeCreate(source: raw.githubusercontent.com/…/<SHA>/maison-duval/maison-duval-tema.zip)`.
- Cambios sueltos: `themeFilesUpsert` con `body {type: URL, value: raw.githubusercontent.com/…/<SHA>/maison-duval/tema/<archivo>}`.
- Límite de peticiones muy estricto (≈1 por minuto): agrupar mutaciones con alias.

## Creado en la tienda
- Colecciones (17/11/2026, modelo nuevo de Shopify con `sources`): Luggage, Travel Organizers, Nécessaires, Travel Care y
  Accessories, que se rellenan por etiqueta (`luggage`, `travel-organizers`, `necessaires`, `travel-care`, `accessories`).
  The Travel Collection (`the-travel-collection`, plantilla `collection.catalogo`) = proveedor «MAISON DUVAL».
  Imprescindibles = etiqueta `imprescindible`. Las antiguas Equipaje/Comodidad/Tecnología se borraron.
- Páginas: aviso-legal, politica-de-privacidad, politica-de-cookies, condiciones-generales-de-contratacion,
  politica-de-envios, politica-de-devoluciones-y-reembolsos, informacion-sobre-el-desistimiento,
  formulario-de-desistimiento, preguntas-frecuentes (plantilla faq), sobre-nosotros (plantilla sobre-nosotros), contacto (plantilla contacto).
- Menús: main-menu, atencion-al-cliente, maison, legal.
- Metacampos de producto: custom.materiales, custom.dimensiones, custom.cuidados, custom.detalles («Título | Texto»), custom.faq («Pregunta | Respuesta»).
- Fotos (Burst, licencia de uso comercial gratuita): md-hero-avion-nubes, md-cat-*, md-banner-atardecer, md-sobre-*, md-contacto-preparando-viaje.
- Producto de prueba: BORRADO el 17/11/2026 (sustituido por el catálogo real).

## Reglas de honestidad implementadas en el tema
- Envío gratuito: un único ajuste (`md_umbral_envio`, ahora 50 € PENDIENTE de confirmar con las tarifas reales). Si se vacía, desaparece en toda la web.
- Días de devolución: ajuste `md_dias_devolucion` (30, PENDIENTE de confirmar).
- Valoraciones: solo las reales de una app de reseñas (metacampo reviews.rating). Nada inventado.
- Materiales, medidas, cuidados, detalles y FAQ del producto: solo si se rellenan los metacampos.
- Newsletter: casilla de consentimiento obligatoria y separada; el texto de descuento está vacío (solo si existe un código real).
- Cookies: banner propio con la API de privacidad de Shopify (aceptar / rechazar / configurar, mismo peso), reabrible desde el pie.

## Lecciones (16/11/2026)
- Shopify rechaza en silencio (NOT_FOUND) un archivo con errores al subir por zip o `themeFilesUpsert`. Para ver el motivo,
  escribir el archivo con `theme_bash` y guardar con `theme_commit`, que devuelve `pushErrors`. Casos vistos:
  etiqueta de opción de un `select` de más de 50 caracteres; `page_width` fuera de los pasos (1000–1600 de 100 en 100).
- `theme_screenshot` y `theme_bash` usan una copia de trabajo que NO ve lo subido con `themeFilesUpsert`.
  Hacer los mismos cambios con `theme_bash` + `theme_commit` (o solo usar esa vía) para que las capturas sean fieles.
- Cormorant de Shopify no admite `font-variant-numeric: lining-nums` (sale «5o»): cifras importantes con la fuente de texto (Jost).
- La vista previa de la tienda solo muestra el tema publicado; MAISON DUVAL sigue sin publicar (decisión del usuario).

## Estado
- Tema completo y revisado con capturas (portada, producto, colección, carrito, páginas, móvil y ordenador).
- Auditoría y lista de pendientes: `maison-duval/PENDIENTES.md`.

## Catálogo (17/11/2026)
- 12 productos: contenido en `maison-duval/catalogo/productos.json`, sin costes de proveedor (el repo es público).
  9 activos y 3 en borrador por falta de precio (travel-backpack, dental-travel-case, toothbrush-travel-set).
- Sin fotos reales: el tema muestra `snippets/md-foto-pendiente.liquid` («Fotografía en preparación»). Nunca imágenes generadas.
- Precios y márgenes: Excel INTERNO entregado al usuario por chat, NO se sube al repo (contiene costes de proveedor).
- El tema oculta las categorías vacías y el filtro de disponibilidad (ajuste `md_ocultar_disponibilidad`) hasta conectar el stock de CJ.
- Etiquetas de tarjeta preparadas: `etiqueta:bestseller` y `etiqueta:new` (solo si están justificadas).
- theme_bash: no usar barras invertidas dentro de comillas simples (el intérprete da «unterminated quote»).

## CJdropshipping (17/11/2026)
- El Access Token de CJ está guardado como secreto de red del entorno «mesa1» (host developers.cjdropshipping.com, cabecera CJ-Access-Token).
  Para usarlo, las llamadas deben enviar `CJ-Access-Token: proxy-injected` y el proxy lo sustituye. La API admite 1 consulta por segundo.
- La web pública de CJ redirige a los programas automáticos a una verificación anti-robots: usar solo la API oficial.
- El usuario puede renovar el token con `maison-duval/conectar-cj.html` (la clave no pasa por el chat).
- La relación de productos con CJ (SKU y pid) está en el metacampo `proveedor.referencia` de cada producto y en el Excel interno.
  NO se sube al repo (público).

## Personalización (17/11/2026)
- Guía v1 (12 fichas) y petición a CJ en inglés entregadas al usuario por el chat. Herramientas de boceto en el scratchpad de la sesión: no en el repo.
- Logotipos del cliente: SVG solo con texto (fuente Cormorant no incrustada); los PNG y el PDF usan una fuente de sustitución. Pendiente fijar la tipografía y vectorizar.
- Regla: las imágenes con logo son PROPUESTAS; no van a la tienda hasta que CJ confirme y haya muestra aprobada.
- 17/11/2026: petición enviada a CJ por la API de tickets (con permiso del usuario). Ticket **T202611171041277601**
  (ticketId 2611171041270827600), tipo «Service Consultation → Products & Package Customization», estado AWAITING_CJ_REPLY.
  Lleva la petición de personalización de los 8 productos, la búsqueda de los 4 que faltan y 7 páginas adjuntas (la petición en JPG).
  Para ver respuestas: `POST ticket/list`, `GET ticket/detail?ticketId=…`, `GET ticket/messages?ticketId=…`. No crear otro ticket igual.
  Los adjuntos se subieron a CJ desde Archivos de Shopify y después se borraron de Shopify.
- 17/11/2026: el usuario eligió en el catálogo de CJ los estuches para los productos 11 y 12 (actualizados en Shopify, en borrador y sin precio).
  Se añadieron al ticket con una respuesta (`ticket/reply`). Quedan por localizar el Signature Luggage Set y el Travel Backpack.
- 17/11/2026: el usuario eligió también el juego de maletas (3 piezas, almacén de CJ en Polonia) y la mochila. Productos 7 y 9 actualizados
  en Shopify en borrador (el 7 pasó de activo a borrador porque cambió de 4 a 3 maletas). Añadidos al ticket con una segunda respuesta.
  Los 12 productos están identificados en CJ. Los juegos de maletas de almacenes de EE. UU. no tienen envío a España en CJ.
