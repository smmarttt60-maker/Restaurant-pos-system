// Turn the saved timestamp (e.g. "2026-10-29T09:05:09.000Z") into text for the cashier,
// shown in the computer's own time zone.
const toDate = (iso) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatTime = (iso) => {
  const date = toDate(iso);
  return date ? date.toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';
};

export const formatDateTime = (iso) => {
  const date = toDate(iso);
  if (!date) return '';
  const day = date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${day}, ${formatTime(iso)}`;
};
