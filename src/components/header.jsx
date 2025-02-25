// import React from "react";
// import "../css/header.css";

// const Header = () => {
//   const handleNavigation = (path) => {
//     window.location.href = path;
//   };

//   return (
//     <header className="header">
//       <div className="header-container">
//         {/* 중앙: 로고 */}
//         <h1 className="header-logo" onClick={() => handleNavigation("/")}>
//           호박고구마
//         </h1>

//         {/* 오른쪽: 회원가입 & 로그인 버튼 */}
//         <div className="header-buttons">
//           <button
//             className="header-btn"
//             onClick={() => handleNavigation("/joinPage")}
//           >
//             회원가입
//           </button>
//           <button
//             className="header-btn"
//             onClick={() => handleNavigation("/loginPage")}
//           >
//             로그인
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import "../css/header.css";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마
import axios from "axios";

const Header = () => {
  const [notifications, setNotifications] = useState([]); // 알림 데이터
  const [isVisible, setIsVisible] = useState(false); // 알림 목록 표시 여부

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // 더미 알림 데이터
  const fetchNotifications = async () => {
    try {
      const dummyData = [
        { id: 1, message: "📢 새로운 구매 요청이 있습니다!", isRead: false },
        { id: 2, message: "✅ 거래가 확정되었습니다!", isRead: false },
        {
          id: 3,
          message: "📫 판매글에 새로운 댓글이 추가되었습니다!",
          isRead: false,
        },
      ];

      // 🔹 실제 API 연동 시 사용
      // const response = await axios.get("http://localhost:18090/api/notifications/1");
      // setNotifications(response.data);

      setNotifications(dummyData); // 더미 데이터 저장
    } catch (error) {
      console.error("알림 데이터를 불러오는 중 오류 발생:", error);
    }
  };
  // ✅ 페이지 로드 시 자동으로 알림 가져오기
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 알림 버튼 클릭 시 목록 표시/숨기기
  // const toggleNotifications = () => {
  //   if (!isVisible) {
  //     fetchNotifications(); // 새 알림을 가져옴
  //   }
  //   setIsVisible(!isVisible);
  // };
  // ✅ 버튼 클릭 시 목록 표시/숨기기
  const toggleNotifications = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* 왼쪽: 로고 */}
        <div className="header-logo" onClick={() => handleNavigation("/")}>
          <img
            src="src/resources/images/sweet-potato-Filled.png"
            alt="호박고구마 로고"
            className="logo-image"
          />
          <h1>
            호박고구마{" "}
            <img
              src="src/resources/images/sweet-potato-Filled.png"
              alt="호박고구마 로고"
              className="Elogo-image"
            />
          </h1>
        </div>

        {/* 오른쪽: 회원가입 & 로그인 버튼 */}
        <div className="header-buttons">
          <button className="notification-button" onClick={toggleNotifications}>
            🔔{notifications.length > 0 && `(${notifications.length})`}
          </button>
          {/* 📌 알림 드롭다운 */}
          {/* {isVisible && (
            <div className="notification-dropdown">
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((notification, index) => (
                    <li key={`${notification.id}-${index}`}>
                      {notification.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>📭 새로운 알림이 없습니다.</p>
              )}
            </div>
          )} */}
          {isVisible && (
            <div
              className={`notification-dropdown ${isVisible ? "active" : ""}`}
            >
              {notifications.length > 0 ? (
                <ul>
                  {notifications.map((notification) => (
                    <li key={notification.id}>{notification.message}</li>
                  ))}
                </ul>
              ) : (
                <p>📭 새로운 알림이 없습니다.</p>
              )}
            </div>
          )}

          <button
            className="header-btn"
            onClick={() => handleNavigation("/joinPage")}
          >
            회원가입
          </button>
          <button
            className="header-btn"
            onClick={() => handleNavigation("/loginPage")}
          >
            로그인
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
