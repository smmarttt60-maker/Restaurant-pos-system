import { ORDER_STATUSES } from '../../constants/orderStatuses';

const OPTIONS = [{ id: 'all', label: 'All' }, ...ORDER_STATUSES];

// A row of buttons to show only orders with one status. Each shows how many there are.
const StatusFilter = ({ counts, selected, onSelect }) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-4">
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`px-4 py-2.5 md:py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${
            selected === option.id ? 'bg-[#f6b100] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#ababab]'
          }`}
        >
          {option.label} {counts[option.id] ?? 0}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;
