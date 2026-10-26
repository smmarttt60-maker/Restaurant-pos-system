import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { getOrderTypeLabel } from '../../constants/orderTypes';
import { formatPrice } from '../../utilis/formatPrice';

// A pop-up showing the final order for the cashier to double-check.
const OrderSummary = ({ onClose }) => {
  const { cartItems, subtotal, discountAmount, total, orderType, details } = useCart();

  // Let the Escape key close the pop-up
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Order summary"
        className="bg-[#1a1a1a] rounded-lg w-[480px] max-w-full max-h-[85vh] overflow-y-auto p-6"
      >
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

        <p className="text-[#ababab] text-xs mt-4">
          This order is not saved yet. Saving orders and printing receipts come in the next features.
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-2"
        >
          Back to order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
