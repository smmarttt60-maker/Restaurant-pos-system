import { useCart } from '../../context/CartContext';
import { ORDER_TYPES } from '../../constants/orderTypes';

const OrderTypeSelector = () => {
  const { orderType, setOrderType } = useCart();

  return (
    <div className="flex gap-2 mb-4">
      {ORDER_TYPES.map((type) => (
        <button
          key={type.id}
          onClick={() => setOrderType(type.id)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
            orderType === type.id
              ? 'bg-[#f6b100] text-[#1a1a1a]'
              : 'bg-[#262626] text-[#ababab]'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
};

export default OrderTypeSelector;
