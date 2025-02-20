import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dummyUsers from "./dummyUsers";

const JoinPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    telNumber: "",
    email: "",
    locaGu: "",
    locaDong: "",
    thumbnail: "",
    recommend_uid: "", // 추천인 ID (기본값 0)
    point: 0, // 기본 포인트 값
    userRate: 0, // 기본 사용자 지수
    registerDate: new Date().toISOString(), // 현재 날짜로 기본값 설정
    isDeleted: false, // 탈퇴 여부
    isAdmin: false, // 관리자 여부
    updateTime: new Date().toISOString(), // 기본 업데이트 시간
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
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/loginPage");
  };

  // 아이디 중복 확인
  // const checkUsernameAvailability = () => {
  //   if (!formData.username) {
  //     alert("아이디를 입력하세요.");
  //     return;
  //   }

  // const isTaken = dummyUsers.some((user) => user.name === formData.name);
  // setIsUsernameAvailable(!isTaken);
  // };

  // const checkUsernameAvailability = async () => {
  //   if (!formData.username) {
  //     alert("아이디를 입력하세요.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post("/api/check-username", {
  //       username: formData.username,
  //     });
  //     setIsUsernameAvailable(response.data.available);
  //   } catch (error) {
  //     console.error("아이디 중복 확인 오류", error);
  //     alert("아이디 중복 확인 중 오류가 발생했습니다.");
  //   }
  // };

  // 비밀번호 강도 체크
  // const handlePasswordChange = (e) => {
  //   const password = e.target.value;
  //   setFormData({ ...formData, password });

  // 비밀번호 강도 체크 로직 (간단한 예시)
  //   if (password.length < 8) {
  //     setPasswordStrength("약함");
  //   } else if (
  //     password.match(/[A-Za-z]/) &&
  //     password.match(/[0-9]/) &&
  //     password.match(/[^A-Za-z0-9]/)
  //   ) {
  //     setPasswordStrength("강함");
  //   } else {
  //     setPasswordStrength("보통");
  //   }
  // };

  // 비밀번호 확인 즉시 반영
  // const handleConfirmPasswordChange = (e) => {
  //   const confirmPassword = e.target.value;
  //   setFormData({ ...formData, confirmPassword });

  //   if (formData.password && confirmPassword) {
  //     setPasswordMatch(formData.password === confirmPassword);
  //   } else {
  //     setPasswordMatch(null);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     setPasswordStrength("비밀번호가 일치하지 않습니다.");
  //     return;
  //   }
  //   alert("회원가입 성공! 로그인 페이지로 이동합니다.");
  //   navigate("/loginPage");

  // try {
  //   const response = await axios.post("/api/join", formData);
  //   if (response.data.success) {
  //     alert("회원가입 성공! 로그인 페이지로 이동합니다.");
  //     navigate("/login");
  //   } else {
  //     alert("회원가입 실패: " + response.data.message);
  //   }
  // } catch (error) {
  //   console.error("회원가입 오류", error);
  //   alert("서버 오류가 발생했습니다.");
  // }
  // };

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
        {/* {isUsernameAvailable !== null && (
          <span style={{ color: isUsernameAvailable ? "green" : "red" }}>
            {isUsernameAvailable
              ? "사용 가능한 아이디입니다."
              : "이미 사용 중인 아이디입니다."}
          </span>
        )} */}

        {/* <label>이름:</label>
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        /> */}

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

//   return (
//     <div className="signup-container">
//       <h2>회원가입</h2>
//       <form onSubmit={handleSubmit}>
//         <label>아이디:</label>
//         <input
//           type="text"
//           value={formData.username}
//           onChange={(e) =>
//             setFormData({ ...formData, username: e.target.value })
//           }
//         />

//         <label>닉네임:</label>
//         <input
//           type="text"
//           value={formData.nickname}
//           onChange={(e) =>
//             setFormData({ ...formData, nickname: e.target.value })
//           }
//         />

//         <label>비밀번호:</label>
//         <input
//           type="password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />

//         <label>비밀번호 확인:</label>
//         <input
//           type="password"
//           value={formData.confirmPassword}
//           onChange={(e) =>
//             setFormData({ ...formData, confirmPassword: e.target.value })
//           }
//         />

//         <div className="button-group">
//           <button type="submit">가입</button>
//           <button type="button" onClick={() => navigate("/login")}>
//             취소
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default JoinPage;
