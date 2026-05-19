import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────
const ADD_ITEM       = 'ADD_ITEM';
const REMOVE_ITEM    = 'REMOVE_ITEM';
const UPDATE_QTY     = 'UPDATE_QTY';
const CLEAR_CART     = 'CLEAR_CART';

// ── Reducer ───────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const exists = state.find((i) => i.producto.id === action.producto.id);
      if (exists) {
        return state.map((i) =>
          i.producto.id === action.producto.id
            ? { ...i, cantidad: i.cantidad + action.cantidad }
            : i
        );
      }
      return [...state, { producto: action.producto, cantidad: action.cantidad }];
    }
    case REMOVE_ITEM:
      return state.filter((i) => i.producto.id !== action.id);
    case UPDATE_QTY:
      return state.map((i) =>
        i.producto.id === action.id
          ? { ...i, cantidad: Math.max(1, action.cantidad) }
          : i
      );
    case CLEAR_CART:
      return [];
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────
const CartContext = createContext(null);

const STORAGE_KEY = 'la-amanecida-cart';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ── Provider ──────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadFromStorage);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((producto, cantidad = 1) => {
    dispatch({ type: ADD_ITEM, producto, cantidad });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: REMOVE_ITEM, id });
  }, []);

  const updateQuantity = useCallback((id, cantidad) => {
    dispatch({ type: UPDATE_QTY, id, cantidad });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CLEAR_CART });
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
