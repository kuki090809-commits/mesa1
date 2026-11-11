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
- ✅ 2026-11-11: quitada la traducción «es» de la descripción y del título SEO, que estaba en inglés
  (en /es salía la descripción en inglés). Ahora /es muestra la descripción original en español.

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

## Políticas legales (2026-11-11)
- La conexión de Shopify NO tiene permiso `write_legal_policies`: las políticas no se pueden guardar desde aquí.
  Plan B: página para copiar y pegar → https://claude.ai/artifact/W8sy9c3pp8qZEVo3hy4Pjk (fuente: `legal/politicas.html`).
  El usuario rellena titular, NIF, dirección, correo (y teléfono opcional) en la página; sus datos no pasan por Claude.
  Seis textos: reembolso, privacidad, términos del servicio, envío, información de contacto, aviso legal.
- ✅ Página «Política de cookies» reescrita y publicada (pageUpdate). Fuente: `legal/cookies.html`.
- ✅ Footer del tema FlexiDesk: enlace «Preferencias de cookies» (abre el panel de Shopify).
- Mercados: solo existe el mercado «Spain» activo → la tienda solo vende a España (las zonas de envío UE 8,99 € e
  internacional 12,99 € existen pero no se usan). En España el envío es gratis (incluido en los 99 €), así que
  «Envío gratis en todos los pedidos» es correcto. Si se abre Europa: precio por mercado con el envío incluido.
- ⬜ Cuando el usuario diga «listo»: comprobar /policies/* en /es y en la raíz, y quitar con translationsRemove las
  traducciones «es» antiguas de las políticas (la de privacidad tiene una traducción automática de Shopify).
- ⬜ Nombre de la tienda: no hay forma de cambiarlo por API → el usuario: Configuración → Detalles de la tienda.
- ⚠️ Precio tachado de 120 €: por la normativa de precios de referencia (Ómnibus), solo se puede mostrar si fue el
  precio más bajo de los 30 días anteriores a la rebaja. Avisado al usuario.

## Políticas legales publicadas (2026-11-11, después)
- El enlace de autorización (permiso de políticas) no le funcionó al usuario → plan alternativo, todo hecho por Claude:
  - ✅ 5 páginas nuevas con los datos del titular (nombre, NIF/NIE, domicilio de Shopify y correo de la tienda;
    teléfono NO publicado): /pages/aviso-legal, /pages/politica-de-privacidad, /pages/terminos-y-condiciones,
    /pages/politica-de-devoluciones, /pages/politica-de-envios (+ /pages/politica-de-cookies reescrita).
    Los textos se generan desde `legal/politicas.html` (los datos personales NO se guardan en el repo).
  - ✅ Menú «Legal» (handle `legal`) con esas 6 páginas; el footer del tema FlexiDesk lo usa (ajuste `menu_legal`).
  - ✅ Traducción «es» de las políticas oficiales de Shopify (privacidad, reembolso, envío) = mismos textos → el pago
    en español ya muestra las políticas nuevas.
  - ⬜ Las políticas oficiales en el idioma principal (inglés, sin /es) siguen con el texto antiguo, y no existen
    «Términos del servicio» ni «Aviso legal» oficiales. Se arregla con: (a) español como idioma principal
    (webPresenceUpdate defaultLocale «es» — pendiente del sí del usuario) o (b) que el usuario autorice
    `write_legal_policies` desde un ordenador (verificador PKCE guardado fuera del repo, en el scratchpad de la sesión).
- ✅ 2026-11-11: español como idioma principal de la web (webPresenceUpdate: defaultLocale «es», inglés en /en).
  La raíz ya sale en español y las políticas oficiales muestran los textos nuevos. Vista previa del tema:
  https://0tp1ts-pj.myshopify.com/?preview_theme_id=199328891262
