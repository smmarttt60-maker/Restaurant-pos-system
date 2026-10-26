import { useCart } from '../../context/CartContext';

const DiscountInput = ({ error }) => {
  const { discountType, discountValue, setDiscountType, setDiscountValue } = useCart();

  const toggleClass = (type) =>
    `px-3 py-1 text-sm font-semibold rounded-lg ${
      discountType === type ? 'bg-[#f6b100] text-[#1a1a1a]' : 'bg-[#262626] text-[#ababab]'
    }`;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[#ababab] text-sm">Discount</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setDiscountType('amount')} className={toggleClass('amount')}>
            Rs
          </button>
          <button onClick={() => setDiscountType('percent')} className={toggleClass('percent')}>
            %
          </button>
          <input
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
            inputMode="decimal"
            maxLength={7}
            placeholder="0"
            aria-label="Discount value"
            className={`w-24 bg-[#262626] text-[#f5f5f5] rounded-lg px-3 py-1 outline-none text-right border ${
              error ? 'border-red-400' : 'border-transparent'
            }`}
          />
        </div>
      </div>
      {error && <p className="text-red-400 text-xs mt-1 text-right">{error}</p>}
    </div>
  );
};

export default DiscountInput;
