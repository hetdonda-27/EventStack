import { useState, useEffect } from 'react';
import data from '../Data/card.json';
import Card from '../Page/Card';
import Eventfilter from './Eventfilter';

const filters = {
  categories: ['all', 'Career', 'Sports', 'Arts & Culture'],
  colleges: ['all', 'ABC College', 'XYZ University', 'DEF Institute'],
  prices: ['all', 'Free', 'Paid']
};

const Categories = () => {
  const [events, setEvents] = useState(data);
  const [filterstate, setFilterstate] = useState({
    category: 'all',
    college: 'all',
    price: 'all',
    startDate: '',
    endDate: '',
    sort: 'none'
  });

  const applyfilters = () => {
    let filtered = data;

    if (filterstate.category !== 'all') {
      filtered = filtered.filter(event => event.category === filterstate.category);
    }
    if (filterstate.college !== 'all') {
      filtered = filtered.filter(event => event.college === filterstate.college);
    }
    if (filterstate.price !== 'all') {
      if (filterstate.price === 'Free') {
        filtered = filtered.filter(event => event.price === 0 || event.price === 'Free');
      } else {
        filtered = filtered.filter(event => event.price > 0 || event.price === 'Paid');
      }
    }
    if (filterstate.startDate) {
      filtered = filtered.filter(event => event.date >= filterstate.startDate);
    }
    if (filterstate.endDate) {
      filtered = filtered.filter(event => event.date <= filterstate.endDate);
    }

    // Sort by price
    if (filterstate.sort === 'low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (filterstate.sort === 'high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setEvents(filtered);
  };

  useEffect(() => {
    applyfilters();
  }, [filterstate]);

  return (
    <>
      <Eventfilter
        filters={filters}
        filterstate={filterstate}
        setFilterstate={setFilterstate}
      />
      <Card events={events} />
    </>
  );
};

export default Categories;