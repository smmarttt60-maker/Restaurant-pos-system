import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../components/orders/OrderCard';
import OrderDetailModal from '../components/orders/OrderDetailModal';
import StatusFilter from '../components/orders/StatusFilter';
import { useOrders } from '../context/OrdersContext';
import { getOrdersForView } from '../utilis/orderLogic';
import { countByStatus, filterByStatus } from '../utilis/statusLogic';
import { getStatusLabel } from '../constants/orderStatuses';

const VIEWS = [
  { id: 'today', label: 'Today' },
  { id: 'all', label: 'All orders' },
];

// What to tell the cashier when a status change did not go through normally.
const NOTICES = {
  changed: 'This order was already updated somewhere else. The latest status is shown.',
  failed: 'Could not save the change on this device. The order was not updated. Please try again.',
  'not-found': 'This order could not be found.',
  finished: 'This order is already completed.',
};

const Orders = () => {
  const { orders, advanceOrderStatus } = useOrders();
  const [view, setView] = useState('today');
  const [selectedId, setSelectedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [notice, setNotice] = useState('');

  // Worked out from the saved orders each time, never stored separately
  const viewOrders = getOrdersForView(orders, view, new Date());
  const counts = countByStatus(viewOrders);
  const visibleOrders = filterByStatus(viewOrders, statusFilter);
  const selectedOrder = orders.find((order) => order.id === selectedId);

  // Move an order to its next status, and tell the cashier if it did not work.
  const handleAdvance = (order) => {
    const result = advanceOrderStatus(order.id, order.status);
    setNotice(NOTICES[result] ?? '');
  };

  return (
    <section className="bg-[#1f1f1f] md:h-[calc(100vh-5rem)] md:overflow-y-auto scrollbar-hide px-4 py-4 pb-24 md:px-8 md:py-6">
      <div className="max-w-4xl">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Orders</h1>
          <div className="flex gap-3">
            {VIEWS.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`px-5 py-2.5 md:py-2 rounded-lg font-semibold whitespace-nowrap ${
                  view === item.id ? 'bg-[#f6b100] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#ababab]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <StatusFilter counts={counts} selected={statusFilter} onSelect={setStatusFilter} />

        {notice && (
          <div
            role="alert"
            className="mt-4 flex justify-between items-start gap-3 bg-[#2a1a1a] border border-red-400 text-red-300 text-sm rounded-lg px-4 py-3"
          >
            <span>{notice}</span>
            <button onClick={() => setNotice('')} className="font-semibold whitespace-nowrap">
              Dismiss
            </button>
          </div>
        )}

        <p className="text-[#ababab] text-sm mt-3">
          {visibleOrders.length} {visibleOrders.length === 1 ? 'order' : 'orders'}
        </p>

        {visibleOrders.length === 0 && statusFilter !== 'all' ? (
          <p className="text-[#ababab] text-center mt-16">
            No {getStatusLabel(statusFilter).toLowerCase()} orders{view === 'today' ? ' today' : ''}.
          </p>
        ) : visibleOrders.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-[#ababab]">
              {view === 'today' ? 'No orders placed today yet.' : 'No orders placed yet.'}
            </p>
            <Link to="/menu" className="inline-block mt-4 bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg px-5 py-3 md:py-2">
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            {visibleOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onSelect={setSelectedId}
                onAdvance={handleAdvance}
                showDate={view === 'all'}
              />
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedId(null)}
          onAdvance={handleAdvance}
        />
      )}
    </section>
  );
};

export default Orders;
