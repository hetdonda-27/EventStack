import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../Page/Card';
import FilterPanel from '../Categories/Eventfilter';
import { FaFilter } from 'react-icons/fa'; //Add this import for the icon

const SearchAndFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: '',
    category: 'all',
    priceRange: [0, 5000],
    colleges: [],
    dateRange: { start: '', end: '' },
    sortBy: 'date',
  });

  // Sync search query from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, [location]);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/Event');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
        setFilteredEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const applyFilters = () => {
    let results = [...events];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.desc?.toLowerCase().includes(query) ||
          event.category?.toLowerCase().includes(query) ||
          event.college?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.category !== 'all') {
      results = results.filter((event) => event.category === filters.category);
    }

    results = results.filter(
      (event) =>
        event.price >= filters.priceRange[0] && event.price <= filters.priceRange[1]
    );

    if (filters.colleges.length > 0) {
      results = results.filter((event) => filters.colleges.includes(event.college));
    }

    if (filters.dateRange.start) {
      results = results.filter(
        (event) => new Date(event.date) >= new Date(filters.dateRange.start)
      );
    }
    if (filters.dateRange.end) {
      results = results.filter(
        (event) => new Date(event.date) <= new Date(filters.dateRange.end)
      );
    }

    results = sortEvents(results, filters.sortBy);
    setFilteredEvents(results);
  };

  const sortEvents = (events, criteria) => {
    const sortedEvents = [...events];
    switch (criteria) {
      case 'date':
        return sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'price-low':
        return sortedEvents.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedEvents.sort((a, b) => b.price - a.price);
      case 'name':
        return sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sortedEvents;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      priceRange: [0, 5000],
      colleges: [],
      dateRange: { start: '', end: '' },
      sortBy: 'date',
    });
    navigate('/events');
  };

  if (loading)
    return (
      <div className="container mx-auto px-6 text-center py-12">
        <div className="text-gray-600 text-xl animate-pulse">Loading events...</div>
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto px-6 text-center py-12">
        <div className="text-red-600 text-xl">Error: {error}</div>
      </div>
    );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Results Info and Integrated Filter Button */}
        <div className="max-w-4xl mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-center md:text-left">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            {filters.searchQuery && ` for "${filters.searchQuery}"`}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              aria-label="Toggle Filters"
              title="Open filters to refine results"
            >
              <FaFilter className="text-sm" />
              <span className="text-sm font-medium hidden md:inline">Filters</span>
              <span className="text-xs">▼</span>
            </button>
          </div>
        </div>

        {showFilters && (
<div className="animate-slide-in mt-6 md:fixed md:top-0 md:right-0 md:h-full md:w-[350px] md:bg-white md:p-6 md:shadow-2xl md:overflow-y-auto md:z-50">            <FilterPanel
              filters={filters}
              events={events}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}

        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Card
                key={event._id}
                event={event}
                onClick={() => navigate(`/events/${event._id}`)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-xl">No events found matching your criteria</div>
              <button
                onClick={resetFilters}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchAndFilter;