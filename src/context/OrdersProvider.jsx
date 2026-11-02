import { useState } from 'react';
import { OrdersContext } from './OrdersContext';
import { loadOrders, saveOrders } from '../utilis/orderStorage';
import { buildOrder } from '../utilis/orderLogic';
import { advanceOrder } from '../utilis/statusLogic';

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

  // Moves an order to its next status. Returns a word saying what happened:
  // 'ok' | 'changed' | 'failed' | 'not-found' | 'finished'
  // expectedStatus is the status the cashier SAW when pressing the button. If another tab
  // changed the order meanwhile, we refuse (and show the latest), so a step is never skipped.
  const advanceOrderStatus = (orderId, expectedStatus) => {
    const current = loadOrders();
    const index = current.findIndex((order) => order.id === orderId);
    if (index === -1) {
      setOrders(current);
      return 'not-found';
    }
    if (current[index].status !== expectedStatus) {
      setOrders(current);
      return 'changed';
    }

    const advanced = advanceOrder(current[index], new Date());
    if (!advanced) return 'finished';

    const updated = current.map((order, i) => (i === index ? advanced : order));
    if (!saveOrders(updated)) return 'failed'; // nothing changed
    setOrders(updated);
    return 'ok';
  };

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, advanceOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

export default OrdersProvider;
