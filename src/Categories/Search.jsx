import { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const SearchBar = ({ initialQuery = "", onSearch, onToggleFilters, showFilters = false }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-6">
      <div className="flex bg-white rounded-full shadow-lg overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="Search events, clubs, or activities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-6 py-4 text-gray-700 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-4 text-white font-semibold transition-colors flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
        {showFilters && (
          <button
            type="button"
            onClick={onToggleFilters}
            className={`px-6 py-4 font-semibold transition-colors flex items-center ${
              showFilters 
                ? "bg-indigo-700 text-white" 
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            <FaFilter className="mr-2" /> Filters
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;