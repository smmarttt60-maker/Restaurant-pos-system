import { BiSolidDish } from 'react-icons/bi';
import { useCart } from '../../context/CartContext';
import { getMenuImage } from '../../utilis/menuImages';
import { formatPrice } from '../../utilis/formatPrice';

const MenuCard = ({ item }) => {
  const image = getMenuImage(item.photo);
  const { addToCart } = useCart();

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
      {image ? (
        <img src={image} alt={item.name} loading="lazy" className="h-36 w-full object-cover" />
      ) : (
        // Placeholder shown until a real photo is added
        <div className="h-36 w-full bg-[#262626] flex items-center justify-center text-[#ababab]">
          <BiSolidDish size={40} />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-[#f5f5f5] font-semibold tracking-wide">{item.name}</h2>
        <p className="text-[#ababab] text-sm mt-1">{item.category}</p>
        <p className="text-[#f6b100] font-bold mt-3">{formatPrice(item.price)}</p>
        <button
          onClick={() => addToCart(item)}
          className="mt-3 w-full bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg py-2"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
