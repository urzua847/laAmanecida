import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const FILTERS = [
  { label: 'Todos',    value: 'all'  },
  { label: '📦 100 u.', value: '100u' },
  { label: '📦 180 u.', value: '180u' },
];

export default function Catalog() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    fetch('./productos.json')
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
        <div className="brand-divider justify-center mb-5">
          <span
            className="text-orange-400 text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            Lista de Precios
          </span>
        </div>
        <h2
          className="text-white mb-5 uppercase"
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '0.04em' }}
        >
          Catálogo de{' '}
          <span className="gradient-text">Huevos Frescos</span>
        </h2>
        <p className="text-orange-100/60 text-lg max-w-xl mx-auto leading-relaxed">
          Huevos de campo por calibre. Selecciona la cantidad y coordina tu despacho directo a domicilio.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-14 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            id={`filter-${f.value}`}
            onClick={() => setFilter(f.value)}
            className={`px-6 py-2.5 rounded-full font-bold border transition-all duration-200 cursor-pointer tracking-wide ${
              filter === f.value
                ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30'
                : 'bg-transparent border-orange-500/30 text-orange-300 hover:border-orange-400 hover:text-orange-200'
            }`}
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton rounded-2xl h-[480px]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-orange-100/50 py-20 text-lg">
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
      <div className="text-center mt-14">
        <p className="text-orange-100/40 text-sm">
          💡 Valores en local Villa Cap y San Pedro. Precios pueden variar según disponibilidad.
        </p>
        <a
          href="https://wa.me/56988832514"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-green-400 hover:text-green-300 font-semibold text-sm transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar precios actualizados por WhatsApp
        </a>
      </div>
    </section>
  );
}
