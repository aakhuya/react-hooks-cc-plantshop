import React from "react";

function Search({ onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e) => onSearchChange(e.target.value)}  // Pass the search value up
      />
    </div>
  );
}

export default Search;
