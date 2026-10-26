import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { validateOrder } from '../../utilis/orderLogic';
import { formatPrice } from '../../utilis/formatPrice';
import CartItem from './CartItem';
import OrderTypeSelector from './OrderTypeSelector';
import OrderDetails from './OrderDetails';
import DiscountInput from './DiscountInput';
import OrderSummary from './OrderSummary';

const Cart = () => {
  const {
    cartItems,
    totalItems,
    subtotal,
    discountAmount,
    total,
    orderType,
    details,
    discountType,
    discountValue,
    clearCart,
  } = useCart();

  // Errors only appear after the cashier presses "Review Order" once,
  // so the form is not red before they have done anything.
  const [attempted, setAttempted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Worked out from the current values on every render (never stored),
  // so an error disappears the moment the cashier fixes it.
  const errors = validateOrder({
    items: cartItems,
    orderType,
    details,
    subtotal,
    discountType,
    discountValue,
  });
  const visibleErrors = attempted ? errors : {};

  const handleReview = () => {
    setAttempted(true);
    if (Object.keys(errors).length === 0) setShowSummary(true);
  };

  const handleClear = () => {
    clearCart();
    setAttempted(false);
  };

  return (
    // pb-16 keeps the bottom part clear of the fixed bottom navigation bar
    <aside className="flex-1 min-w-[320px] max-w-[400px] bg-[#1a1a1a] flex flex-col pb-16">
      <div className="flex justify-between items-center px-5 py-4">
        <h2 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Current Order</h2>
        {cartItems.length > 0 && (
          <button onClick={handleClear} className="text-[#ababab] text-sm hover:text-red-400">
            Clear
          </button>
        )}
      </div>

      {/* Middle part scrolls if there is a lot in it */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        <OrderTypeSelector />
        <OrderDetails errors={visibleErrors} />

        {cartItems.length === 0 ? (
          <p className="text-[#ababab] text-center mt-6">
            No items yet. Tap Add on a dish to start an order.
          </p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>

      {/* Bottom part is always visible */}
      <div className="px-5 py-4 border-t border-[#343434]">
        <DiscountInput error={visibleErrors.discount} />

        <div className="flex justify-between text-[#ababab] text-sm">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-[#ababab] text-sm mt-1">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-[#ababab] text-sm mt-1">
            <span>Discount</span>
            <span>- {formatPrice(discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-[#f5f5f5] font-bold text-lg mt-2">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <button
          onClick={handleReview}
          disabled={cartItems.length === 0}
          className="mt-3 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Review Order
        </button>
      </div>

      {showSummary && <OrderSummary onClose={() => setShowSummary(false)} />}
    </aside>
  );
};

export default Cart;
