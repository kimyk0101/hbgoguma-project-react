import React, { useState } from "react";
import PopularKeywords from "./PopularKeywords";
import "../css/searchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
        className="search-input"
      />
      <button className="search-button" onClick={onSearch}>
        <FaSearch />
      </button>
    </div>
  );
};
// const SearchBar = ({ onSearch }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleSearchClick = () => {
//     onSearch(inputValue);
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="검색어를 입력하세요..."
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         className="search-input"
//       />
//       <button className="search-button" onClick={handleSearchClick}>
//         검색
//       </button>
//       <PopularKeywords onSelectKeyword={setInputValue} onSearch={onSearch} />
//     </div>
//   );
// };

export default SearchBar;
