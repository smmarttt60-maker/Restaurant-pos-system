import { buildKitchenTicket } from '../../utilis/printLogic';
import { RESTAURANT_INFO } from '../../constants/restaurantInfo';

// The kitchen order ticket: big order number, what to cook, where it goes. No prices.
const KitchenTicket = ({ order }) => {
  const ticket = buildKitchenTicket(order);

  return (
    <div
      className="font-mono text-[12px] leading-snug text-black bg-white"
      style={{ maxWidth: `${RESTAURANT_INFO.paperWidthMm - 8}mm` }}
    >
      <p className="text-center font-bold">KITCHEN ORDER</p>
      <p className="text-center text-[34px] font-bold leading-none my-1">{ticket.orderNumber}</p>
      <p className="text-center text-[16px] font-bold uppercase">{ticket.typeLabel}</p>
      {ticket.destination && (
        <p className="text-center text-[16px] font-bold break-words">{ticket.destination}</p>
      )}
      <p className="text-center">{ticket.placedAt}</p>

      <hr className="border-t-2 border-black my-2" />

      {ticket.items.map((item) => (
        <p key={item.key} className="text-[18px] font-bold leading-tight mb-1 break-words">
          {item.quantity} x {item.name}
        </p>
      ))}

      <hr className="border-t-2 border-black my-2" />

      <p className="text-center">Total items: {ticket.itemCount}</p>
    </div>
  );
};

export default KitchenTicket;
