import React, { useState } from "react";
// import PopularKeywords from "./PopularKeywords";
import "../css/searchBar.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("내가 입력한 검색어 : " + searchTerm);

    navigate(`/?query=${searchTerm}`);
    onSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
