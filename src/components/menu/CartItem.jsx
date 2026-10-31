import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utilis/formatPrice';

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-[#262626] rounded-lg p-3 mb-3">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-[#f5f5f5] font-semibold">{item.name}</h3>
        <button
          onClick={() => removeFromCart(item.id)}
          aria-label={`Remove ${item.name}`}
          className="text-[#ababab] hover:text-red-400 p-[15px] -m-[15px] md:p-0 md:m-0 md:mt-1"
        >
          <FaTrash size={14} />
        </button>
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => decreaseQuantity(item.id)}
            aria-label={`Decrease ${item.name}`}
            className="bg-[#343434] text-[#f5f5f5] rounded-lg p-4 md:p-2"
          >
            <FaMinus size={12} />
          </button>
          <span className="text-[#f5f5f5] font-semibold w-6 text-center">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.id)}
            aria-label={`Increase ${item.name}`}
            className="bg-[#343434] text-[#f5f5f5] rounded-lg p-4 md:p-2"
          >
            <FaPlus size={12} />
          </button>
        </div>
        <p className="text-[#f6b100] font-bold">{formatPrice(item.price * item.quantity)}</p>
      </div>
    </div>
  );
};

export default CartItem;
