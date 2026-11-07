import { buildReceipt } from '../../utilis/printLogic';

// The customer receipt. Black on white, monospace, narrow: made for receipt paper.
const Receipt = ({ order, restaurant }) => {
  const receipt = buildReceipt(order, restaurant);

  return (
    <div
      className="font-mono text-[12px] leading-snug text-black bg-white"
      style={{ maxWidth: `${restaurant.paperWidthMm - 8}mm` }}
    >
      <div className="text-center">
        <p className="text-[16px] font-bold">{receipt.restaurantName}</p>
        {receipt.address && <p>{receipt.address}</p>}
        {receipt.phone && <p>Tel: {receipt.phone}</p>}
      </div>

      <hr className="border-t border-dashed border-black my-2" />

      <div className="flex justify-between gap-2 font-bold">
        <span>Order {receipt.orderNumber}</span>
        <span>{receipt.typeLabel}</span>
      </div>
      <p>{receipt.dateTime}</p>
      {receipt.detailLines.map((line) => (
        <p key={line} className="break-words">
          {line}
        </p>
      ))}

      <hr className="border-t border-dashed border-black my-2" />

      {receipt.items.map((item) => (
        <div key={item.key} className="mb-1">
          <p className="break-words">{item.name}</p>
          <div className="flex justify-between gap-2">
            <span>
              {item.quantity} x {item.unitPrice}
            </span>
            <span>{item.lineTotal}</span>
          </div>
        </div>
      ))}

      <hr className="border-t border-dashed border-black my-2" />

      <div className="flex justify-between gap-2">
        <span>Subtotal</span>
        <span>{receipt.subtotal}</span>
      </div>
      {receipt.discount && (
        <div className="flex justify-between gap-2">
          <span>{receipt.discount.label}</span>
          <span>{receipt.discount.amount}</span>
        </div>
      )}
      <div className="flex justify-between gap-2 text-[15px] font-bold mt-1">
        <span>TOTAL</span>
        <span>{receipt.total}</span>
      </div>

      <hr className="border-t border-dashed border-black my-2" />

      <p className="text-center">{receipt.footerMessage}</p>
    </div>
  );
};

export default Receipt;
