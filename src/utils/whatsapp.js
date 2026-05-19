/**
 * Construye el mensaje de WhatsApp con el pedido del cliente.
 * @param {Array} items - Array de {producto, cantidad}
 * @param {number} total - Total a pagar
 * @returns {string} URL de WhatsApp listo para abrir
 */
export const buildWhatsAppUrl = (items, total) => {
  const WHATSAPP_NUMBER = '56988832514';

  let msg = '¡Hola! Vengo de la página web y me gustaría realizar el siguiente pedido:\n\n';

  items.forEach((item) => {
    const subtotal = item.producto.precio * item.cantidad;
    msg += `🥚 ${item.cantidad}x ${item.producto.nombre}\n`;
    msg += `   Subtotal: $${subtotal.toLocaleString('es-CL')}\n\n`;
  });

  msg += '──────────────────────────\n';
  msg += `💵 *Total a pagar: $${total.toLocaleString('es-CL')}*\n`;
  msg += '──────────────────────────\n\n';
  msg += 'Por favor, indícame la disponibilidad para coordinar el despacho. ¡Gracias! 🙏';

  const encoded = encodeURIComponent(msg);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
};

/**
 * Formatea un precio en pesos chilenos.
 * @param {number} precio
 * @returns {string}
 */
export const formatPrecio = (precio) =>
  `$${precio.toLocaleString('es-CL')}`;
