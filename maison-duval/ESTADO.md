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
- Colecciones automáticas por tipo de producto: Equipaje (`Equipaje`), Organización de viaje (`Organización`),
  Accesorios (`Accesorios`), Comodidad (`Comodidad`), Tecnología de viaje (`Tecnología`); Imprescindibles = etiqueta `imprescindible`.
- Páginas: aviso-legal, politica-de-privacidad, politica-de-cookies, condiciones-generales-de-contratacion,
  politica-de-envios, politica-de-devoluciones-y-reembolsos, informacion-sobre-el-desistimiento,
  formulario-de-desistimiento, preguntas-frecuentes (plantilla faq), sobre-nosotros (plantilla sobre-nosotros), contacto (plantilla contacto).
- Menús: main-menu, atencion-al-cliente, maison, legal.
- Metacampos de producto: custom.materiales, custom.dimensiones, custom.cuidados, custom.detalles («Título | Texto»), custom.faq («Pregunta | Respuesta»).
- Fotos (Burst, licencia de uso comercial gratuita): md-hero-avion-nubes, md-cat-*, md-banner-atardecer, md-sobre-*, md-contacto-preparando-viaje.
- **PRODUCTO DE PRUEBA** (`producto-de-prueba`, etiquetas `prueba-borrar`): solo para revisar el diseño. BORRAR antes de abrir.

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
