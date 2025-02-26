import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/header.css";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마
import Notification from "./notification";
import AuthStatus from "./AuthStatus";
const Header = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* 왼쪽: 로고 */}
        <div className="header-logo" onClick={() => handleNavigation("/")}>
          <img src={spFilled} alt="호박고구마 로고" className="logo-image" />
          <h1>
            호박고구마{" "}
            <img src={spFilled} alt="호박고구마 로고" className="Elogo-image" />
          </h1>
        </div>

        {/* 오른쪽: 알림 & 로그인 버튼 */}
        <div className="header-buttons">
          <Notification />
          <AuthStatus />
        </div>
      </div>
    </header>
  );
};

export default Header;
