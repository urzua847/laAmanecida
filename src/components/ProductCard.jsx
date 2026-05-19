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

  const categoryLabel = producto.categoria === 'caja' ? '📦 Caja mayorista' : '🥚 Bandeja 30 u.';

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
          <div className="w-full h-full flex items-center justify-center text-6xl">🥚</div>
        )}

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-400/20">
          {categoryLabel}
        </span>

        {/* Caliber badge */}
        <span className="absolute top-3 right-3 bg-amber-500/90 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full">
          {producto.calibre}
        </span>

        {/* Disponible */}
        {!producto.disponible && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-400 font-bold text-lg">Sin stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-bold text-amber-100 text-lg leading-tight mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {producto.nombre}
          </h3>
          <p className="text-amber-100/55 text-sm leading-relaxed line-clamp-3">
            {producto.descripcion}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {formatPrecio(producto.precio)}
          </span>
          <span className="text-amber-100/40 text-xs">CLP</span>
        </div>

        {/* Quantity + Add */}
        <div className="flex items-center gap-3 mt-auto">
          {/* Qty selector */}
          <div className="flex items-center gap-0 bg-stone-800/60 border border-amber-500/20 rounded-xl overflow-hidden">
            <button
              id={`qty-dec-${producto.id}`}
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              className="qty-btn w-9 h-9 flex items-center justify-center text-amber-300 hover:text-amber-100 text-lg font-bold cursor-pointer"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="w-8 text-center text-sm font-semibold text-amber-100">{cantidad}</span>
            <button
              id={`qty-inc-${producto.id}`}
              onClick={() => setCantidad((c) => c + 1)}
              className="qty-btn w-9 h-9 flex items-center justify-center text-amber-300 hover:text-amber-100 text-lg font-bold cursor-pointer"
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
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              added
                ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                : 'bg-amber-500/10 border border-amber-500/40 hover:bg-amber-500/20 hover:border-amber-400 text-amber-300 hover:text-amber-100'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
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
