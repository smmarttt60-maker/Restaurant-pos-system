import { createContext, useContext } from 'react';

export const PrintContext = createContext(null);

// printDocument('receipt' | 'kitchen', order) -> '' if printing started,
// otherwise a message to show the cashier.
export const usePrint = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error('usePrint must be used inside <PrintProvider>');
  }
  return context;
};
