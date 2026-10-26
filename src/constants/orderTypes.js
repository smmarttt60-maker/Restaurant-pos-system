// The three ways a customer can receive an order.
export const ORDER_TYPES = [
  { id: 'dine-in', label: 'Dine-in' },
  { id: 'takeaway', label: 'Takeaway' },
  { id: 'delivery', label: 'Delivery' },
];

export const getOrderTypeLabel = (id) =>
  ORDER_TYPES.find((type) => type.id === id)?.label ?? id;
