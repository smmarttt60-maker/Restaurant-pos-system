// Order rules as plain functions (no React), so they are easy to test.
// All money is whole rupees (PKR).

// ---------- Discount maths ----------

// How many rupees are taken off. Always a whole number between 0 and the subtotal,
// so the total can never go negative.
export const calculateDiscountAmount = (subtotal, discountType, discountValue) => {
  const value = Number(discountValue);
  if (!Number.isFinite(value) || value <= 0) return 0;

  // A percentage is rounded to the nearest whole rupee (10% of Rs 455 = Rs 46)
  const raw = discountType === 'percent' ? (subtotal * value) / 100 : value;
  return Math.min(Math.round(raw), subtotal);
};

export const calculateTotal = (subtotal, discountAmount) => subtotal - discountAmount;

// ---------- Validation ----------

// Pakistani mobile numbers: 0300-1234567, 03001234567, +923001234567, 3001234567
const normalizePhone = (phone) => phone.replace(/[\s-]/g, '');
const isValidMobile = (phone) => /^(\+92|0092|92|0)?3\d{9}$/.test(normalizePhone(phone));

// Returns '' if the discount is fine, otherwise a message for the cashier.
export const validateDiscount = (subtotal, discountType, discountValue) => {
  const text = String(discountValue).trim();
  if (text === '') return '';

  const value = Number(text);
  if (!Number.isFinite(value) || value < 0) return 'Enter a valid discount.';
  if (discountType === 'percent' && value > 100) return 'Percentage cannot be more than 100.';
  if (discountType === 'amount') {
    if (!Number.isInteger(value)) return 'Enter whole rupees.';
    if (value > subtotal) return 'Discount cannot be more than the subtotal.';
  }
  return '';
};

// Checks the whole order. Returns an object of problems, e.g. { tableNumber: '...' }.
// An EMPTY object means the order is valid.
export const validateOrder = ({ items, orderType, details, subtotal, discountType, discountValue }) => {
  const errors = {};

  if (items.length === 0) errors.cart = 'Add at least one dish.';

  if (orderType === 'dine-in') {
    const table = details.tableNumber.trim();
    if (!/^\d+$/.test(table) || Number(table) < 1 || Number(table) > 999) {
      errors.tableNumber = 'Enter a table number (1 to 999).';
    }
  }

  if (orderType === 'delivery') {
    if (!isValidMobile(details.phone)) {
      errors.phone = 'Enter a valid mobile number, e.g. 0300 1234567.';
    }
    if (details.address.trim().length < 5) {
      errors.address = 'Enter the delivery address.';
    }
  }

  const discountError = validateDiscount(subtotal, discountType, discountValue);
  if (discountError) errors.discount = discountError;

  return errors;
};
