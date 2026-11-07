// Order status rules as plain functions (no React), so they are easy to test.
import { ORDER_STATUSES } from '../constants/orderStatuses.js';

// The step after this one, or null if there is none (completed, or an unknown status).
export const getNextStatus = (statusId) => {
  const index = ORDER_STATUSES.findIndex((status) => status.id === statusId);
  if (index === -1 || index === ORDER_STATUSES.length - 1) return null;
  return ORDER_STATUSES[index + 1].id;
};

// Moves an order forward one step and records when. Returns a NEW order
// (the old one is not changed), or null if the order cannot move forward.
// Orders saved before this feature have no history yet, so we start one from their creation time.
export const advanceOrder = (order, now) => {
  const next = getNextStatus(order.status);
  if (!next) return null;
  const history = order.statusHistory ?? [{ status: order.status, at: order.createdAt }];
  return {
    ...order,
    status: next,
    statusHistory: [...history, { status: next, at: now.toISOString() }],
  };
};

// 'all' keeps every order; otherwise only orders with that status.
export const filterByStatus = (orders, statusId) =>
  statusId === 'all' ? orders : orders.filter((order) => order.status === statusId);

// How many orders have each status, e.g. { all: 5, new: 2, preparing: 1, ready: 1, completed: 1 }
export const countByStatus = (orders) => {
  const counts = { all: orders.length };
  ORDER_STATUSES.forEach((status) => {
    counts[status.id] = 0;
  });
  orders.forEach((order) => {
    if (ORDER_STATUSES.some((status) => status.id === order.status)) counts[order.status] += 1;
  });
  return counts;
};
