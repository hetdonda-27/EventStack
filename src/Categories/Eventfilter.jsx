import React from 'react';

const Eventfilter = ({ filters, filterstate, setFilterstate }) => {
  return (
    <section className="bg-white py-8 shadow-sm">
      <div className="container mx-auto px-9 flex flex-wrap gap-8 items-end">
        {/* Category */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="category-select">
            Category
          </label>
          <div className="relative w-full max-w-xs">
            <select
              id="category-select"
              value={filterstate.category}
              onChange={e => setFilterstate(prev => ({ ...prev, category: e.target.value }))}
              className="block w-full px-3 py-1.5 pr-8 rounded-md border border-indigo-300 bg-gray-100 text-gray-800 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition appearance-none"
            >
              <option value="all">All Categories</option>
              {filters.categories.filter(cat => cat !== 'all').map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 text-sm">
              ▼
            </span>
          </div>
        </div>
        {/* College */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="college-select">
            College
          </label>
          <div className="relative w-full max-w-xs">
            <select
              id="college-select"
              value={filterstate.college}
              onChange={e => setFilterstate(prev => ({ ...prev, college: e.target.value }))}
              className="block w-full px-3 py-1.5 pr-8 rounded-md border border-indigo-300 bg-gray-100 text-gray-800 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition appearance-none"
            >
              <option value="all">All Colleges</option>
              {filters.colleges.filter(col => col !== 'all').map(col => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 text-sm">
              ▼
            </span>
          </div>
        </div>
        {/* Price */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="price-select">
            Price
          </label>
          <div className="relative w-full max-w-xs">
            <select
              id="price-select"
              value={filterstate.price}
              onChange={e => setFilterstate(prev => ({ ...prev, price: e.target.value }))}
              className="block w-full px-3 py-1.5 pr-8 rounded-md border border-indigo-300 bg-gray-100 text-gray-800 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition appearance-none"
            >
              <option value="all">All Prices</option>
              {filters.prices.filter(price => price !== 'all').map(price => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 text-sm">
              ▼
            </span>
          </div>
        </div>
        {/* Sort by Price */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="sort-select">
            Sort by Price
          </label>
          <div className="relative w-full max-w-xs">
            <select
              id="sort-select"
              value={filterstate.sort}
              onChange={e => setFilterstate(prev => ({ ...prev, sort: e.target.value }))}
              className="block w-full px-3 py-1.5 pr-8 rounded-md border border-indigo-300 bg-gray-100 text-gray-800 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition appearance-none"
            >
              <option value="none">Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 text-sm">
              ▼
            </span>
          </div>
        </div>
        {/* Start Date */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="start-date">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={filterstate.startDate}
            onChange={e => setFilterstate(prev => ({ ...prev, startDate: e.target.value }))}
            className="block w-full px-3 py-1.5 rounded-md border border-indigo-300 bg-gray-100 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition"
          />
        </div>
        {/* End Date */}
        <div>
          <label className="block mb-2 text-xs font-semibold text-gray-700" htmlFor="end-date">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={filterstate.endDate}
            onChange={e => setFilterstate(prev => ({ ...prev, endDate: e.target.value }))}
            className="block w-full px-3 py-1.5 rounded-md border border-indigo-300 bg-gray-100 text-xs font-medium shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white transition"
          />
        </div>
      </div>
    </section>
  );
};

export default Eventfilter;