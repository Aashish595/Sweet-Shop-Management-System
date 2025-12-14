import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SweetSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleApply = () => {
    onSearch({
      query: query.trim(),
      category,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    });
  };

  const handleReset = () => {
    setQuery('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({
      query: '',
      category: '',
      minPrice: null,
      maxPrice: null,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      {/* Search Row */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search sweets by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border rounded px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All Categories</option>
          <option value="chocolate">Chocolate</option>
          <option value="cookie">Cookies</option>
          <option value="cake">Cakes</option>
          <option value="candy">Candy</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />

        {/* Apply / Reset Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetSearch;
