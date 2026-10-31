import { useState } from 'react';
import { Link } from 'react-router-dom';
import OrderCard from '../components/orders/OrderCard';
import OrderDetailModal from '../components/orders/OrderDetailModal';
import { useOrders } from '../context/OrdersContext';
import { getOrdersForView } from '../utilis/orderLogic';

const VIEWS = [
  { id: 'today', label: 'Today' },
  { id: 'all', label: 'All orders' },
];

const Orders = () => {
  const { orders } = useOrders();
  const [view, setView] = useState('today');
  const [selectedId, setSelectedId] = useState(null);

  // Worked out from the saved orders each time, never stored separately
  const visibleOrders = getOrdersForView(orders, view, new Date());
  const selectedOrder = orders.find((order) => order.id === selectedId);

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

        <p className="text-[#ababab] text-sm mt-3">
          {visibleOrders.length} {visibleOrders.length === 1 ? 'order' : 'orders'}
        </p>

        {visibleOrders.length === 0 ? (
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
              <OrderCard key={order.id} order={order} onSelect={setSelectedId} showDate={view === 'all'} />
            ))}
          </div>
        )}
      </div>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedId(null)} />
      )}
    </section>
  );
};

export default Orders;
