import { useState } from 'react';

const FORMATOS = [
  {
    id: 'bandeja',
    titulo: 'La Bandeja Familiar',
    subtitulo: 'Consumo Diario & Frescura Garantizada',
    cantidad: '30 Unidades',
    imagen: './images/bandeja_huevos_campo.png',
    descripcion: 'Nuestra bandeja de cartón rústico contiene 30 huevos seleccionados uno a uno. Es ideal para hogares, asegurando una rotación rápida y máxima frescura en cada comida. Gallinas criadas 100% en libertad.',
    caracteristicas: [
      'Cartón absorbente 100% biodegradable',
      'Huevos seleccionados a mano por calibre',
      'Frescura óptima directa del nido',
      'Perfecto para almacenamiento en despensa'
    ],
    badge: 'Más Popular en Hogares',
    colorTheme: 'from-orange-500/20 to-amber-600/5 border-orange-500/30'
  },
  {
    id: 'caja',
    titulo: 'La Caja de Distribución',
    subtitulo: 'Ideal para Negocios, Repostería & Familias Grandes',
    cantidad: '100 o 180 Unidades',
    imagen: './images/caja_huevos_distribucion.png',
    descripcion: 'Caja de cartón ultra-resistente diseñada para el transporte seguro de huevos de campo. Contiene bandejas apiladas de manera compacta, reduciendo el riesgo de rotura. Perfecta para almacenes, panaderías, pastelerías y familias de alto consumo.',
    caracteristicas: [
      'Caja reforzada para transporte pesado',
      'Contiene bandejas interiores de 30 unidades',
      'Precios preferenciales y escalonados',
      'Fácil apilamiento y almacenamiento a gran escala'
    ],
    badge: 'Formato Mayorista / Comercial',
    colorTheme: 'from-amber-600/20 to-yellow-600/5 border-amber-500/30'
  }
];

export default function Formats() {
  const [activeTab, setActiveTab] = useState('bandeja');

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeFormat = FORMATOS.find(f => f.id === activeTab);

  return (
    <section id="formatos" className="relative py-28 lg:py-36 overflow-hidden bg-stone-950/40">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-orange-950/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className="text-orange-400 text-sm font-bold tracking-widest uppercase"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            ¿Cómo entregamos tus huevos?
          </span>
          <h2 
            className="text-white mt-3 uppercase leading-tight"
            style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '0.04em' }}
          >
            Formatos de <span className="gradient-text">Venta & Despacho</span>
          </h2>
          <p className="text-orange-100/60 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Diseñamos nuestras presentaciones para adaptarnos a las necesidades de cada cliente, garantizando la máxima seguridad y frescura en cada entrega.
          </p>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          {FORMATOS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 cursor-pointer flex flex-col items-center sm:items-start min-w-[160px] sm:min-w-[220px] ${
                activeTab === f.id
                  ? 'bg-gradient-to-br from-orange-500 to-amber-600 border border-orange-400 text-white shadow-xl shadow-orange-500/20'
                  : 'bg-stone-900/60 border border-orange-500/10 text-orange-200/60 hover:text-orange-200 hover:border-orange-500/30'
              }`}
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}
            >
              <span className="text-[10px] uppercase tracking-widest text-orange-200/70 mb-1">
                Formato
              </span>
              <span className="text-lg leading-tight uppercase font-semibold">
                {f.id === 'bandeja' ? '🥚 Bandeja (30u)' : '📦 Caja (100u / 180u)'}
              </span>
            </button>
          ))}
        </div>

        {/* Format Content Card */}
        {activeFormat && (
          <div 
            className={`glass bg-gradient-to-br ${activeFormat.colorTheme} rounded-3xl p-6 sm:p-10 lg:p-14 transition-all duration-500 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center shadow-2xl`}
          >
            
            {/* Left Column: Image with premium frame */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md sm:max-w-lg">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl bg-stone-900">
                  <img
                    src={activeFormat.imagen}
                    alt={activeFormat.titulo}
                    className="w-full h-full object-cover animate-fade-in hover:scale-103 transition-transform duration-700"
                  />
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge floating on image */}
                  <div className="absolute top-4 left-4 bg-orange-500/90 text-white text-[10px] tracking-widest font-black py-1.5 px-3.5 rounded-full uppercase shadow-md backdrop-blur-sm">
                    {activeFormat.badge}
                  </div>
                </div>
                {/* Decorative border offset */}
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl border border-orange-500/20 pointer-events-none -z-10 shadow-lg" />
              </div>
            </div>

            {/* Right Column: Descriptions & Details */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 text-left">
              <div>
                <span className="text-orange-400 font-bold text-xs uppercase tracking-widest block mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  {activeFormat.subtitulo}
                </span>
                <h3 
                  className="text-white font-extrabold text-3xl sm:text-4xl uppercase leading-none"
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em' }}
                >
                  {activeFormat.titulo}
                </h3>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-300 font-extrabold px-4 py-1.5 rounded-xl mt-4 text-sm tracking-wider uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  <span>Formato:</span>
                  <span className="text-white">{activeFormat.cantidad}</span>
                </div>
              </div>

              <p className="text-orange-100/75 text-base sm:text-lg leading-relaxed font-normal">
                {activeFormat.descripcion}
              </p>

              {/* Technical Features List */}
              <div className="flex flex-col gap-3 mt-2 border-t border-orange-500/10 pt-6">
                <h4 className="text-orange-200 text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  Detalles del Empaque:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeFormat.caracteristicas.map((char, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-orange-100/50 text-sm leading-snug">
                      <span className="text-orange-400 mt-0.5 flex-shrink-0">✔</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Inside Card */}
              <div className="mt-4 pt-4">
                <button
                  onClick={scrollToCatalog}
                  className="btn-brand flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl cursor-pointer w-full sm:w-auto"
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.9rem' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Comprar en este Formato
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
