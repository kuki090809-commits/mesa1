# Estado del proyecto — Ordena (Especiero Giratorio 360°)

- Tienda: 0tp1ts-pj.myshopify.com (nombre interno "m", EUR, España; idioma principal: inglés, español publicado en /es)
- Carpeta: /home/user/mesa1 (repo `kuki090809-commits/mesa1`, rama `claude/zealous-bardeen-a6m77p`), tema en `tema/`
- Tema base: Dawn 16.1.1 (clonado de github.com/Shopify/dawn, 2026-11-11)
- Tema de trabajo en Shopify: **"Ordena (Claude)"** — `gid://shopify/OnlineStoreTheme/199326171518` (NO publicado)
- Vista previa: https://0tp1ts-pj.myshopify.com/es?preview_theme_id=199326171518
- Tema activo actual de la tienda: "FlexiDesk - v4" (196380885374) — no tocado
- Última subida: 2026-11-11, todas las secciones, plantillas y ajustes (sin errores)

## Cómo se sube el tema desde una sesión en la nube (importante)

La red de la sesión no llega a accounts.shopify.com, así que `shopify theme push` no sirve.
Se usa la conexión directa de Shopify (conector MCP):
1. Editar en `tema/`, pasar `shopify theme check --path tema` (funciona sin login; 0 errores).
2. `git commit` + `git push` (el repo es público).
3. `themeFilesUpsert` con `body: {type: URL, value: https://raw.githubusercontent.com/kuki090809-commits/mesa1/<SHA>/tema/<archivo>}`.
   Es asíncrono: comprobar con `theme.files(filenames: [...])`. Si un archivo sale `NOT_FOUND`,
   Shopify lo rechazó (p. ej. nombre de sección > 25 caracteres o ids de ajuste duplicados).
4. Subir primero secciones/snippets/assets y después los JSON (templates, grupos, settings_data).
- Publicar el tema (themePublish) está bloqueado desde aquí: lo hace el usuario en Tienda online → Temas.
- Entorno de nube "mesa1" creado con acceso a 0tp1ts-pj.myshopify.com, cdn.shopify.com y
  fonts.shopifycdn.com para revisar la web con capturas (Playwright).

## Producto

- ID: `gid://shopify/Product/16184774066558` — handle `especiero-giratorio-360`
- Especiero Giratorio 360° · marca "Ordena" · 22,90 € · SKU ORDENA-ESP-360 · **BORRADOR**
- ✅ Plantilla `product.ordena.json` asignada (templateSuffix `ordena`)
- ✅ Descripción limpiada (quitada la nota interna «pendiente de confirmar con el proveedor») y SEO escrito
- ⬜ Sin fotos (el usuario eligió dejar huecos, opción B). La galería muestra la ilustración.
- ⬜ PENDIENTE de confirmar con el proveedor: material, nº de tarros incluidos, medidas, acabado.
  Cuando se sepa: actualizar descripción, bloque «Qué incluye» de la ficha y pregunta «¿Cuánto espacio ocupa?».
- Público: adultos 25-55, cocinas pequeñas, les gusta tener todo organizado.
- Mientras el producto esté en borrador, la portada no muestra precio y el botón final dice «Ver el especiero».
  Al activarlo, aparecen precio y «Añadir al carrito» solos.

## Fases completadas
- [x] 0 Entorno
- [x] 1 Conexión + sondeo
- [x] 2 Proyecto
- [x] 3 Brief (estilo propuesto aceptado; fotos: opción B, huecos editables)
- [x] 4 Construcción
- [x] 5 Páginas (producto asignado, header, footer, favicon, enlaces legales)
- [~] 6 Publicación: subido y revisado como tema NO activo. Falta el OK del usuario para publicarlo.

## Decisiones de diseño
- Estilo «cocina ordenada y cálida». Prefijo de archivos: `or-`.
- Colores: fondo lino #F4EFE6 · secundario #EAE2D3 · texto oliva oscuro #1F2A22 ·
  acento pimentón #C4502A · apoyo salvia #7D8C6A. Editables en Configuración del tema → «Ordena · Colores de marca».
- Tipografía: Fraunces (títulos) + DM Sans (texto), en Configuración del tema → Tipografía.
- Esquinas redondeadas 20px (ajustable), botones píldora, marco de arco en la apertura.
- Sin reseñas inventadas: se añadirá una sección cuando haya reseñas reales.
- Ilustraciones SVG propias (snippet `or-ilustracion`) como respaldo de cada hueco de foto.

## Archivos creados / modificados
- Secciones: `or-hero` (apertura con sello 360° y parallax), `or-marquesina` (cinta de frases),
  `or-antes-despues` (comparador con deslizador), `or-cifras` (números animados),
  `or-pasos` (cómo funciona: el especiero gira con cada paso), `or-bandas` (foto + texto alternos),
  `or-faq` (preguntas, con datos para Google), `or-cierre` (panel final con compra),
  `or-producto` (ficha: galería, variantes, cantidad, carrito lateral, garantías, desplegables, características).
- Snippets: `or-tokens`, `or-ilustracion`, `or-imagen`, `or-logo`, `or-icono`, `or-form-compra`.
- Assets: `or-styles.css`, `or-scripts.js`, `or-favicon.png`.
- Dawn tocado: `sections/header.liquid` (logo de texto «Ordena» + logo por sección),
  `sections/footer.liquid` (reescrito), `layout/theme.liquid` (favicon, variables, css/js),
  `config/settings_schema.json` (grupo de colores de marca), `config/settings_data.json` (colores, fuentes, carrito lateral).
- Plantillas: `templates/index.json`, `templates/product.ordena.json`, grupos de header y footer.

## Pendientes del lado del usuario
- ⬜ Dar el OK para publicar (sustituye al diseño de FlexiDesk: es la misma tienda) o pasarlo a otra tienda.
- ⬜ Activar el producto cuando tenga proveedor y fotos.
- ⬜ Subir fotos desde el editor (cada hueco avisa «Pon tu foto aquí»).
- ⬜ Recomendado: poner el español como idioma principal (Configuración → Idiomas).
- ⬜ Recomendado: revisar políticas (la de privacidad está en inglés, la de devoluciones mezcla inglés y
  español y tiene «[INSERT RETURN ADDRESS]»; falta «Términos del servicio»).
- ⬜ El nombre de la tienda es «m» (sale en la pestaña del navegador): cambiarlo en Configuración → Detalles de la tienda.
