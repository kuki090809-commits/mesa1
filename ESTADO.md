# Estado del proyecto — FlexiDesk (tienda de producto único)

> 2026-11-11: el usuario pidió una tienda SOLO para FlexiDesk (no quería el especiero de cocina).
> El diseño anterior «Ordena» queda guardado en el historial git (commit `5f26b0d`) y como
> tema «Ordena (Claude)» (199326171518) en Shopify, sin publicar. No mezclar.

- Tienda: 0tp1ts-pj.myshopify.com (nombre interno "m", EUR, España; idioma principal: inglés, español publicado en /es)
- Carpeta: /home/user/mesa1 (repo `kuki090809-commits/mesa1`, rama `claude/zealous-bardeen-a6m77p`), tema en `tema/`
- Tema base: Dawn 16.1.1
- Tema de trabajo: **"FlexiDesk (Claude)"** — `gid://shopify/OnlineStoreTheme/199328891262` (NO publicado)
- Vista previa: https://0tp1ts-pj.myshopify.com/es?preview_theme_id=199328891262
- Tema activo actual de la tienda: "FlexiDesk - v4" (196380885374) — no tocado

## Cómo se sube el tema desde una sesión en la nube

La red de la sesión no llega a accounts.shopify.com, así que `shopify theme push` no sirve.
- Tema nuevo completo: zip de `tema/` → `stagedUploadsCreate` (resource FILE) → subir a Google Storage → `themeCreate`.
- Cambios sueltos: `shopify theme check --path tema` (0 errores) → commit + push (repo público) →
  `themeFilesUpsert` con `body: {type: URL, value: https://raw.githubusercontent.com/kuki090809-commits/mesa1/<SHA>/tema/<archivo>}`.
  Es asíncrono: comprobar con `theme.files(filenames: [...])`; `NOT_FOUND` = Shopify lo rechazó
  (nombre de sección > 25 caracteres, ids de ajuste duplicados…). Subir secciones antes que JSON.
- Publicar (themePublish) está bloqueado desde aquí: lo hace el usuario en Tienda online → Temas.
- Entorno de nube "mesa1": acceso a 0tp1ts-pj.myshopify.com, cdn.shopify.com y fonts.shopifycdn.com
  para revisar la web con capturas (Playwright).

## Producto

- `gid://shopify/Product/16074055811454` — handle `flexidesk™-mesa-auxiliar-regulable` — **ACTIVO**
- FlexiDesk™ — Mesa Auxiliar Regulable · 99 € (antes 120 €) · variante única
- Datos: altura 60-90 cm · superficie 60×40 cm · base 57×40 cm con ruedas · estructura metálica ·
  tornillería incluida, montaje en minutos. Uso junto a cama, sofá o sillón.
- Fotos: 3 fotos reales pero de solo **220×220 px** (miniaturas de proveedor). Se usan en la galería
  y en «Así queda en casa» (tamaño pequeño). Los huecos grandes usan ilustraciones SVG propias.
  → Pedir al usuario fotos grandes del proveedor (≥1500 px) o generarlas con IA.
- La ficha usa `templates/product.json` del tema (no hace falta asignar plantilla: tienda de un solo producto).
- Descripción y SEO del catálogo NO tocados (el producto está en venta en la tienda publicada).

## Fases
- [x] 0 Entorno · [x] 1 Conexión · [x] 2 Proyecto · [x] 3 Brief (estilo elegido por Claude, fotos opción B)
- [x] 4 Construcción · [x] 5 Páginas · [~] 6 Subido como tema NO activo; falta OK del usuario para publicar

## Decisiones de diseño
- Estilo «calma productiva»: limpio, tecnológico y cómodo. Prefijo de archivos: `fd-`.
- Colores: fondo #F3F3EF · secundario #E5E7E1 · texto grafito #17191D · acento azul cobalto #2D5BE3 ·
  apoyo #8B95A5. Editables en Configuración del tema → «FlexiDesk · Colores de marca».
- Tipografía: Schibsted Grotesk (títulos) + DM Sans (texto). Esquinas 14 px. Palabra destacada del título en azul.
- Sin reseñas inventadas.

## Secciones
- `fd-hero` titular grande + escena panorámica (sofá + mesa) con etiquetas flotantes y precio
- `fd-usos` 4 tarjetas: trabaja, estudia, lee, desayuna (carrusel en móvil)
- `fd-altura` deslizador 60-90 cm que sube y baja la mesa, con consejos según la altura
- `fd-antes-despues` portátil en las rodillas vs. con FlexiDesk (comparador)
- `fd-medidas` plano técnico con cotas + fichas de datos (ancla #medidas)
- `fd-galeria` «Así queda en casa»: fotos del producto como polaroids
- `fd-montaje` 3 pasos
- `fd-faq`, `fd-cierre` (panel final con añadir al carrito), `fd-barra` (barra de compra fija al bajar)
- `fd-producto` ficha: galería, precio con -17 %, cantidad, carrito lateral, pago rápido, garantías,
  desplegables (descripción, medidas, qué incluye, envío) y características
- Snippets: `fd-tokens`, `fd-ilustracion`, `fd-imagen`, `fd-logo`, `fd-icono`, `fd-form-compra`
- Dawn tocado: header (logo de texto FlexiDesk), footer (reescrito), theme.liquid (favicon, css/js),
  settings_schema (colores de marca), settings_data (colores, fuentes, carrito lateral)

## Pendientes del lado del usuario
- ⬜ OK para publicar «FlexiDesk (Claude)» (Tienda online → Temas → Publicar)
- ⬜ Fotos grandes del producto (las actuales son de 220 px)
- ⬜ Recomendado: español como idioma principal; cambiar el nombre «m» de la tienda;
  revisar políticas (privacidad en inglés, devoluciones con «[INSERT RETURN ADDRESS]», falta Términos)
- ⬜ El especiero (borrador) quedó con plantilla `ordena` asignada y descripción limpia; no afecta a la tienda.
