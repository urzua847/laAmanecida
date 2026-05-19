import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const WA_ICON = (
  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (totalItems !== prevTotal.current) {
      setBadgeBump(true);
      const t = setTimeout(() => setBadgeBump(false), 400);
      prevTotal.current = totalItems;
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = [
    { label: 'Inicio',   id: 'hero'     },
    { label: 'Catálogo', id: 'catalogo' },
    { label: 'Nosotros', id: 'nosotros' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'glass-dark shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      {/* ── Main bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 min-w-0 flex-shrink-0 cursor-pointer group"
            aria-label="Volver al inicio"
          >
            <img
              src="./images/logo.png"
              alt="La Amanecida"
              className="w-11 h-11 object-cover rounded-full flex-shrink-0 group-hover:scale-105 transition-transform duration-300 bg-white border border-orange-500/25 p-0.5 shadow-md shadow-orange-500/20"
            />
            <div className="hidden sm:block leading-tight min-w-0">
              <p
                className="gradient-text font-bold text-lg uppercase tracking-wider leading-none"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                La Amanecida
              </p>
              <p className="text-orange-300/60 text-[10px] tracking-widest uppercase mt-0.5">
                Huevos frescos · De campo
              </p>
            </div>
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="nav-link px-4 py-2 text-sm font-semibold text-orange-100/75 hover:text-orange-300 transition-colors cursor-pointer uppercase tracking-wider"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right: Cart + Burger */}
          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              id="cart-toggle-btn"
              onClick={onCartOpen}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass-warm cursor-pointer hover:border-orange-400/50 transition-all duration-200 group"
              aria-label={`Carrito — ${totalItems} productos`}
            >
              <svg className="w-5 h-5 text-orange-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span
                className="hidden sm:block text-sm font-bold text-orange-200 uppercase tracking-wider"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                Carrito
              </span>
              {totalItems > 0 && (
                <span
                  className={`cart-badge absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white px-1 ${badgeBump ? 'bump' : ''}`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer rounded-xl glass-warm"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-orange-300 origin-center transition-all duration-250 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-orange-300 transition-all duration-250 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-orange-300 origin-center transition-all duration-250 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-orange-500/10 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-bold text-orange-100/80 hover:text-orange-300 hover:bg-orange-500/8 transition-all cursor-pointer uppercase tracking-wider"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                {l.label}
              </button>
            ))}
            {/* WhatsApp shortcut in mobile menu */}
            <a
              href="https://wa.me/56988832514"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-green-500/10 border border-green-500/25 text-green-400 font-bold text-sm uppercase tracking-wider transition-all"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              {WA_ICON}
              Pedir por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
