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

Consulta del 17/11/2026 con la API oficial de CJdropshipping. El detalle, con SKU, enlaces, stock y envío, está en el Excel interno (hoja «CJdropshipping»), que no se sube a GitHub. En Shopify, cada producto guarda su referencia en el metacampo `proveedor.referencia`.

**Localizados (10):**
- Por SKU: Nécessaire Double, Mini Vanity, Travel Pouch y Cable Organizer.
- Por nombre y precio de referencia exacto (conviene confirmarlo): Packing Cubes 8 piezas, Packing Cubes 6 piezas, Aluminium Trolley y Foldable Travel Bag.
- Elegidos por ti entre candidatos del catálogo de CJ (17/11/2026): Dental Travel Case (estuche blanco con detalles dorados, también en verde) y Toothbrush Travel Set (estuche que se convierte en vaso, en oro rosa o plata). Ninguno incluye cepillo.

**Pendientes de localizar (2):** Signature Luggage Set y Travel Backpack. Hace falta el enlace o el SKU de CJ de cada uno (también se lo hemos pedido a CJ en el ticket).

**En la tienda (que sigue cerrada con contraseña):**
- **Activos, con fotos reales del proveedor:** Nécessaire Double, Travel Pouch, Packing Cubes 8 piezas (beige, gris y negro), Cable Organizer (gris y negro) y Aluminium Trolley (negro y plata, 20" y 22").
- **Activo sin fotos:** Signature Luggage Set (no localizado).
- **En borrador:**
  - Mini Vanity: lleva una placa con la marca «Shell Bags».
  - Packing Cubes 6 piezas: solo existe con estampados.
  - Foldable Travel Bag: es una bolsa deportiva con franjas de color.
  - Dental Travel Case: con fotos del proveedor, pero el estuche lleva impreso el logo «MUDU» del fabricante. Pedido a CJ que lo quite y ponga el monograma MD.
  - Toothbrush Travel Set: con fotos del proveedor (algunas llevan textos del fabricante en inglés). Falta el precio.
  - Travel Backpack: sin localizar.

1. [ ] **Confirmar la variante del Nécessaire Double.** El SKU indicado es la versión de una capa; en la tienda está puesta la de dos capas, que encaja con el nombre.
2. [ ] **Pasar el enlace o el SKU de CJ** del Signature Luggage Set y del Travel Backpack. Ya se lo hemos pedido a CJ en el ticket T202611171041277601.
3. [ ] **Logo MAISON DUVAL**: ninguno de los productos localizados figura en CJ como personalizable. Pregunta a tu agente de CJ por placa, etiqueta o embalaje con logo y por su pedido mínimo. Hasta tener respuesta, la tienda no dice que lleven logo.
4. [ ] **Productos con marca o textos del fabricante:**
   - Mini Vanity: placa «Shell Bags».
   - Packing Cubes 8 piezas: frase impresa «Wish U have a colorful life».
   - Dental Travel Case: emblema redondo «MUDU» en el frente.

   Pide a CJ una versión neutra o con tu marca, o busca alternativas.
5. [ ] **Alternativas para lo que no encaja con la marca**: unos packing cubes de 6 piezas lisos y en tonos neutros, y una bolsa plegable minimalista.
6. [ ] **Fotos**: las del proveedor son correctas, pero no son de marca premium (fondo blanco y poca variedad). Lo ideal es una sesión propia con muestras.
7. [ ] **Precios**: se revisan después, con los costes reales. Ojo: el Aluminium Trolley pesa 4,9 kg y su envío a España ronda los 100–120 USD.
8. [ ] **Conectar la app de CJdropshipping con Shopify.** Las variantes ya llevan el SKU de CJ para enlazarlas. Cuando el stock esté sincronizado, puedes volver a mostrar el filtro de disponibilidad.
9. [ ] **Filtros por color y categoría**: instala la app gratuita **Search & Discovery** y activa los filtros «Tipo de producto» y «Color».
10. [ ] **Etiquetas «Bestseller» o «New»**: añade la etiqueta `etiqueta:bestseller` o `etiqueta:new` al producto, solo cuando esté justificado.
11. [ ] **Travel Care** está oculta hasta que tenga productos activos.
12. [ ] **Reseñas**: instala una app de valoraciones. Las estrellas solo aparecerán con opiniones reales.

## 6. Personalización con el logo (propuestas)

La guía de personalización v1 (12 fichas con bocetos) y la petición para CJ en inglés se han entregado por el chat. No se suben a GitHub porque contienen los logotipos y las referencias del proveedor.

1. [ ] **Fijar la tipografía del logo** y obtenerlo en vectores con el texto convertido en trazos. Los PNG actuales usan una fuente de sustitución; la web usa Cormorant.
2. [x] **Enviado a CJ** el 17/11/2026: ticket **T202611171041277601** (Service Consultation → Products & Package Customization), con la petición de personalización, la búsqueda de los 4 productos que faltan y las 7 páginas adjuntas. Estado: esperando respuesta de CJ. Puedes verlo en CJ → Tickets.
3. [ ] Con la respuesta de CJ, marcar en cada ficha si la personalización es «técnicamente posible» y si está «confirmada por CJ».
4. [ ] Pedir y aprobar una **muestra física** de cada producto personalizado.
5. [ ] **No poner fotos con el logo en la tienda** hasta tener la muestra aprobada. Después: sesión de fotos (6 imágenes por producto) con las muestras reales.

## 5. Antes de quitar la contraseña

1. [ ] Publicar el tema MAISON DUVAL (Tienda online → Temas → Publicar), cuando des el visto bueno.
2. [ ] Hacer un pedido de prueba con el modo de prueba de pagos: carrito, descuento, pago, correo de confirmación y devolución.
3. [ ] Revisar desde el móvil: menú, carrito y formularios.
4. [ ] Añadir las redes sociales en Configuración del tema → Redes sociales.
5. [ ] Si quieres ofrecer un descuento por suscribirte a la newsletter, crea primero el código real y luego escribe el texto en la sección Newsletter.
