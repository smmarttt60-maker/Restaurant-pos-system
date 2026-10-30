// Where an order is in its life. Only "new" exists for now;
// preparing / ready / completed arrive with status tracking.
export const ORDER_STATUSES = [{ id: 'new', label: 'New' }];

export const getStatusLabel = (id) =>
  ORDER_STATUSES.find((status) => status.id === id)?.label ?? id;
