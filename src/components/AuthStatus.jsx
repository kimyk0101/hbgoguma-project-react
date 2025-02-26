// 로그인/로그아웃(UI)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthStatus({ onAuthChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(
        "http://localhost:18090/api/gogumauser/session",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data);
        onAuthChange(true, data); // 로그인상태 전달
      } else {
        setIsLoggedIn(false);
        setUser(null);
        onAuthChange(false, null); // 로그아웃상태 전달
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setIsLoggedIn(false);
      setUser(null);
      onAuthChange(false, null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그아웃
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:18090/api/gogumauser/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        onAuthChange(false, null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="auth-status">
      {isLoggedIn ? (
        <>
          <span>{user?.user_id}님</span>
          <button className="header-btn" onClick={() => navigate("/userInfo")}>
            내정보
          </button>
          <button className="header-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button
            className="header-btn"
            onClick={() => (window.location.href = "/joinPage")}
          >
            회원가입
          </button>
          <button
            className="header-btn"
            onClick={() => (window.location.href = "/loginPage")}
          >
            로그인
          </button>
        </>
      )}
    </div>
  );
}
