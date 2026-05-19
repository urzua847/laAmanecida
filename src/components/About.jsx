const VALORES = [
  { icon: '🌿', title: 'Producción Natural',  desc: 'Gallinas criadas en libertad, alimentadas con granos naturales sin aditivos artificiales.' },
  { icon: '🏡', title: 'Directo del Campo',   desc: 'Sin intermediarios. Los huevos llegan desde nuestra granja familiar hasta tu hogar.' },
  { icon: '🚚', title: 'Reparto a Domicilio', desc: 'Llegamos a Penco, Concepción y alrededores. Coordinamos el horario contigo.' },
  { icon: '✅', title: 'Frescura Garantizada', desc: 'Todos nuestros huevos son recogidos diariamente para garantizar máxima frescura.' },
];

export default function About() {
  return (
    <section id="nosotros" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/8 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Story + Image ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 sm:mb-28">

          {/* Left: text */}
          <div className="flex flex-col gap-6">
            <div>
              <span
                className="text-orange-400 text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                — Nuestra Historia —
              </span>
              <h2
                className="mt-3 text-white uppercase leading-tight"
                style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  letterSpacing: '0.03em',
                }}
              >
                Familia y campo,{' '}
                <span className="gradient-text">una tradición.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-4 text-orange-100/60 text-base leading-relaxed">
              <p>
                <strong className="text-orange-300">Huevos La Amanecida</strong> nació de la pasión de una
                familia penquista por la vida de campo y la alimentación sana. Desde nuestros campos en la
                región del Biobío, criamos gallinas en libertad bajo los mejores estándares de bienestar animal.
              </p>
              <p>
                Cada huevo que llega a tu mesa fue cuidado con amor, desde que nuestras gallinas despiertan
                con la amanecida — de ahí nuestro nombre.
              </p>
              <p>
                Ofrecemos <strong className="text-orange-300">reparto a domicilio</strong> en Penco,
                Concepción y zonas aledañas. Pedidos directamente por WhatsApp, sin complicaciones.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4 w-full">
              {[
                { icon: '📍', text: 'Penco, Biobío',                         href: null },
                { icon: '📱', text: '+56 9 8883 2514',                        href: 'https://wa.me/56988832514' },
                { icon: '📸', text: '@laamanecidahuevos',                     href: 'https://www.instagram.com/laamanecidahuevos' },
              ].map((c) => (
                <div key={c.text} className="glass-warm rounded-xl p-3 flex flex-row items-center gap-2.5 transition-all duration-300 hover:border-orange-500/30">
                  <span className="text-xl flex-shrink-0">{c.icon}</span>
                  <div className="min-w-0 flex-1 leading-tight">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer"
                        className="text-orange-100/70 hover:text-orange-300 transition-colors text-[11px] font-bold uppercase tracking-wider block truncate">
                        {c.text}
                      </a>
                    ) : (
                      <span className="text-orange-100/70 text-[11px] font-bold uppercase tracking-wider block">{c.text}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl">
              <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl">
                <img
                  src="./images/hero-bg.png"
                  alt="Granja La Amanecida — Penco, Biobío"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-955/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-2xl uppercase tracking-wide" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    La Amanecida 🐔
                  </p>
                  <p className="text-orange-300 font-medium text-sm mt-0.5">Penco, Biobío — Chile</p>
                </div>
              </div>
              {/* Decorative offset border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-orange-500/25 pointer-events-none -z-10 shadow-lg" />
            </div>
          </div>
        </div>

        {/* ── Values grid ── */}
        <div>
          <div className="text-center mb-10">
            <span
              className="text-orange-400 text-xs font-bold tracking-widest uppercase"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              — Por qué elegirnos —
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {VALORES.map((v) => (
              <div
                key={v.title}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="text-5xl">{v.icon}</span>
                <h3
                  className="text-orange-200 font-bold text-lg uppercase"
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.04em' }}
                >
                  {v.title}
                </h3>
                <p className="text-orange-100/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
