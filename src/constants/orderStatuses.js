// Where an order is in its life, in order. An order moves one step at a time.
// nextLabel is the text of the button that moves it to the following step.
export const ORDER_STATUSES = [
  { id: 'new', label: 'New', textClass: 'text-[#f6b100]', nextLabel: 'Start preparing' },
  { id: 'preparing', label: 'Preparing', textClass: 'text-[#4da3ff]', nextLabel: 'Mark as ready' },
  { id: 'ready', label: 'Ready', textClass: 'text-[#02ca3a]', nextLabel: 'Complete order' },
  { id: 'completed', label: 'Completed', textClass: 'text-[#ababab]', nextLabel: null },
];

// An unknown status (e.g. from damaged data) still gets a safe plain look.
export const getStatus = (id) =>
  ORDER_STATUSES.find((status) => status.id === id) ?? {
    id,
    label: String(id),
    textClass: 'text-[#ababab]',
    nextLabel: null,
  };

export const getStatusLabel = (id) => getStatus(id).label;
