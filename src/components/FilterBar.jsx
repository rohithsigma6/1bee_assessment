import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEmails } from '../store/emailSlice';
import './FilterBar.css';

const FilterBar = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.emails.filter);
  const [activeFilter, setActiveFilter] = useState(currentFilter);

  const handleFilter = (filter) => {
    dispatch(filterEmails(filter));
    setActiveFilter(filter);
  };

  return (
    <div className="filter-bar">
      <p>Filter by:</p>
      <button
        className={activeFilter === 'all' ? 'active' : ''}
        onClick={() => handleFilter('all')}
      >
        All
      </button>
      <button
        className={activeFilter === 'unread' ? 'active' : ''}
        onClick={() => handleFilter('unread')}
      >
        Unread
      </button>
      <button
        className={activeFilter === 'read' ? 'active' : ''}
        onClick={() => handleFilter('read')}
      >
        Read
      </button>
      <button
        className={activeFilter === 'favorite' ? 'active' : ''}
        onClick={() => handleFilter('favorite')}
      >
        Favorites
      </button>
    </div>
  );
};

export default FilterBar;
