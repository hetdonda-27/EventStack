// src/pages/Search.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import data from '../Data/card.json';
import Card from '../Page/Card';
import Eventfilter from './Eventfilter';

const filters = {
  categories: ['all', 'Career', 'Sports', 'Arts & Culture'],
  colleges: ['all', 'ABC College', 'XYZ University', 'DEF Institute'],
  prices: ['all', 'Free', 'Paid']
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = useQuery().get('query') || '';
  const [filterstate, setFilterstate] = useState({
    category: 'all',
    college: 'all',
    price: 'all',
    startDate: '',
    endDate: '',
    sort: 'none'
  });

  const [results, setResults] = useState([]);

  useEffect(() => {
    let filtered = data.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );

    // Category filter
    if (filterstate.category !== 'all') {
      filtered = filtered.filter(event => event.category === filterstate.category);
    }


    // College filter
    if (filterstate.college !== 'all') {
      filtered = filtered.filter(event => event.college === filterstate.college);
    }

    // Price filter
    if (filterstate.price !== 'all') {
      if (filterstate.price === 'Free') {
        filtered = filtered.filter(event => event.price === 0 || event.price === 'Free');
      } else {
        filtered = filtered.filter(event => event.price > 0 || event.price === 'Paid');
      }
    }

    // Date filter
    if (filterstate.startDate) {
      filtered = filtered.filter(event => event.date >= filterstate.startDate);
    }
    if (filterstate.endDate) {
      filtered = filtered.filter(event => event.date <= filterstate.endDate);
    }

    // Sort filter
    if (filterstate.sort === 'low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filterstate.sort === 'high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setResults(filtered);
  }, [query, filterstate]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-semibold mb-6">
          Search Results for: <span className="text-indigo-600">{query}</span>
        </h2>

        <Eventfilter
          filters={filters}
          filterstate={filterstate}
          setFilterstate={setFilterstate}
        />

        {results.length > 0 ? (
          <Card events={results} />
        ) : (
          <div className="text-center text-gray-500 mt-6">No events found.</div>
        )}
      </div>
    </section>
  );
};

export default Search;
