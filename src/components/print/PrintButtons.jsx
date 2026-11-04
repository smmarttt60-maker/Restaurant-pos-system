import { useState } from 'react';
import { usePrint } from '../../context/PrintContext';

// "Print receipt" and "Kitchen ticket" buttons for one saved order.
// If the order cannot be printed (damaged data) a message is shown instead.
const PrintButtons = ({ order }) => {
  const { printDocument } = usePrint();
  const [problem, setProblem] = useState('');

  const buttonClass =
    'bg-[#262626] border border-[#343434] text-[#f5f5f5] text-sm font-semibold rounded-lg py-3 md:py-2';

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setProblem(printDocument('receipt', order))} className={buttonClass}>
          Print receipt
        </button>
        <button onClick={() => setProblem(printDocument('kitchen', order))} className={buttonClass}>
          Kitchen ticket
        </button>
      </div>
      {problem && (
        <p role="alert" className="text-red-400 text-sm mt-2">
          {problem}
        </p>
      )}
    </div>
  );
};

export default PrintButtons;
