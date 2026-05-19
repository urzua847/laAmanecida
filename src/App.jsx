import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import About from './components/About';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-950 text-amber-50">
        {/* Fixed navigation */}
        <Navbar onCartOpen={() => setCartOpen(true)} />

        {/* Main content */}
        <main>
          <Hero />
          <Catalog />
          <About />
        </main>

        <Footer />

        {/* Cart Drawer (global, overlays everything) */}
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
