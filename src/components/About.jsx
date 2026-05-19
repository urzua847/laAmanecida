export default function About() {
  const values = [
    {
      icon: '🌿',
      title: 'Producción Natural',
      desc: 'Nuestras gallinas se crían en libertad, alimentadas con granos naturales sin aditivos artificiales.',
    },
    {
      icon: '🏡',
      title: 'Directo del Campo',
      desc: 'Sin intermediarios. Los huevos llegan directamente desde nuestra granja familiar hasta tu hogar.',
    },
    {
      icon: '🚚',
      title: 'Reparto a Domicilio',
      desc: 'Llegamos a Penco, Concepción y alrededores. Coordinamos el horario de entrega contigo.',
    },
    {
      icon: '✅',
      title: 'Frescura Garantizada',
      desc: 'Garantizamos que todos nuestros productos son frescos y de la más alta calidad.',
    },
  ];

  return (
    <section id="nosotros" className="py-32 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900/0 via-amber-950/10 to-stone-900/0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Left: Text */}
          <div>
            <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">
              — Nuestra historia —
            </span>
            <h2 className="section-title text-4xl md:text-5xl text-white mb-8">
              Familia y campo,{' '}
              <span className="gradient-text">una tradición.</span>
            </h2>
            <div className="space-y-5 text-amber-100/65 text-base leading-relaxed">
              <p>
                <strong className="text-amber-300">Huevos La Amanecida</strong> nació de la pasión de una familia penquista
                por la vida de campo y la alimentación sana. Desde nuestros campos en la región del Biobío,
                criamos gallinas en libertad bajo los mejores estándares de bienestar animal.
              </p>
              <p>
                Cada huevo que llega a tu mesa ha sido cuidado con amor, desde el momento en que
                nuestras gallinas despiertan con la amanecida, de ahí nuestro nombre.
              </p>
              <p>
                Ofrecemos <strong className="text-amber-300">reparto a domicilio</strong> en Penco, Concepción y zonas
                aledañas. Pedidos directamente por WhatsApp, sin complicaciones.
              </p>
            </div>

            {/* Contact info */}
            <div className="mt-10 flex flex-col gap-4">
              <div className="flex items-center gap-4 glass rounded-xl px-5 py-3">
                <span className="text-2xl">📍</span>
                <span className="text-amber-100/70">Penco, Región del Biobío, Chile</span>
              </div>
              <div className="flex items-center gap-4 glass rounded-xl px-5 py-3">
                <span className="text-2xl">📱</span>
                <a
                  href="https://wa.me/56988832514"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100/70 hover:text-amber-300 transition-colors underline underline-offset-2"
                >
                  +56 9 8883 2514
                </a>
              </div>
              <div className="flex items-center gap-4 glass rounded-xl px-5 py-3">
                <span className="text-2xl">📸</span>
                <a
                  href="https://www.instagram.com/laamanecidahuevos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100/70 hover:text-amber-300 transition-colors underline underline-offset-2"
                >
                  @laamanecidahuevos
                </a>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl aspect-square max-w-md mx-auto lg:ml-auto">
              <img
                src="/images/hero-bg.png"
                alt="Campo de la granja La Amanecida"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  La Amanecida 🐔
                </p>
                <p className="text-amber-300 text-sm">Penco, Biobío — Chile</p>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-full h-full max-w-md rounded-3xl border border-amber-500/20 pointer-events-none" />
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="glass rounded-2xl p-8 text-center hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-5">{v.icon}</div>
              <h3 className="font-bold text-amber-200 mb-3 text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {v.title}
              </h3>
              <p className="text-amber-100/55 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
