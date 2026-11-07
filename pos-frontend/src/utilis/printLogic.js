// Turns a saved order into the exact text to print. Plain functions (no React),
// so they are easy to test. Everything comes from the SAVED order, never from the
// live menu, so a reprint always matches what the customer was originally told.
import { getOrderTypeLabel } from '../constants/orderTypes.js';
import { formatOrderNumber } from './orderLogic.js';
import { formatPrice } from './formatPrice.js';
import { formatDateTime } from './formatDate.js';

const isWholeNumber = (value) => Number.isInteger(value) && value >= 0;

// Returns '' if the order is safe to print, otherwise a message for the cashier.
// type is 'receipt' (default) or 'kitchen'.
// Printing wrong money on a customer's receipt is worse than not printing, so a receipt is
// refused when the totals do not add up. The kitchen ticket has no money on it, so it only
// needs readable items: a money problem must never stop food from reaching the kitchen.
export const getPrintProblem = (order, type = 'receipt') => {
  if (!order || typeof order !== 'object') return 'There is no order to print.';

  const { items } = order;
  if (!Array.isArray(items) || items.length === 0) {
    return 'This order has no items, so it cannot be printed.';
  }
  const itemsAreValid = items.every(
    (item) =>
      item &&
      typeof item.name === 'string' &&
      isWholeNumber(item.price) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
  if (!itemsAreValid || !Number.isInteger(order.orderNumber)) {
    return 'This order has damaged details, so it cannot be printed.';
  }

  if (type === 'kitchen') return '';

  const itemsTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = order.discountAmount ?? 0;
  const totalsAddUp =
    order.subtotal === itemsTotal &&
    isWholeNumber(discount) &&
    discount <= order.subtotal &&
    order.total === order.subtotal - discount;
  if (!totalsAddUp) return "This order's totals do not add up, so it cannot be printed.";

  return '';
};

// The extra lines under the order type on a customer receipt.
const getReceiptDetailLines = (order) => {
  const details = order.details ?? {};
  if (order.orderType === 'dine-in') return details.tableNumber ? [`Table ${details.tableNumber}`] : [];
  if (order.orderType === 'takeaway') return details.customerName ? [`Name: ${details.customerName}`] : [];
  return [
    details.phone ? `Mobile: ${details.phone}` : '',
    details.address ? `Address: ${details.address}` : '',
  ].filter(Boolean);
};

// Everything the customer receipt shows, already formatted as text.
export const buildReceipt = (order, restaurant) => {
  const discountAmount = order.discountAmount ?? 0;
  const discount = order.discount;
  return {
    restaurantName: restaurant.name,
    address: restaurant.address,
    phone: restaurant.phone,
    footerMessage: restaurant.footerMessage,
    orderNumber: formatOrderNumber(order.orderNumber),
    dateTime: formatDateTime(order.createdAt),
    typeLabel: getOrderTypeLabel(order.orderType),
    detailLines: getReceiptDetailLines(order),
    items: order.items.map((item, index) => ({
      key: `${item.id}-${index}`,
      name: item.name,
      quantity: item.quantity,
      unitPrice: formatPrice(item.price),
      lineTotal: formatPrice(item.price * item.quantity),
    })),
    subtotal: formatPrice(order.subtotal),
    discount:
      discountAmount > 0
        ? {
            label: discount?.type === 'percent' ? `Discount (${discount.value}%)` : 'Discount',
            amount: `- ${formatPrice(discountAmount)}`,
          }
        : null,
    total: formatPrice(order.total),
  };
};

// The kitchen only needs to know what to cook and where it goes: no prices,
// and no customer phone or address.
export const buildKitchenTicket = (order) => {
  const details = order.details ?? {};
  let destination = '';
  if (order.orderType === 'dine-in' && details.tableNumber) destination = `Table ${details.tableNumber}`;
  if (order.orderType === 'takeaway' && details.customerName) destination = details.customerName;

  return {
    orderNumber: formatOrderNumber(order.orderNumber),
    typeLabel: getOrderTypeLabel(order.orderType),
    destination,
    placedAt: formatDateTime(order.createdAt),
    items: order.items.map((item, index) => ({
      key: `${item.id}-${index}`,
      quantity: item.quantity,
      name: item.name,
    })),
    itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

