import React from 'react';
import './SearchBar.css';

function SearchBar({ setSearchTerm }) {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search Pokémon..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;
