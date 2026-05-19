import { useEffect, useState } from 'react';

const WA_SVG = (
  <svg className="w-5 h-5 text-green-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cls = (extra = '') =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${extra}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./images/hero-bg.png')" }}
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-600/8 blur-3xl pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 flex flex-col items-center text-center gap-6">

        {/* Floating logo */}
        <div className={cls('delay-100')}>
          <img
            src="./images/logo.png"
            alt="Logo La Amanecida"
            className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full drop-shadow-2xl animate-logo-float mx-auto bg-white border-2 border-orange-500/25 p-1 shadow-xl shadow-orange-500/10"
          />
        </div>

        {/* Eyebrow badge */}
        <div className={cls('delay-100')}>
          <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/30 rounded-full px-5 py-2 text-orange-300 font-bold text-xs sm:text-sm tracking-widest uppercase"
            style={{ fontFamily: 'Oswald, sans-serif' }}>
            🐔 Huevos Frescos · Calidad que se Nota
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`${cls('delay-200')} text-white leading-none`}
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          Directo del{' '}
          <span className="gradient-text">campo</span>
          <br />
          <span style={{ fontSize: '0.7em', color: 'rgba(255,237,213,0.85)', fontWeight: 500, textTransform: 'none', letterSpacing: '0.01em' }}>
            a tu mesa
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`${cls('delay-200')} text-orange-100/70 text-base sm:text-lg leading-relaxed max-w-xl`}>
          Repartos en <strong className="text-orange-300">Penco, Concepción</strong> y alrededores.
          Frescura garantizada directo desde nuestra granja familiar.
        </p>

        {/* CTA buttons */}
        <div className={`${cls('delay-300')} flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center`}>
          <button
            id="hero-cta-catalog"
            onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-brand flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-2xl cursor-pointer w-full sm:w-auto"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '1rem' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Ver Lista de Precios
          </button>

          <a
            href="https://wa.me/56988832514"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-2 border-orange-400/35 hover:border-orange-300 text-orange-200 hover:text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer w-full sm:w-auto"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '1rem' }}
          >
            {WA_SVG}
            Pedir por WhatsApp
          </a>
        </div>

        {/* Stats row */}
        <div className={`${cls('delay-400')} flex flex-wrap justify-center gap-8 sm:gap-14 mt-4`}>
          {[
            { icon: '🥚', value: '6 Calibres',  label: 'disponibles'  },
            { icon: '🚚', value: 'Despacho',     label: 'a domicilio'  },
            { icon: '🌿', value: '100% Campo',   label: 'natural'      },
          ].map((s) => (
            <div key={s.value} className="flex flex-col items-center gap-1">
              <span className="text-3xl">{s.icon}</span>
              <span
                className="text-orange-300 font-bold text-lg leading-none uppercase"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {s.value}
              </span>
              <span className="text-orange-100/40 text-xs">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce pointer-events-none">
        <span className="text-orange-400/40 text-[10px] tracking-widest uppercase" style={{ fontFamily: 'Oswald, sans-serif' }}>
          Scroll
        </span>
        <svg className="w-4 h-4 text-orange-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
