import { useState } from 'react';
import { CartContext } from './CartContext';
import {
  addItem,
  increaseItem,
  decreaseItem,
  removeItem,
  getTotalItems,
  getSubtotal,
} from '../utilis/cartLogic';

const CartProvider = ({ children }) => {
  // The ONE place the cart is stored.
  const [cartItems, setCartItems] = useState([]);

  // "current" is always the latest cart, even if two clicks happen quickly.
  const addToCart = (menuItem) => setCartItems((current) => addItem(current, menuItem));
  const increaseQuantity = (id) => setCartItems((current) => increaseItem(current, id));
  const decreaseQuantity = (id) => setCartItems((current) => decreaseItem(current, id));
  const removeFromCart = (id) => setCartItems((current) => removeItem(current, id));
  const clearCart = () => setCartItems([]);

  const value = {
    cartItems,
    totalItems: getTotalItems(cartItems),
    subtotal: getSubtotal(cartItems),
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
