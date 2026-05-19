import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const FILTERS = [
  { label: 'Todos', value: 'all' },
  { label: '🥚 Bandejas', value: 'bandeja' },
  { label: '📦 Cajas', value: 'caja' },
];

export default function Catalog() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    fetch('/productos.json')
      .then((r) => r.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? productos
    : productos.filter((p) => p.categoria === filter);

  return (
    <section id="catalogo" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
          — Nuestros productos —
        </span>
        <h2 className="section-title text-4xl md:text-5xl text-white mb-5">
          Catálogo de{' '}
          <span className="gradient-text">Huevos Frescos</span>
        </h2>
        <p className="text-amber-100/60 text-lg max-w-xl mx-auto leading-relaxed">
          Selecciona el calibre y la cantidad que necesitas. Despachamos directamente a tu puerta.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-14 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            id={`filter-${f.value}`}
            onClick={() => setFilter(f.value)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              filter === f.value
                ? 'bg-amber-500 border-amber-500 text-stone-900'
                : 'bg-transparent border-amber-500/30 text-amber-300 hover:border-amber-400 hover:text-amber-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton rounded-2xl h-96" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-amber-100/50 py-20 text-lg">
          No hay productos en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((producto, i) => (
            <div
              key={producto.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
            >
              <ProductCard producto={producto} />
            </div>
          ))}
        </div>
      )}

      {/* Bottom note */}
      <p className="text-center text-amber-100/40 text-sm mt-14">
        💡 Los precios pueden variar. Consulta disponibilidad por WhatsApp.
      </p>
    </section>
  );
}
