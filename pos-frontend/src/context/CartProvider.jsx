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
import { calculateDiscountAmount, calculateTotal } from '../utilis/orderLogic';

const emptyDetails = { tableNumber: '', customerName: '', phone: '', address: '' };

// Holds the whole order being built: the dishes (cart) AND how it is served,
// who it is for, and any discount.
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState('dine-in');
  const [details, setDetails] = useState(emptyDetails);
  const [discountType, setDiscountType] = useState('amount'); // 'amount' (Rs) or 'percent'
  // Kept as text so the user can type freely ("1", "12", "12.5")
  const [discountValue, setDiscountValue] = useState('');

  const addToCart = (menuItem) => setCartItems((current) => addItem(current, menuItem));
  const increaseQuantity = (id) => setCartItems((current) => increaseItem(current, id));
  const decreaseQuantity = (id) => setCartItems((current) => decreaseItem(current, id));
  const removeFromCart = (id) => setCartItems((current) => removeItem(current, id));

  const setDetail = (field, value) =>
    setDetails((current) => ({ ...current, [field]: value }));

  // Start a fresh order: empty cart, default type, no details, no discount.
  const clearCart = () => {
    setCartItems([]);
    setOrderType('dine-in');
    setDetails(emptyDetails);
    setDiscountType('amount');
    setDiscountValue('');
  };

  // Calculated, never stored, so they always match the cart.
  const subtotal = getSubtotal(cartItems);
  const discountAmount = calculateDiscountAmount(subtotal, discountType, discountValue);
  const total = calculateTotal(subtotal, discountAmount);

  const value = {
    cartItems,
    totalItems: getTotalItems(cartItems),
    subtotal,
    discountAmount,
    total,
    orderType,
    details,
    discountType,
    discountValue,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    setOrderType,
    setDetail,
    setDiscountType,
    setDiscountValue,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
