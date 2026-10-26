import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CategoryTabs from '../components/menu/CategoryTabs';
import MenuCard from '../components/menu/MenuCard';
import Cart from '../components/menu/Cart';
import { menuItems, menuCategories } from '../constants/menuItems';

const Menu = () => {
  // Two pieces of state: what the user picked and what they typed.
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchText, setSearchText] = useState('');

  // The list on screen is calculated from the full menu on every render.
  // An item is shown only if it passes BOTH checks.
  const visibleItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] flex gap-3">
      {/* Left: the menu (scrolls by itself) */}
      <div className="flex-[3] overflow-y-auto scrollbar-hide px-8 py-6 pb-24">
        <div className="flex justify-between items-center">
          <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">Menu</h1>
          <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-[15px] px-5 py-2 w-[300px]">
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
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
            {visibleItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Right: the current order */}
      <Cart />
    </section>
  );
};

export default Menu;
