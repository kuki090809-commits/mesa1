# Ajusta — tema Shopify

Tema Online Store 2.0 construido a partir del patrón visual de la demo
"Hurricane" de themedrop.app (marquesina de confianza, hero con tarjeta de
precio flotante, doble marquesina de palabras/distintivos, cuadrícula de
beneficios numerada, producto destacado y ficha técnica), reconstruido desde
cero en Liquid y aplicado a la marca y el producto reales de Ajusta (Taza
Medidora Ajustable 4-en-1).

Validado con `shopify theme check`: 0 errores. Quedan 4 avisos esperados
(`RemoteAsset`) por cargar las tipografías de marca (Anton + Inter) desde
Google Fonts en lugar del CDN de Shopify — es una decisión de diseño
deliberada, no un fallo.

## Instalar en Shopify

**Opción A — Panel de administración (sin instalar nada):**
1. Comprime el contenido de esta carpeta (no la carpeta en sí) en un `.zip`.
   Es decir: selecciona `layout/`, `templates/`, `sections/`, `snippets/`,
   `assets/`, `config/`, `locales/` y comprímelos juntos, para que
   `layout/theme.liquid` quede en la raíz del zip.
2. Admin de Shopify → **Tienda online** → **Temas** → **Añadir tema** →
   **Subir archivo zip**.
3. En el tema subido, pulsa **Personalizar** para elegir el producto real en
   la sección "Producto destacado" de la home (y ajustar colores en
   Configuración del tema → Colores).

**Opción B — Shopify CLI (recomendado si vas a seguir editándolo):**
```bash
npm install -g @shopify/cli
shopify theme dev --store tu-tienda.myshopify.com   # previsualización en local
shopify theme push --store tu-tienda.myshopify.com  # publicar
```

## Qué configurar antes de publicar

- **Home** (personalizador → Home):
  - Sección "Hero": sube la foto real del producto, y opcionalmente
    selecciona el producto en "Producto para la tarjeta de precio".
  - Sección "Producto destacado": selecciona el producto real (Taza
    Medidora Ajustable 4-en-1).
  - Secciones "Hero" y "Producto destacado" tienen un campo de valoración
    (0 = oculta la fila de estrellas). Dejado en 0 a propósito — actívalo
    solo cuando tengas reseñas reales.
- **Menús**: crea los menús `main-menu` (Inicio / Producto / Tienda) y
  `footer` (Envíos / Devoluciones / Contacto) en Admin → Tienda online →
  Navegación; el tema ya los referencia por su handle.
- **Página de producto**: si el producto tiene varias fotos, se muestran
  automáticamente en miniaturas. El precio tachado y el badge de descuento
  solo aparecen si configuras un "Precio de comparación" real en la
  variante — el tema no inventa descuentos.
- **Pagos**: la fila de iconos de pago (`payment-icons`) se genera sola a
  partir de los métodos que actives en Shopify Payments — no hay que
  subir logos.

## Estructura

```
layout/theme.liquid        Documento HTML base, fuentes, CSS/JS globales
templates/                 Una entrada JSON por tipo de página
sections/                  Header, hero, marquesina, beneficios, producto
                            destacado, ficha técnica, producto, carrito,
                            footer y páginas simples (404/página/búsqueda...)
snippets/                  Iconos SVG en línea, precio, tarjeta de producto
assets/base.css            Todos los estilos (tokens de color en :root,
                            editables desde Configuración del tema)
assets/theme.js            Menú móvil, selector de variante, stepper de
                            cantidad, galería de miniaturas
config/settings_schema.json  Ajustes globales del personalizador
locales/es.default.json    Textos de interfaz en español
```

## Limitaciones conocidas

- No hay fotos reales del producto incluidas (no se generaron ni se
  copiaron de otras fichas, por derechos de autor) — hay que subirlas en
  el personalizador.
- El carrito es una página (`/cart`), no un cajón lateral con JavaScript,
  para mantenerlo simple y fiable sin una tienda de desarrollo donde
  probarlo en vivo.
- Validado de forma estática (JSON + `shopify theme check`); no se ha
  probado en una tienda Shopify en vivo porque este entorno no tiene una
  tienda de desarrollo disponible.
