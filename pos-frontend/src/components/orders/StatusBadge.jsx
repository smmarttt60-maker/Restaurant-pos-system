import { getStatus } from '../../constants/orderStatuses';

// The small coloured status label (New / Preparing / Ready / Completed).
const StatusBadge = ({ status }) => {
  const { label, textClass } = getStatus(status);
  return (
    <span className={`inline-block bg-[#262626] ${textClass} text-xs font-semibold rounded-lg px-2 py-1`}>
      {label}
    </span>
  );
};

export default StatusBadge;
