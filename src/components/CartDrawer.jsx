import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, formatPrecio } from '../utils/whatsapp';

export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const drawerRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleWhatsApp = () => {
    if (items.length === 0) return;
    const url = buildWhatsAppUrl(items, totalPrice);
    window.open(url, '_blank');
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 drawer-overlay animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col glass-dark shadow-2xl animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-amber-500/10">
          <div>
            <h2 className="text-lg font-bold text-amber-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
              🛒 Tu Carrito
            </h2>
            <p className="text-xs text-amber-400/60 mt-0.5">
              {totalItems === 0
                ? 'Vacío'
                : `${totalItems} producto${totalItems !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-red-400/70 hover:text-red-400 transition-colors cursor-pointer underline underline-offset-2"
              >
                Vaciar
              </button>
            )}
            <button
              id="cart-close-btn"
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-800/60 hover:bg-stone-700/60 text-amber-300/70 hover:text-amber-200 transition-all cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16 gap-4">
              <div className="text-7xl opacity-30">🛒</div>
              <p className="text-amber-100/50 text-base">Tu carrito está vacío</p>
              <p className="text-amber-100/30 text-sm">Agrega productos desde el catálogo</p>
              <button
                onClick={onClose}
                className="mt-4 text-amber-400 hover:text-amber-300 text-sm font-semibold cursor-pointer underline underline-offset-2"
              >
                Ver catálogo →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.producto.id}
                item={item}
                onUpdate={updateQuantity}
                onRemove={removeFromCart}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-amber-500/10 px-6 py-5 flex flex-col gap-4">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-amber-100/70 text-sm font-medium">Total estimado</span>
              <span className="text-2xl font-extrabold gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {formatPrecio(totalPrice)}
              </span>
            </div>

            {/* WhatsApp CTA */}
            <button
              id="checkout-whatsapp-btn"
              onClick={handleWhatsApp}
              className="btn-whatsapp w-full py-4 rounded-2xl font-bold text-white text-base flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar pedido por WhatsApp
            </button>

            <p className="text-center text-amber-100/30 text-xs">
              Se abrirá WhatsApp con tu pedido listo para enviar
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

// ── Cart Item Sub-component ────────────────────────────────────────────────
function CartItem({ item, onUpdate, onRemove }) {
  const { producto, cantidad } = item;
  const subtotal = producto.precio * cantidad;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-4 glass rounded-xl p-3">
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-stone-800/50">
        {!imgError ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🥚</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-amber-100 text-sm font-semibold leading-tight line-clamp-2 mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {producto.nombre}
        </p>
        <p className="text-amber-300 text-xs font-medium mb-2">
          {formatPrecio(producto.precio)} c/u
        </p>

        {/* Qty controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0 bg-stone-800/60 border border-amber-500/20 rounded-lg overflow-hidden">
            <button
              onClick={() => {
                if (cantidad <= 1) onRemove(producto.id);
                else onUpdate(producto.id, cantidad - 1);
              }}
              className="qty-btn w-7 h-7 flex items-center justify-center text-amber-300 font-bold text-base cursor-pointer"
              aria-label="Disminuir"
            >
              −
            </button>
            <span className="w-7 text-center text-xs font-semibold text-amber-100">{cantidad}</span>
            <button
              onClick={() => onUpdate(producto.id, cantidad + 1)}
              className="qty-btn w-7 h-7 flex items-center justify-center text-amber-300 font-bold text-base cursor-pointer"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>

          <span className="flex-1 text-right text-sm font-bold text-amber-200">
            {formatPrecio(subtotal)}
          </span>

          <button
            onClick={() => onRemove(producto.id)}
            className="text-red-400/50 hover:text-red-400 transition-colors cursor-pointer ml-1"
            aria-label="Eliminar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
