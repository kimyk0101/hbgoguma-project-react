// @TODO - 로그인 페이지 구현
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dummyUsers from "./dummyUsers";
import logoImage from "../resources/images/sweet-potato-Filled.png"; // 로고 이미지

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    // 로그인처리 검증
    // if (formData.username && formData.password) {
    //       alert("로그인 성공!");
    //       navigate("/dashboard"); //@TODO - 로그인성공시에 이동할 페이지
    //     } else {
    //       alert("아이디와 비밀번호를 입력하세요.");
    //     }
    //   };

    // 더미 데이터에서 유저 찾기
    const user = dummyUsers.find(
      (u) => u.name === formData.name && u.password === formData.password
    );

    // 더미 데이터에서 유저 찾기 (이메일 기반)
    // const user = dummyUsers.find(
    //   (u) => u.email === formData.email && u.password === formData.password
    // );

    if (user) {
      alert(`환영합니다, ${user.nickname}님!`);
      // localStorage.setItem("loggedInUser", user.username); // 로그인한 사용자 저장
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ uid: user.uid, name: user.name })
      ); //로그인 유저 저장
      navigate("/userInfo"); // 유저 상세 페이지로 이동
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }

    // 실제 서버 요청이 필요할 경우 활성화
    /*
    try {
      const response = await axios.post("/api/login", formData);
      if (response.data.success) {
        alert("로그인 성공!");
        navigate("/userInfo"); 
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 오류", error);
      setError("서버 오류가 발생했습니다.");
    }
    */
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div className="logo-container">
        <img src={logoImage} alt="호박고구마 로고" className="login-logo" />
        <h1>호박고구마</h1>
      </div>
      <form onSubmit={handleLogin}>
        <label>아이디:</label>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>비밀번호:</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        {/* 로그인 오류메시지 출력 */}
        {error && <p className="error-message">{error}</p>}

        <div className="button-group">
          <button type="submit">로그인</button>
          <button type="button" onClick={() => navigate("/joinPage")}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
