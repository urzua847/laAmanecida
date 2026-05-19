// Fix: useState is imported at the bottom of the file which is invalid
// Rewrite CartDrawer to have all imports at top
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppUrl, formatPrecio } from '../utils/whatsapp';

const WA_SVG_LG = (
  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ── Cart Item sub-component ── */
function CartItem({ item, onUpdate, onRemove }) {
  const { producto, cantidad } = item;
  const subtotal = producto.precio * cantidad;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex gap-3 glass rounded-xl p-3.5">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-stone-800/60">
        {!imgError ? (
          <img src={producto.imagen} alt={producto.nombre} onError={() => setImgError(true)} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">🥚</div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-orange-100 text-sm font-bold leading-tight line-clamp-2 uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
            {producto.nombre}
          </p>
          <button onClick={() => onRemove(producto.id)} className="text-red-400/40 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0" aria-label="Eliminar">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-stretch bg-stone-800/60 border border-orange-500/20 rounded-lg overflow-hidden">
            <button onClick={() => { if (cantidad <= 1) onRemove(producto.id); else onUpdate(producto.id, cantidad - 1); }} className="qty-btn w-8 h-8 flex items-center justify-center text-orange-300 font-bold text-base cursor-pointer" aria-label="Menos">−</button>
            <span className="w-7 flex items-center justify-center text-xs font-bold text-orange-100 border-x border-orange-500/20" style={{ fontFamily: 'Oswald, sans-serif' }}>{cantidad}</span>
            <button onClick={() => onUpdate(producto.id, cantidad + 1)} className="qty-btn w-8 h-8 flex items-center justify-center text-orange-300 font-bold text-base cursor-pointer" aria-label="Más">+</button>
          </div>
          <span className="text-orange-200 font-bold text-sm" style={{ fontFamily: 'Oswald, sans-serif' }}>{formatPrecio(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Drawer ── */
export default function CartDrawer({ open, onClose }) {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 drawer-overlay animate-fade-in" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="fixed inset-y-0 right-0 z-50 flex flex-col w-full max-w-sm sm:max-w-md glass-dark shadow-2xl shadow-black/60 animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-orange-500/10 flex-shrink-0">
          <div>
            <h2 className="text-lg font-bold text-orange-100 uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
              🛒 Tu Pedido
            </h2>
            <p className="text-xs text-orange-300/50 mt-0.5">
              {totalItems === 0 ? 'Sin productos aún' : `${totalItems} producto${totalItems !== 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button onClick={clearCart} className="text-xs text-red-400/60 hover:text-red-400 transition-colors cursor-pointer font-medium px-2 py-1 rounded-lg hover:bg-red-500/10">
                Vaciar
              </button>
            )}
            <button id="cart-close-btn" onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-800/70 hover:bg-stone-700 text-orange-300/60 hover:text-orange-200 transition-all cursor-pointer" aria-label="Cerrar carrito">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items (scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <span className="text-6xl opacity-20">🛒</span>
              <p className="text-orange-100/50 text-base font-medium">Tu carrito está vacío</p>
              <p className="text-orange-100/30 text-sm">Agrega productos desde el catálogo</p>
              <button onClick={onClose} className="mt-2 text-orange-400 hover:text-orange-300 text-sm font-semibold cursor-pointer transition-colors underline underline-offset-2">
                Ver catálogo →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <CartItem key={item.producto.id} item={item} onUpdate={updateQuantity} onRemove={removeFromCart} />
              ))}
            </div>
          )}
        </div>

        {/* Footer (sticky) */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-orange-500/10 px-5 py-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-orange-100/60 text-sm font-medium">Total estimado</span>
              <span className="gradient-text text-2xl font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                {formatPrecio(totalPrice)}
              </span>
            </div>

            <button
              id="checkout-whatsapp-btn"
              onClick={() => { if (items.length) window.open(buildWhatsAppUrl(items, totalPrice), '_blank'); }}
              className="btn-whatsapp w-full h-14 rounded-2xl font-bold text-white flex items-center justify-center gap-3 cursor-pointer"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em', fontSize: '1rem', textTransform: 'uppercase' }}
            >
              {WA_SVG_LG}
              Enviar Pedido por WhatsApp
            </button>

            <p className="text-center text-orange-100/25 text-xs">
              Se abrirá WhatsApp con tu pedido · +56 9 8883 2514
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
