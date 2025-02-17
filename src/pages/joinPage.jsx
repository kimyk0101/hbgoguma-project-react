import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
    location: "강남구",
    referrer: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const navigate = useNavigate();

  const checkUsernameAvailability = () => {
    setIsUsernameAvailable(formData.username.length > 3);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordStrength(password.length > 8 ? "강함" : "약함");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (isUsernameAvailable === false) {
      alert("사용할 수 없는 아이디입니다.");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>아이디:</label>
        <input
          type="text"
          placeholder="6~20자 영문, 숫자 조합"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <button type="button" onClick={checkUsernameAvailability}>
          중복 확인
        </button>
        {isUsernameAvailable !== null && (
          <span>{isUsernameAvailable ? "사용 가능" : "사용 불가"}</span>
        )}

        <label>이름:</label>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <label>닉네임:</label>
        <input
          type="text"
          placeholder="2~10자 입력"
          value={formData.nickname}
          onChange={(e) =>
            setFormData({ ...formData, nickname: e.target.value })
          }
        />

        <label>비밀번호:</label>
        <input
          type="password"
          placeholder="8~20자 영문, 숫자, 특수문자 조합"
          value={formData.password}
          onChange={handlePasswordChange}
        />
        <span>강도: {passwordStrength}</span>

        <label>비밀번호 확인:</label>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <label>전화번호:</label>
        <input
          type="text"
          placeholder="- 없이 숫자만 입력"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        <label>이메일:</label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="button" onClick={() => setIsEmailVerified(true)}>
          이메일 인증
        </button>
        {isEmailVerified && <span>인증 완료</span>}

        <label>위치:</label>
        <select
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        >
          <option value="강남구">강남구</option>
          <option value="송파구">송파구</option>
        </select>

        <label>추천인:</label>
        <input
          type="text"
          placeholder="추천인 아이디 입력 (선택사항)"
          value={formData.referrer}
          onChange={(e) =>
            setFormData({ ...formData, referrer: e.target.value })
          }
        />

        <div className="button-group">
          <button type="submit">가입</button>
          <button type="button" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinPage;
