// @TODO - 로그인 페이지 구현
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }
    // @TODO: 실제 로그인 API 연동
    console.log("로그인 시도:", formData);
    navigate("/"); // 로그인 성공 시 메인 페이지로 이동
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <label>아이디:</label>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit">로그인</button>
      </form>

      <div className="login-links">
        <button onClick={() => navigate("/joinPage")}>회원가입</button>
        <p>
          <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
