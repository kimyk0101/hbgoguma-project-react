import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyUsers from "./dummyUsers";
import logoImage from "../resources/images/sweet-potato-Filled.png"; // 로고이미지
import { MdOutlineBackspace } from "react-icons/md"; // 뒤로가기


const allDongs = {
  1: [
    [1, "개포1동"],
    [2, "개포2동"],
    [3, "개포3동"],
    [4, "개포4동"],
    [5, "논현1동"],
    [6, "논현2동"],
    [7, "대치1동"],
    [8, "대치2동"],
    [9, "대치4동"],
    [10, "삼성1동"],
    [11, "삼성2동"],
    [12, "도곡1동"],
    [13, "도곡2동"],
    [14, "세곡동"],
    [15, "수서동"],
    [16, "신사동"],
    [17, "압구정동"],
    [18, "역삼1동"],
    [19, "역삼2동"],
    [20, "일원1동"],
    [21, "일원본동"],
    [22, "청담동"],
  ],
  2: [
    [23, "내곡동"],
    [24, "반포1동"],
    [25, "반포2동"],
    [26, "반포3동"],
    [27, "반포4동"],
    [28, "반포본동"],
    [29, "방배1동"],
    [30, "방배2동"],
    [31, "방배3동"],
    [32, "방배4동"],
    [33, "방배본동"],
    [34, "서초1동"],
    [35, "서초2동"],
    [36, "서초3동"],
    [37, "서초4동"],
    [38, "양재1동"],
    [39, "양재2동"],
    [40, "잠원동"],
  ],
};



const JoinPage = () => {
  //@note - 회원 정보 URL
  const API_USER_URL = `http://localhost:18090/api/gogumauser`;

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    user_id: "",
    password: "",
    confirmPassword: "",
    tel_number: "",
    email: "",
    loca_gu: 1,
    loca_dong: 1,
    thumbnail: "",
    recommend_uid: "", // 추천인 ID (기본값 0)
    pumpkin_point: 1000, // 기본 포인트 값
    user_rate: 3500, // 기본 사용자 지수
    register_date: new Date().toISOString(), // 현재 날짜로 기본값 설정
    is_deleted: false, // 탈퇴 여부
    is_admin: false, // 관리자 여부
    upd_date: new Date().toISOString(), // 기본 업데이트 시간
  });

  const [allUserData, setAllUserData] = useState([]);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  // 뒤로가기 버튼
const onBack = () => {
  navigate("/");
};

  useEffect(() => {
    // 회원 정보 불러오기
    fetch(API_USER_URL)
      .then((response) => response.json())
      .then((data) => setAllUserData(data))
      .catch((error) => console.error("회원 정보 불러오기 오류", error));
  }, []);

  const checkUserIdAvailability = () => {
    const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!usernameRegex.test(formData.user_id)) {
      alert("아이디는 6자 이상 영문, 숫자 조합이어야 합니다.");
      return;
    }
    const isTaken = dummyUsers.some(
      (user) => user.user_id === formData.user_id
    );
    setIsUsernameAvailable(!isTaken);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    if (!formData.tel_number.match(phoneRegex)) {
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

    const { confirmPassword, ...formDataToSend } = formData;

    console.log(
      "name : " +
        formData.name +
        ", " +
        "nickname : " +
        formData.nickname +
        ", " +
        "user_id : " +
        ", " +
        "password : " +
        formData.password +
        ", " +
        "tel_number : " +
        formData.tel_number +
        ", " +
        "email : " +
        formData.email +
        ", " +
        "loca_gu : " +
        formData.loca_gu +
        ", " +
        "loca_dong : " +
        formData.loca_dong +
        ", " +
        "thumbnail : " +
        formData.thumbnail +
        ", " +
        "recommend_uid : " +
        formData.recommend_uid +
        ", " +
        "pumpkin_point : " +
        formData.pumpkin_point +
        ", " +
        "user_rate : " +
        formData.user_rate +
        ", " +
        "register_date : " +
        formData.register_date +
        ", " +
        "is_deleted : " +
        formData.is_deleted +
        ", " +
        "is_admin : " +
        formData.is_admin +
        ", " +
        "upd_date : " +
        formData.upd_date
    );

    // 회원가입 처리
    fetch(API_USER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataToSend),
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
      <button onClick={onBack} className="join-back-button">
        <MdOutlineBackspace />
      </button>
      <div className="join-logo-container">
        <img src={logoImage} alt="호박고구마 로고" className="join-logo" />
        <h1>호박고구마</h1>
      </div>
      <h2 className="join-h2">회원가입</h2>
      <form className="join-form" onSubmit={handleSignup}>
        <label>이름:</label>
        <input
          type="text"
          placeholder="성함"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label>닉네임:</label>
        <input
          type="text"
          placeholder="2~10자 특수문자 제외"
          value={formData.nickname}
          onChange={(e) =>
            setFormData({ ...formData, nickname: e.target.value })
          }
        />
        <label>아이디:</label>
        <input
          type="text"
          placeholder="2~10자 특수문자 제외"
          value={formData.user_id}
          onChange={(e) =>
            setFormData({ ...formData, user_id: e.target.value })
          }
        />
        <button type="button" onClick={checkUserIdAvailability}>
          중복 확인
        </button>
        {isUsernameAvailable !== null && (
          <span>{isUsernameAvailable ? "사용 가능" : "사용 불가"}</span>
        )}
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
          value={formData.tel_number}
          onChange={(e) =>
            setFormData({ ...formData, tel_number: e.target.value })
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
            <option key={index} value={dong[0]}>
              {dong[1]}
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
