// Saves orders in the browser (localStorage) for now.
// They survive a page refresh, but live only on this computer and browser.
// When the backend is built (Phase 3), this file is what gets replaced.
const KEY = 'pos.orders.v1';

export const loadOrders = () => {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error('not a list');
    // keep only records that look like orders
    return parsed.filter(
      (order) => order && typeof order.day === 'string' && Number.isInteger(order.orderNumber)
    );
  } catch {
    // Unreadable data: keep a copy so nothing is silently destroyed, then start fresh.
    try {
      if (raw !== null) localStorage.setItem(`${KEY}.corrupt`, raw);
    } catch {
      /* nothing more we can do */
    }
    return [];
  }
};

// Returns true if saved, false if the browser refused (storage full / blocked).
export const saveOrders = (orders) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders));
    return true;
  } catch {
    return false;
  }
};
