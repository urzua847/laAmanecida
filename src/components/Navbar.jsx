import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const prevTotal = useRef(totalItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? 'glass-dark shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="Ir al inicio"
        >
          <span className="text-2xl">🥚</span>
          <div className="leading-tight">
            <p className="font-bold text-base gradient-text" style={{ fontFamily: 'Outfit, sans-serif' }}>
              La Amanecida
            </p>
            <p className="text-xs text-amber-400/70 font-medium tracking-wider uppercase">
              Huevos de campo
            </p>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="nav-link text-sm font-medium text-amber-50/80 hover:text-amber-300 transition-colors duration-200 cursor-pointer pb-0.5"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Cart Button */}
        <div className="flex items-center gap-3">
          <button
            id="cart-toggle-btn"
            onClick={onCartOpen}
            className="relative flex items-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 text-amber-300 rounded-xl px-3 py-2 transition-all duration-200 cursor-pointer"
            aria-label={`Carrito con ${totalItems} productos`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden sm:block text-sm font-medium">Carrito</span>
            {totalItems > 0 && (
              <span
                className={`cart-badge absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold text-stone-900 px-1 ${badgeBump ? 'bump' : ''}`}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Menú"
          >
            <span className={`block w-5 h-0.5 bg-amber-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-amber-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-amber-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-amber-500/10 animate-fade-in">
          <ul className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left text-base font-medium text-amber-100 hover:text-amber-300 transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
