import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PrintContext } from './PrintContext';
import Receipt from '../components/print/Receipt';
import KitchenTicket from '../components/print/KitchenTicket';
import { getPrintProblem } from '../utilis/printLogic';
import { RESTAURANT_INFO } from '../constants/restaurantInfo';

// Printing works by drawing the receipt / kitchen ticket into a hidden area of the page
// (#print-root). On screen it stays hidden. When the browser prints, the CSS in index.css
// hides the whole app and shows only that area.
const PrintProvider = ({ children }) => {
  const [job, setJob] = useState(null); // { type: 'receipt' | 'kitchen', order }

  // Returns '' when printing started, or a message when the order cannot be printed.
  const printDocument = (type, order) => {
    const problem = getPrintProblem(order, type);
    if (problem) return problem;
    setJob({ type, order });
    return '';
  };

  // Each press creates a new job object, so this runs once per press
  // (and not on first load, because job starts empty).
  useEffect(() => {
    if (job) window.print();
  }, [job]);

  return (
    <PrintContext.Provider value={{ printDocument }}>
      {children}
      {createPortal(
        <div id="print-root" aria-hidden="true">
          {job?.type === 'receipt' && <Receipt order={job.order} restaurant={RESTAURANT_INFO} />}
          {job?.type === 'kitchen' && <KitchenTicket order={job.order} />}
        </div>,
        document.body
      )}
    </PrintContext.Provider>
  );
};

export default PrintProvider;
