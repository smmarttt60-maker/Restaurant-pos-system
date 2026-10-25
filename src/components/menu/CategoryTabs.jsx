const CategoryTabs = ({ categories, selected, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide mt-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-2 rounded-lg font-semibold whitespace-nowrap ${
            selected === category
              ? 'bg-[#f6b100] text-[#1a1a1a]'
              : 'bg-[#1a1a1a] text-[#ababab]'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
