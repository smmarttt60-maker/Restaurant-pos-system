import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CategoryTabs from '../components/menu/CategoryTabs';
import MenuCard from '../components/menu/MenuCard';
import Cart from '../components/menu/Cart';
import { menuItems, menuCategories } from '../constants/menuItems';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utilis/formatPrice';

const Menu = () => {
  // Two pieces of state: what the user picked and what they typed.
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  // Phone only: is the full-screen cart open? (Tablet and up always show the cart.)
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems, total } = useCart();
  // When the cart becomes empty (cleared, last dish removed, or order placed) go back to the menu.
  if (cartOpen && totalItems === 0) setCartOpen(false);

  // The list on screen is calculated from the full menu on every render.
  // An item is shown only if it passes BOTH checks.
  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#1f1f1f] md:h-[calc(100vh-5rem)] md:flex md:gap-3">
      {/* Left: the menu (scrolls by itself) */}
      <div className="md:flex-[3] md:overflow-y-auto scrollbar-hide px-4 py-4 pb-40 md:px-8 md:py-6 md:pb-24">
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:justify-between md:items-center">
          <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Menu</h1>
          <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-[15px] px-5 py-3 md:py-2 w-full md:w-[300px]">
            <FaSearch className="text-[#f5f5f5]" />
            <input
              type="text"
              placeholder="Search dishes"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-[#1a1a1a] outline-none text-[#f5f5f5] w-full"
            />
          </div>
        </div>

        <CategoryTabs
          categories={menuCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {visibleItems.length === 0 ? (
          <p className="text-[#ababab] mt-10 text-center">No dishes found.</p>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 mt-6">
            {visibleItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Phone only: a bar above the bottom navigation that opens the cart */}
      {totalItems > 0 && (
        <div className="md:hidden fixed bottom-16 inset-x-0 z-30 px-4 pb-2">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full flex justify-between items-center bg-[#f6b100] text-[#1a1a1a] font-semibold rounded-lg px-4 py-3 shadow-lg"
          >
            <span>
              View order · {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span>{formatPrice(total)}</span>
          </button>
        </div>
      )}

      {/* Right: the current order */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </section>
  );
};

export default Menu;
