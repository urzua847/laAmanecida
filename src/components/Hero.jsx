import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Tiny delay so the animation plays on load
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={ref}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative amber glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-lg">🐔</span>
          <span className="text-amber-300 text-sm font-semibold tracking-wide uppercase">
            100% Huevos de Campo
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`section-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-none transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Huevos frescos{' '}
          <span className="gradient-text block sm:inline">de campo,</span>
          <span className="block mt-2 text-amber-100">directo a tu mesa.</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-amber-100/75 mb-10 font-light max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Repartos en{' '}
          <strong className="text-amber-300 font-semibold">Penco, Concepción</strong>{' '}
          y alrededores. Frescura garantizada desde el campo.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            id="hero-cta-catalog"
            onClick={scrollToCatalog}
            className="group relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(251,191,36,0.4)] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span>Ver Catálogo</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <a
            href="https://wa.me/56988832514"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-amber-400/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Consultar pedido
          </a>
        </div>

        {/* Stats */}
        <div
          className={`mt-20 flex flex-wrap justify-center gap-12 transition-all duration-700 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { icon: '🥚', value: '+7 calibres', label: 'disponibles' },
            { icon: '🚚', value: 'Despacho', label: 'a domicilio' },
            { icon: '🌿', value: 'Campo', label: '100% natural' },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-amber-300 font-bold text-lg leading-none">{stat.value}</p>
              <p className="text-amber-100/50 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-amber-400/50 text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
