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

import React from "react";
import "../css/header.css";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마

const Header = () => {
  const handleNavigation = (path) => {
    window.location.href = path;
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
