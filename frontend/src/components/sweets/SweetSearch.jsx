import React, { useState } from 'react';
import { useSweet } from '../../context/SweetContext';
import { SWEET_CATEGORIES } from '../../utils/constants';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const SweetSearch = () => {
  const { searchSweets, fetchSweets } = useSweet();
  const [searchParams, setSearchParams] = useState({
    name: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare search parameters
    const params = {};
    if (searchParams.name) params.name = searchParams.name;
    if (searchParams.category) params.category = searchParams.category;
    if (searchParams.minPrice) params.minPrice = parseFloat(searchParams.minPrice);
    if (searchParams.maxPrice) params.maxPrice = parseFloat(searchParams.maxPrice);
    
    if (Object.keys(params).length === 0) {
      fetchSweets();
    } else {
      searchSweets(params);
    }
  };

  const handleClear = () => {
    setSearchParams({
      name: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    fetchSweets();
  };

  const hasFilters = searchParams.name || searchParams.category || searchParams.minPrice || searchParams.maxPrice;

  return (
    <div className="card bg-gradient-to-r from-primary-50 to-pink-50">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={searchParams.name}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="Search sweets by name..."
            />
          </div>
          
          <button
            type="submit"
            className="btn-primary px-8"
          >
            Search
          </button>
          
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="btn-secondary flex items-center space-x-2"
            >
              <FaTimes />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Advanced Filters Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-800"
        >
          <FaFilter />
          <span>{showAdvanced ? 'Hide Filters' : 'Advanced Filters'}</span>
        </button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-xl border">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={searchParams.category}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">All Categories</option>
                {SWEET_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price ($)
              </label>
              <input
                type="number"
                name="minPrice"
                value={searchParams.minPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input-field"
                placeholder="0.00"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price ($)
              </label>
              <input
                type="number"
                name="maxPrice"
                value={searchParams.maxPrice}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="input-field"
                placeholder="100.00"
              />
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {searchParams.name && (
              <span className="badge bg-blue-100 text-blue-800">
                Name: {searchParams.name}
              </span>
            )}
            {searchParams.category && (
              <span className="badge bg-green-100 text-green-800">
                Category: {SWEET_CATEGORIES.find(c => c.value === searchParams.category)?.label}
              </span>
            )}
            {searchParams.minPrice && (
              <span className="badge bg-yellow-100 text-yellow-800">
                Min: ${searchParams.minPrice}
              </span>
            )}
            {searchParams.maxPrice && (
              <span className="badge bg-purple-100 text-purple-800">
                Max: ${searchParams.maxPrice}
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SweetSearch;