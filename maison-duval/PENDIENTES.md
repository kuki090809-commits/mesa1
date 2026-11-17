# MAISON DUVAL — Auditoría y tareas pendientes para publicar

Fecha de la revisión: 16/11/2026. El tema **MAISON DUVAL** está subido a la tienda **sin publicar**.

## 1. Resultado de la auditoría

| Área | Resultado | Detalle |
|---|---|---|
| Enlaces | ✅ | 0 enlaces internos rotos: todas las páginas, colecciones y menús apuntan a páginas que existen. |
| Navegación | ✅ | Menú principal con desplegable «Tienda», menú móvil, 3 menús en el pie y migas de pan en las colecciones. |
| Formularios | ✅ con pendiente | Contacto (nativo de Shopify, llega al correo de la tienda), newsletter con casilla de consentimiento obligatoria y separada, y preferencias de cookies. **Falta configurar el correo de la tienda.** |
| Carrito | ✅ con pendiente | Carrito lateral y página de carrito con barra de envío gratuito y recomendaciones. Pago 100 % de Shopify (sin pagos simulados). **No se ha podido hacer una compra de prueba completa:** la tienda está bloqueada con contraseña y no tiene métodos de pago. |
| Accesibilidad (WCAG 2.2 AA) | ✅ | Contraste de textos entre 4,6:1 y 8,6:1. Se corrigieron el precio tachado, las estrellas y los iconos, que no llegaban. Foco visible, etiquetas en todos los campos, iconos ocultos a lectores de pantalla y animaciones desactivadas si el usuario lo pide. **Pendiente: idioma principal en español** (ahora la web se anuncia como inglés a los lectores de pantalla). |
| Rendimiento | ✅ | Imágenes adaptadas a cada pantalla y con carga diferida (la de portada, con prioridad). Un CSS y un JS propios (~15 KB) y ninguna librería externa. Fuentes servidas por Shopify. |
| Privacidad | ✅ con pendiente | Banner con «Aceptar todas» y «Rechazar no necesarias» del mismo tamaño, más «Configurar». Ninguna casilla viene marcada y se puede reabrir desde el pie. Usa la API de privacidad de Shopify: los píxeles de Shopify esperan al consentimiento. **Revisar que no salgan dos banners y que las apps que instales respeten el consentimiento.** |
| SEO | ✅ | Títulos y descripciones propios en páginas y colecciones. Datos estructurados de producto, organización, migas de pan y preguntas frecuentes. Sitemap y robots automáticos de Shopify, sin tocar. No se ha añadido ningún archivo para agentes de IA. |
| Honestidad | ✅ | Ni valoraciones, ni materiales, ni medidas inventadas: solo aparecen si se rellenan. El envío gratuito y los días de devolución salen de un único ajuste. No se promete «24/7». La newsletter no ofrece descuento. |

## 2. Datos que necesito de ti (63 campos `[PENDIENTE]`)

- [ ] Titular: nombre y apellidos o razón social
- [ ] NIF / NIE / CIF
- [ ] Domicilio completo
- [ ] Correo de atención al cliente (y de privacidad, si es otro)
- [ ] Teléfono (opcional)
- [ ] Datos del Registro Mercantil (solo si es una sociedad)
- [ ] Destinos de envío, tarifas y plazos por zona
- [ ] Transportistas y proveedores que preparan y envían los pedidos
- [ ] Métodos de pago que vas a activar
- [ ] Herramientas de analítica, publicidad y email marketing (si usas alguna)
- [ ] Confirmar: envío gratuito desde **50 €** y devoluciones en **30 días**
- [ ] Quién paga la devolución: tú o el cliente
- [ ] Si estás adherido a un sistema de resolución de litigios de consumo (o indicar que no)
- [ ] Horario de atención y plazo habitual de respuesta
- [ ] Fecha de publicación de los textos legales

## 3. Configuración en Shopify (antes de abrir)

