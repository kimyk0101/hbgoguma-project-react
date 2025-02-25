import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dummyUsers from "./dummyUsers";

const allDongs = {
  1: [
    "개포1동",
    "개포2동",
    "개포3동",
    "개포4동",
    "논현1동",
    "논현2동",
    "대치1동",
    "대치2동",
    "대치4동",
    "삼성1동",
    "삼성2동",
    "도곡1동",
    "도곡2동",
    "세곡동",
    "수서동",
    "신사동",
    "압구정동",
    "역삼1동",
    "역삼2동",
    "일원동",
    "일원본동",
    "청담동",
  ],
  2: [
    "내곡동",
    "방배1동",
    "방배2동",
    "방배3동",
    "방배4동",
    "방배본동",
    "서초1동",
    "서초2동",
    "서초3동",
    "서초4동",
    "반포동",
    "양재1동",
    "양재2동",
    "잠원동",
  ],
};

const JoinPage = () => {
  //@note - 회원 정보 URL
  const API_USER_URL = `http://localhost:18090/api/gogumauser`;

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    password: "",
    tel_number: "",
    email: "",
    loca_gu: 1,
    loca_dong: "",
    thumbnail: "",
    recommend_uid: "", // 추천인 ID (기본값 0)
    pumpkin_point: 1000, // 기본 포인트 값
    user_rate: 3500, // 기본 사용자 지수
    register_date: new Date().toISOString(), // 현재 날짜로 기본값 설정
    is_deleted: false, // 탈퇴 여부
    is_admin: false, // 관리자 여부
    upd_date: new Date().toISOString(), // 기본 업데이트 시간
  });

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  const checkUsernameAvailability = () => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(formData.name)) {
      alert("아이디는 6자 이상 영문, 숫자 조합이어야 합니다.");
      return;
    }
    const isTaken = dummyUsers.some((user) => user.name === formData.name);
    setIsUsernameAvailable(!isTaken);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // setPasswordStrength(passwordRegex.test(password) ? "강함" : "약함");
    setPasswordStrength(
      passwordRegex.test(password)
        ? "보안성 : 강함"
        : "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData({ ...formData, confirmPassword });
    setPasswordMatch(formData.password === confirmPassword);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{11}$/;

    if (!formData.name) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!nicknameRegex.test(formData.nickname)) {
      alert("닉네임에는 특수문자를 사용할 수 없습니다.");
      return;
    }
    if (!formData.telNumber.match(phoneRegex)) {
      alert("전화번호는 11자리 숫자만 입력해야 합니다.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      alert("올바른 이메일 형식을 입력하세요. 예: example@domain.com");
      return;
    }
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    }
    if (isUsernameAvailable === false) {
      alert("아이디 중복 확인이 필요합니다.");
      return;
    }

    // 회원가입 처리
    fetch(API_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/loginPage");
  };

  useEffect(() => {
    // loca_gu 값이 바뀌면 loca_dong을 해당 구의 첫 번째 동네로 업데이트
    const firstDong = allDongs[formData.loca_gu]?.[0] || "";
    setFormData((prev) => ({ ...prev, loca_dong: firstDong }));
  }, [formData.loca_gu]);

  return (
    <div className="join-container">
      <h2 className="join-h2">회원가입</h2>
      <form className="join-form" onSubmit={handleSignup}>
        <label>아이디:</label>
        <input
          type="text"
          placeholder="6자 이상 영문, 숫자 조합"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <button type="button" onClick={checkUsernameAvailability}>
          중복 확인
        </button>
        {isUsernameAvailable !== null && (
          <span>{isUsernameAvailable ? "사용 가능" : "사용 불가"}</span>
        )}
        <label>닉네임:</label>
        <input
          type="text"
          placeholder="2~10자 특수문자 제외"
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
        <span>{passwordStrength}</span>
        <label>비밀번호 확인:</label>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={formData.confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {passwordMatch !== null && (
          <span style={{ color: passwordMatch ? "green" : "red" }}>
            {passwordMatch ? "비밀번호 일치" : "비밀번호 불일치"}
          </span>
        )}
        <label>전화번호:</label>
        <input
          type="text"
          placeholder="- 없이 숫자만 입력"
          value={formData.telNumber}
          onChange={(e) =>
            setFormData({ ...formData, telNumber: e.target.value })
          }
        />
        <label>이메일:</label>
        <input
          type="email"
          placeholder="올바른 이메일 형식을 입력하세요"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="button" onClick={() => setIsEmailVerified(true)}>
          이메일 인증
        </button>
        {isEmailVerified && <span>인증 완료</span>}
        <label>구 위치:</label>
        <select
          value={formData.loca_gu}
          onChange={(e) =>
            setFormData({ ...formData, loca_gu: e.target.value })
          }
        >
          <option value="1">강남구</option>
          <option value="2">송파구</option>
        </select>
        <label>동 위치:</label>
        <select
          value={formData.loca_dong}
          onChange={(e) =>
            setFormData({ ...formData, loca_dong: e.target.value })
          }
        >
          {allDongs[formData.loca_gu].map((dong, index) => (
            <option key={index} value={dong}>
              {dong}
            </option>
          ))}
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
