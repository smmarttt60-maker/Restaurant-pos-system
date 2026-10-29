import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrdersContext';
import { getOrderTypeLabel } from '../../constants/orderTypes';
import { formatPrice } from '../../utilis/formatPrice';
import { formatOrderNumber, validateOrder } from '../../utilis/orderLogic';

// A pop-up with two steps: 1) check the order and place it, 2) confirmation.
const OrderSummary = ({ onClose }) => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    total,
    orderType,
    details,
    discountType,
    discountValue,
    clearCart,
  } = useCart();
  const { placeOrder } = useOrders();

  const [placedOrder, setPlacedOrder] = useState(null); // set after a successful save
  const [problem, setProblem] = useState('');

  // Let the Escape key close the pop-up
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handlePlaceOrder = () => {
    // Check again at the last moment, in case something changed
    const found = validateOrder({
      items: cartItems,
      orderType,
      details,
      subtotal,
      discountType,
      discountValue,
    });
    if (Object.keys(found).length > 0) {
      setProblem('This order is not valid. Go back and check it.');
      return;
    }

    const order = placeOrder({ items: cartItems, orderType, details, discountType, discountValue });
    if (!order) {
      // The cart is NOT cleared, so nothing is lost
      setProblem('Could not save the order on this device. It was NOT placed. Please try again.');
      return;
    }

    clearCart();
    setPlacedOrder(order);
  };

  const boxClass = 'bg-[#1a1a1a] rounded-lg w-[480px] max-w-full max-h-[85vh] overflow-y-auto p-6';

  // ----- Step 2: confirmation (built from the saved order, because the cart is now empty) -----
  if (placedOrder) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" aria-label="Order placed" className={`${boxClass} text-center`}>
          <p className="text-[#f6b100] text-4xl font-bold">{formatOrderNumber(placedOrder.orderNumber)}</p>
          <h2 className="text-[#f5f5f5] text-xl font-semibold mt-2">Order placed</h2>
          <p className="text-[#ababab] mt-3">
            {getOrderTypeLabel(placedOrder.orderType)}
            {placedOrder.orderType === 'dine-in' && ` · Table ${placedOrder.details.tableNumber}`}
            {' · '}
            {placedOrder.items.reduce((sum, item) => sum + item.quantity, 0)} items
          </p>
          <p className="text-[#f5f5f5] font-bold text-lg mt-1">{formatPrice(placedOrder.total)}</p>
          <p className="text-[#ababab] text-xs mt-4">
            Receipts and kitchen tickets come in the next features.
          </p>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-2"
          >
            New order
          </button>
        </div>
      </div>
    );
  }

  // ----- Step 1: check the order -----
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div role="dialog" aria-modal="true" aria-label="Order summary" className={boxClass}>
        <h2 className="text-[#f5f5f5] text-xl font-semibold">Order Summary</h2>

        <div className="mt-3 text-sm text-[#ababab]">
          <p className="text-[#f6b100] font-semibold">{getOrderTypeLabel(orderType)}</p>
          {orderType === 'dine-in' && <p>Table {Number(details.tableNumber)}</p>}
          {orderType === 'takeaway' && details.customerName.trim() && (
            <p>Name: {details.customerName.trim()}</p>
          )}
          {orderType === 'delivery' && (
            <>
              <p>Mobile: {details.phone.trim()}</p>
              <p>Address: {details.address.trim()}</p>
            </>
          )}
        </div>

        <div className="mt-4 border-t border-[#343434] pt-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-[#f5f5f5] py-1">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-[#343434] pt-3">
          <div className="flex justify-between text-[#ababab]">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-[#ababab]">
              <span>Discount</span>
              <span>- {formatPrice(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#f5f5f5] font-bold text-lg mt-1">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {problem && <p className="text-red-400 text-sm mt-4">{problem}</p>}

        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-2"
        >
          Place Order
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-[#262626] text-[#f5f5f5] font-semibold rounded-lg py-2"
        >
          Back to order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
