import { getOrderTypeLabel } from '../../constants/orderTypes';
import { getStatusLabel } from '../../constants/orderStatuses';
import { formatOrderNumber, getOrderWhoLine } from '../../utilis/orderLogic';
import { formatPrice } from '../../utilis/formatPrice';
import { formatDateTime, formatTime } from '../../utilis/formatDate';

// One row in the order list. Clicking it opens the full order.
const OrderCard = ({ order, onSelect, showDate }) => {
  const items = order.items ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const who = getOrderWhoLine(order);

  return (
    <button
      onClick={() => onSelect(order.id)}
      className="w-full text-left bg-[#1a1a1a] hover:bg-[#222222] rounded-lg p-4 flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2"
    >
      <div className="order-1 flex-1 md:flex-none md:w-28 md:shrink-0">
        <p className="text-[#f6b100] text-xl font-bold">{formatOrderNumber(order.orderNumber)}</p>
        <p className="text-[#ababab] text-xs">
          {showDate ? formatDateTime(order.createdAt) : formatTime(order.createdAt)}
        </p>
      </div>

      <div className="order-3 w-full md:order-2 md:w-auto md:flex-1 min-w-0 break-words">
        <p className="text-[#f5f5f5] font-semibold">
          {getOrderTypeLabel(order.orderType)}
          {who && ` · ${who}`}
        </p>
        <p className="text-[#ababab] text-sm line-clamp-2 md:line-clamp-none md:truncate">
          {itemCount} items · {items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}
        </p>
      </div>

      <div className="order-2 md:order-3 text-right shrink-0">
        <p className="text-[#f5f5f5] font-bold">{formatPrice(order.total ?? 0)}</p>
        <span className="inline-block mt-1 bg-[#262626] text-[#f6b100] text-xs font-semibold rounded-lg px-2 py-1">
          {getStatusLabel(order.status)}
        </span>
      </div>
    </button>
  );
};

export default OrderCard;
