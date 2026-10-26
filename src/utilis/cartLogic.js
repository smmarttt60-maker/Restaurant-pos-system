// Cart rules as plain functions. Each one takes the current cart (an array)
// and RETURNS a new array. Nothing is changed in place, which is what React
// needs in order to notice that the cart changed.
// Prices are whole rupees, so the maths never has decimal errors.

// Add a dish. If it is already in the cart, just add 1 to its quantity.
export const addItem = (items, menuItem) => {
  const existing = items.find((item) => item.id === menuItem.id);
  if (existing) {
    return items.map((item) =>
      item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [
    ...items,
    { id: menuItem.id, name: menuItem.name, price: menuItem.price, quantity: 1 },
  ];
};

export const increaseItem = (items, id) =>
  items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));

// Take 1 away. A dish that reaches 0 is removed from the cart.
export const decreaseItem = (items, id) =>
  items
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);

export const removeItem = (items, id) => items.filter((item) => item.id !== id);

// Totals are calculated from the cart, never stored separately,
// so they can never disagree with what is in it.
export const getTotalItems = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const getSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
