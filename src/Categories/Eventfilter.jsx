import { FaTimes } from "react-icons/fa";

const EventFilter = ({ filters, events, onUpdateFilters, onResetFilters, onClose }) => {
  // Extract unique categories and colleges for filter options
  const categories = ["all", ...new Set(events.map(event => event.category))];
  const colleges = [...new Set(events.map(event => event.college))];

  // Handle college selection
  const handleCollegeSelect = (college) => {
    const updatedColleges = filters.colleges.includes(college)
      ? filters.colleges.filter(c => c !== college)
      : [...filters.colleges, college];
    
    onUpdateFilters({ colleges: updatedColleges });
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Reset All
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onUpdateFilters({ category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">₹0</span>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => onUpdateFilters({ 
                priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-500">₹5000</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Min: ₹{filters.priceRange[0]}</span>
            <span>Max: ₹{filters.priceRange[1]}</span>
          </div>
        </div>
        
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">From</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => onUpdateFilters({ 
                  dateRange: {...filters.dateRange, start: e.target.value} 
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">To</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => onUpdateFilters({ 
                  dateRange: {...filters.dateRange, end: e.target.value} 
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* College Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Colleges</label>
          <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
            {colleges.map(college => (
              <div key={college} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`college-${college}`}
                  checked={filters.colleges.includes(college)}
                  onChange={() => handleCollegeSelect(college)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={`college-${college}`} className="ml-2 text-sm text-gray-700">
                  {college}
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {filters.colleges.length} selected
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;