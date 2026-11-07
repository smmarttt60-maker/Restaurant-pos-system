// 1600 -> "Rs 1,600"
export const formatPrice = (amount) => `Rs ${amount.toLocaleString('en-PK')}`;