1. [ ] **Guardar la tienda en tu cuenta de Shopify.** Hasta entonces, cualquiera con la dirección puede verla y editarla.
2. [ ] **Idioma principal: español** (Configuración → Idiomas). Arregla los filtros en inglés («Availability», «Most relevant»), el idioma del pago y de los correos, y la accesibilidad.
3. [ ] **Formato de precio «39,00 €»** (Configuración → General → Moneda → Cambiar formato: `{{amount_with_comma_separator}} €`).
4. [ ] **Envíos**: crear tarifas que coincidan con lo que anuncia la web (envío gratuito desde 50 € o el importe que elijas). El importe se cambia en Personalizar tema → Configuración del tema → MAISON DUVAL · Tienda; si lo vacías, el anuncio desaparece de toda la web.
5. [ ] **Pagos**: activar Shopify Payments o PayPal y completar los datos fiscales.
6. [ ] **Impuestos**: IVA de España. Si vendes a otros países de la UE por más de 10 000 €/año, darte de alta en la ventanilla única (OSS).
7. [ ] **Correo de la tienda** (Configuración → General): ahí llegan los mensajes del formulario de contacto.
8. [ ] **Privacidad del cliente** (Configuración → Privacidad del cliente): usa **un solo** banner. Si activas el de Shopify, desactiva el del tema (Configuración del tema → MAISON DUVAL · Tienda).
9. [ ] **Revisión jurídica profesional** de las 8 páginas legales antes de publicarlas.

## 4. Catálogo de productos (The Travel Collection)

Estado actual: **12 productos creados**. 9 están visibles en la tienda, que sigue cerrada con contraseña. Otros 3 están en borrador porque no tienen precio de proveedor: Travel Backpack, Dental Travel Case y Toothbrush Travel Set. Todos llevan las etiquetas `pendiente-verificar` y `sin-fotos-reales`.

1. [ ] **Fotos reales.** Ningún producto tiene fotos todavía. En su lugar se ve un hueco de marca que dice «Fotografía en preparación»: no hay imágenes inventadas ni generadas. Opciones:
   - Pásame el **enlace o SKU de CJdropshipping** de cada producto y subo sus fotos si tienen calidad suficiente.
   - O pide muestras y haz una sesión de fotos (piedra clara, lino, hotel, maleta abierta). Conviene hacerla con el logo, si el proveedor lo permite.
2. [ ] **Datos que faltan por producto.** Están en la hoja «Estado de los datos» del Excel interno: colores reales, medidas, materiales, capacidad, peso y plazos.
3. [ ] **Logo MAISON DUVAL en los productos.** Pregunta a CJ si permite bordado, grabado, etiqueta o placa en pedidos de una unidad. Hasta confirmarlo, ningún texto de la tienda dice que los productos lleven el logo.
4. [ ] **Signature Luggage Set**: confirmar si incluye batería para el puerto USB (normalmente no) y el coste real del envío. Es lo que más cambia su margen.
5. [ ] **Aluminium Trolley**: confirmar colores y tamaño (¿cabina?). No se ha puesto ningún color.
6. [ ] **Precios**: son orientativos. Revisa el Excel interno con los costes reales de CJ (producto + envío) antes de abrir la tienda.
7. [ ] **Conectar CJdropshipping** con su app oficial de Shopify. Así los pedidos se envían solos y el stock se sincroniza. Cuando el stock sea real, puedes volver a mostrar el filtro de disponibilidad (Personalizar tema → Configuración del tema → MAISON DUVAL · Tienda).
8. [ ] **Filtros por color y categoría**: instala la app gratuita **Search & Discovery** y activa los filtros «Tipo de producto» y «Color». Ahora solo hay filtro de precio y la barra de categorías.
9. [ ] **Etiquetas «Bestseller» o «New»**: el tema está preparado. Añade al producto la etiqueta `etiqueta:bestseller` o `etiqueta:new`, pero solo cuando esté justificado (ventas reales o lanzamiento reciente).
10. [ ] **Travel Care** está oculta en la portada y en la barra de categorías hasta que tenga productos activos. Aparecerá sola cuando actives el Dental Travel Case o el Toothbrush Travel Set.
11. [ ] Peso de cada producto (lo necesitan las tarifas de envío) y país de origen, si vas a indicarlo.
12. [ ] Reseñas: instala una app de valoraciones. Las estrellas solo aparecerán con opiniones reales.

## 5. Antes de quitar la contraseña

1. [ ] Publicar el tema MAISON DUVAL (Tienda online → Temas → Publicar), cuando des el visto bueno.
2. [ ] Hacer un pedido de prueba con el modo de prueba de pagos: carrito, descuento, pago, correo de confirmación y devolución.
3. [ ] Revisar desde el móvil: menú, carrito y formularios.
4. [ ] Añadir las redes sociales en Configuración del tema → Redes sociales.
5. [ ] Si quieres ofrecer un descuento por suscribirte a la newsletter, crea primero el código real y luego escribe el texto en la sección Newsletter.
