import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrecio } from '../utils/whatsapp';

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [added,    setAdded]    = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addToCart(producto, cantidad);
    setAdded(true);
    setCantidad(1);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="product-card glass rounded-2xl overflow-hidden flex flex-col h-full">

      {/* ── Image ── */}
      <div className="relative overflow-hidden h-56 sm:h-64 flex-shrink-0 bg-stone-900/60">
        {!imgError ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() => setImgError(true)}
            className="card-image w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">🥚</div>
        )}

        {/* Top-left: units badge */}
        <span
          className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-orange-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-orange-400/20 uppercase tracking-wide"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          📦 {producto.unidades || 30} unidades
        </span>

        {/* Top-right: caliber tag */}
        <span
          className="absolute top-3 right-3 price-tag text-white text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wide"
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          {producto.calibre}
        </span>

        {/* Out of stock */}
        {!producto.disponible && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-400 font-bold text-xl uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Sin Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1 gap-4">

        {/* Name + description */}
        <div className="flex-shrink-0">
          <h3
            className="text-orange-100 font-bold text-xl leading-tight uppercase mb-2"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.04em' }}
          >
            {producto.nombre}
          </h3>
          <p className="text-orange-100/50 text-sm leading-relaxed line-clamp-2">
            {producto.descripcion}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="price-tag rounded-xl px-4 py-2.5 flex-shrink-0">
            <span
              className="text-2xl font-bold text-white leading-none"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
            >
              {formatPrecio(producto.precio)}
            </span>
          </div>
          <span className="text-orange-100/35 text-xs leading-tight">
            caja<br />{producto.unidades} u.
          </span>
        </div>

        {/* Scaled pricing (Primera Blanco) */}
        {producto.precioEscalonado && (
          <div className="glass-warm rounded-xl p-3.5 flex-shrink-0">
            <p
              className="text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-2"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              Descuento por volumen
            </p>
            <div className="flex flex-col gap-1.5">
              {producto.precioEscalonado.map((e) => (
                <div key={e.rango} className="flex items-center justify-between">
                  <span className="text-orange-100/55 text-xs">{e.rango}</span>
                  <span
                    className="text-orange-200 font-bold text-sm"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    {formatPrecio(e.precio)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Actions ── */}
        <div className="mt-auto flex items-center gap-2.5">

          {/* Quantity control */}
          <div
            className="flex items-stretch bg-stone-800/70 border border-orange-500/20 rounded-xl overflow-hidden flex-shrink-0"
            role="group"
            aria-label="Cantidad"
          >
            <button
              id={`qty-dec-${producto.id}`}
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="qty-btn w-10 h-11 flex items-center justify-center text-orange-300 hover:text-white text-xl font-bold cursor-pointer"
              aria-label="Restar"
            >
              −
            </button>
            <span
              className="w-9 flex items-center justify-center text-sm font-bold text-orange-100 border-x border-orange-500/20"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {cantidad}
            </span>
            <button
              id={`qty-inc-${producto.id}`}
              onClick={() => setCantidad((c) => c + 1)}
              className="qty-btn w-10 h-11 flex items-center justify-center text-orange-300 hover:text-white text-xl font-bold cursor-pointer"
              aria-label="Sumar"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            id={`add-cart-${producto.id}`}
            onClick={handleAdd}
            disabled={!producto.disponible}
            className={`flex-1 h-11 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer uppercase tracking-wide ${
              added
                ? 'bg-green-500/15 border border-green-500/40 text-green-400'
                : 'btn-brand text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em' }}
          >
            {added ? (
              <>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                ¡Agregado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
