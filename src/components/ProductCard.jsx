import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrecio } from '../utils/whatsapp';

export default function ProductCard({ producto }) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    addToCart(producto, cantidad);
    setAdded(true);
    setCantidad(1);
    setTimeout(() => setAdded(false), 1800);
  };

  const categoryLabel = producto.categoria === 'caja' ? '📦 Caja mayorista' : `📦 Caja ${producto.unidades || 30} u.`;

  return (
    <article className="product-card glass rounded-2xl overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-64 bg-stone-900/50">
        {!imgError ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={() => setImgError(true)}
            className="card-image w-full h-full object-cover transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl">🥚</div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-black/65 backdrop-blur-sm text-orange-300 text-xs font-bold px-3 py-1 rounded-full border border-orange-400/20"
          style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
          {categoryLabel}
        </span>

        {/* Caliber badge — brand orange */}
        <span
          className="absolute top-3 right-3 price-tag text-white text-xs px-3 py-1 rounded-full"
          style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em' }}
        >
          {producto.calibre}
        </span>

        {/* Sin stock overlay */}
        {!producto.disponible && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-400 font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>SIN STOCK</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3
            className="font-bold text-orange-100 text-xl leading-tight mb-2 uppercase tracking-wide"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            {producto.nombre}
          </h3>
          <p className="text-orange-100/55 text-sm leading-relaxed line-clamp-3">
            {producto.descripcion}
          </p>
        </div>

        {/* Price tag — estilo de la marca */}
        <div className="flex items-end gap-2">
          <div className="price-tag rounded-xl px-4 py-2 flex items-baseline gap-1.5">
            <span
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
            >
              {formatPrecio(producto.precio)}
            </span>
          </div>
          <span className="text-orange-100/40 text-xs pb-2">
            Caja {producto.unidades} u.
          </span>
        </div>

        {/* Precio escalonado si existe */}
        {producto.precioEscalonado && (
          <div className="glass-warm rounded-xl p-3 flex flex-col gap-1.5">
            <p className="text-orange-300 text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Precio por volumen
            </p>
            {producto.precioEscalonado.map((e) => (
              <div key={e.rango} className="flex justify-between items-center">
                <span className="text-orange-100/60 text-xs">{e.rango}</span>
                <span className="text-orange-300 text-sm font-bold" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {formatPrecio(e.precio)}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Quantity + Add */}
        <div className="flex items-center gap-3 mt-auto">
          {/* Qty selector */}
          <div className="flex items-center gap-0 bg-stone-800/60 border border-orange-500/25 rounded-xl overflow-hidden">
            <button
              id={`qty-dec-${producto.id}`}
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="qty-btn w-10 h-10 flex items-center justify-center text-orange-300 hover:text-orange-100 text-xl font-bold cursor-pointer"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span
              className="w-9 text-center text-base font-bold text-orange-100"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {cantidad}
            </span>
            <button
              id={`qty-inc-${producto.id}`}
              onClick={() => setCantidad((c) => c + 1)}
              className="qty-btn w-10 h-10 flex items-center justify-center text-orange-300 hover:text-orange-100 text-xl font-bold cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            id={`add-cart-${producto.id}`}
            onClick={handleAdd}
            disabled={!producto.disponible}
            className={`flex-1 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 uppercase ${
              added
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'btn-brand text-white'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.06em' }}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                ¡Agregado!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
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
