import { useCart } from '../../context/CartContext';

// One labelled text box with an optional red error message under it
const Field = ({ label, error, ...inputProps }) => (
  <div className="mb-3">
    <label className="block text-[#ababab] text-sm mb-1">{label}</label>
    <input
      {...inputProps}
      className={`w-full bg-[#262626] text-[#f5f5f5] rounded-lg px-3 py-2 outline-none border ${
        error ? 'border-red-400' : 'border-transparent'
      }`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// Shows only the boxes that the chosen order type needs.
const OrderDetails = ({ errors }) => {
  const { orderType, details, setDetail } = useCart();

  if (orderType === 'dine-in') {
    return (
      <Field
        label="Table number"
        value={details.tableNumber}
        // keep digits only
        onChange={(e) => setDetail('tableNumber', e.target.value.replace(/\D/g, ''))}
        inputMode="numeric"
        maxLength={3}
        placeholder="e.g. 5"
        error={errors.tableNumber}
      />
    );
  }

  if (orderType === 'takeaway') {
    return (
      <Field
        label="Customer name (optional)"
        value={details.customerName}
        onChange={(e) => setDetail('customerName', e.target.value)}
        maxLength={40}
        placeholder="Name to call out"
      />
    );
  }

  // delivery
  return (
    <>
      <Field
        label="Mobile number"
        value={details.phone}
        onChange={(e) => setDetail('phone', e.target.value)}
        inputMode="tel"
        maxLength={16}
        placeholder="0300 1234567"
        error={errors.phone}
      />
      <Field
        label="Delivery address"
        value={details.address}
        onChange={(e) => setDetail('address', e.target.value)}
        maxLength={120}
        placeholder="House, street, area"
        error={errors.address}
      />
    </>
  );
};

export default OrderDetails;
