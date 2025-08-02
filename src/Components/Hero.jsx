// src/components/Hero.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="gradient-bg text-white py-16 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Discover Campus Events</h2>
      <p className="text-xl mb-8 opacity-90">Stay connected with your university community</p>
      <div className="max-w-2xl mx-auto">
        <div className="flex bg-white rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search events, clubs, or activities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-4 text-gray-700 focus:outline-none"
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 text-white font-semibold transition-colors"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
