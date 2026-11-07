import { createContext, useContext } from 'react';

// The "shared box" that any component can read the cart from.
export const CartContext = createContext(null);

// Components call useCart() to get the cart and its functions.
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
};
