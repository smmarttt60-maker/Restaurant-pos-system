import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { formatPrice } from '../../utilis/formatPrice';

const Cart = () => {
  const { cartItems, totalItems, subtotal, clearCart } = useCart();

  return (
    // pb-16 keeps the totals clear of the fixed bottom navigation bar
    <aside className="flex-1 min-w-[320px] max-w-[380px] bg-[#1a1a1a] flex flex-col pb-16">
      <div className="flex justify-between items-center px-5 py-4">
        <h2 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Current Order</h2>
        {cartItems.length > 0 && (
          <button onClick={clearCart} className="text-[#ababab] text-sm hover:text-red-400">
            Clear
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-5">
        {cartItems.length === 0 ? (
          <p className="text-[#ababab] text-center mt-10">
            No items yet. Tap Add on a dish to start an order.
          </p>
        ) : (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>

      <div className="px-5 py-4 border-t border-[#343434]">
        <div className="flex justify-between text-[#ababab] text-sm">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between text-[#f5f5f5] font-bold text-lg mt-2">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </aside>
  );
};

export default Cart;
