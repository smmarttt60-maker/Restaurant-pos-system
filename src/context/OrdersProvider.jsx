import { useState } from 'react';
import { OrdersContext } from './OrdersContext';
import { loadOrders, saveOrders } from '../utilis/orderStorage';
import { buildOrder } from '../utilis/orderLogic';

// Keeps the list of placed orders.
const OrdersProvider = ({ children }) => {
  // The function form runs once, on first load, to read saved orders.
  const [orders, setOrders] = useState(loadOrders);

  // Returns the saved order, or null if it could not be saved.
  // We re-read storage first so two open tabs cannot hand out the same number.
  const placeOrder = (draft) => {
    const current = loadOrders();
    const order = buildOrder(draft, current, new Date());
    const updated = [...current, order];

    if (!saveOrders(updated)) return null; // not saved -> caller keeps the cart
    setOrders(updated);
    return order;
  };

  return <OrdersContext.Provider value={{ orders, placeOrder }}>{children}</OrdersContext.Provider>;
};

export default OrdersProvider;
