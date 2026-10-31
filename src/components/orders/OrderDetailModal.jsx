import { useEffect } from 'react';
import { getOrderTypeLabel } from '../../constants/orderTypes';
import { getStatusLabel } from '../../constants/orderStatuses';
import { formatOrderNumber } from '../../utilis/orderLogic';
import { formatPrice } from '../../utilis/formatPrice';
import { formatDateTime } from '../../utilis/formatDate';

// A pop-up showing one saved order, exactly as it was placed.
const OrderDetailModal = ({ order, onClose }) => {
  const items = order.items ?? [];
  const details = order.details ?? {};
  const discount = order.discount;

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
        aria-label={`Order ${formatOrderNumber(order.orderNumber)}`}
        className="bg-[#1a1a1a] rounded-lg w-[480px] max-w-full max-h-[85dvh] overflow-y-auto p-4 md:p-6"
      >
        <div className="flex justify-between items-start gap-3">
          <div>
            <h2 className="text-[#f6b100] text-2xl font-bold">{formatOrderNumber(order.orderNumber)}</h2>
            <p className="text-[#ababab] text-sm">{formatDateTime(order.createdAt)}</p>
          </div>
          <span className="bg-[#262626] text-[#f6b100] text-xs font-semibold rounded-lg px-2 py-1">
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="mt-3 text-sm text-[#ababab] break-words">
          <p className="text-[#f5f5f5] font-semibold">{getOrderTypeLabel(order.orderType)}</p>
          {order.orderType === 'dine-in' && details.tableNumber && <p>Table {details.tableNumber}</p>}
          {order.orderType === 'takeaway' && details.customerName && <p>Name: {details.customerName}</p>}
          {order.orderType === 'delivery' && (
            <>
              <p>Mobile: {details.phone}</p>
              <p>Address: {details.address}</p>
            </>
          )}
        </div>

        <div className="mt-4 border-t border-[#343434] pt-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-[#f5f5f5] py-1">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-[#343434] pt-3">
          <div className="flex justify-between text-[#ababab]">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal ?? 0)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-[#ababab]">
              <span>Discount{discount?.type === 'percent' ? ` (${discount.value}%)` : ''}</span>
              <span>- {formatPrice(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#f5f5f5] font-bold text-lg mt-1">
            <span>Total</span>
            <span>{formatPrice(order.total ?? 0)}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-3 md:py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
