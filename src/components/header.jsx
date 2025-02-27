import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마
import Notification from "./notification";
import AuthStatus from "./AuthStatus";
import PopularKeywords from "./PopularKeywords";
import SearchBar from "./searchBar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // searchTerm 상태 추가

  // AuthStatus에서 로그인 상태 변경 시 호출될 함수
  const handleAuthChange = (status, userData) => {
    setIsLoggedIn(status);
    setUser(userData);
  };
  const handleNavigation = (path) => {
    window.location.href = path;
  };
  const onSearch = () => {
    console.log("검색어:", searchTerm); // 실제 검색 실행 코드 추가
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* 왼쪽: 로고 */}
          <div className="header-logo" onClick={() => handleNavigation("/")}>
            <img src={spFilled} alt="호박고구마 로고" className="logo-image" />
            <h1>호박고구마 </h1>
          </div>

          {/* 오른쪽: 알림 & 로그인 버튼 */}
          <div className="header-buttons">
            {isLoggedIn && user && (
              <Notification isLoggedIn={isLoggedIn} userId={user.user_id} />
            )}
            <AuthStatus onAuthChange={handleAuthChange} />
          </div>
        </div>
        <PopularKeywords
          onKeywordClick={(keyword) => {
            console.log("🔥 검색어 선택됨:", keyword);
            setSearchTerm(keyword);
            onSearch();
          }}
        />
        {/* 💡 검색바를 헤더 내부로 이동 */}
        <div className="search-bar-container">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={onSearch}
          />
        </div>
      </header>
      {/* <PopularKeywords searchTerm={searchTerm} /> */}
    </>
  );
};

export default Header;
