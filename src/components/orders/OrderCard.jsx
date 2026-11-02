import { getOrderTypeLabel } from '../../constants/orderTypes';
import { getStatus } from '../../constants/orderStatuses';
import { formatOrderNumber, getOrderWhoLine } from '../../utilis/orderLogic';
import { formatPrice } from '../../utilis/formatPrice';
import { formatDateTime, formatTime } from '../../utilis/formatDate';
import StatusBadge from './StatusBadge';

// One order in the list. Clicking the top part opens the full order;
// the button underneath moves it to its next status.
// (They are separate buttons because a button cannot sit inside another button.)
const OrderCard = ({ order, onSelect, onAdvance, showDate }) => {
  const items = order.items ?? [];
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const who = getOrderWhoLine(order);
  const { nextLabel } = getStatus(order.status);

  return (
    <div className="bg-[#1a1a1a] hover:bg-[#222222] rounded-lg">
      <button
        onClick={() => onSelect(order.id)}
        className="w-full text-left p-4 flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-2"
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
            {itemCount} {itemCount === 1 ? 'item' : 'items'} · {items.map((item) => `${item.quantity} × ${item.name}`).join(', ')}
          </p>
        </div>

        <div className="order-2 md:order-3 text-right shrink-0">
          <p className="text-[#f5f5f5] font-bold">{formatPrice(order.total ?? 0)}</p>
          <div className="mt-1">
            <StatusBadge status={order.status} />
          </div>
        </div>
      </button>

      {nextLabel && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onAdvance(order)}
            aria-label={`${nextLabel}: order ${formatOrderNumber(order.orderNumber)}`}
            className="w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-3 md:py-2"
          >
            {nextLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
