import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dummyUsers from "./dummyUsers";

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

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate = useNavigate();

  // 아이디 중복 확인
  const checkUsernameAvailability = () => {
    if (!formData.username) {
      alert("아이디를 입력하세요.");
      return;
    }

    const isTaken = dummyUsers.some(
      (user) => user.username === formData.username
    );
    setIsUsernameAvailable(!isTaken);
  };

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
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    // 비밀번호 강도 체크 로직 (간단한 예시)
    if (password.length < 8) {
      setPasswordStrength("약함");
    } else if (
      password.match(/[A-Za-z]/) &&
      password.match(/[0-9]/) &&
      password.match(/[^A-Za-z0-9]/)
    ) {
      setPasswordStrength("강함");
    } else {
      setPasswordStrength("보통");
    }
  };
  // 비밀번호 확인 즉시 반영
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setFormData({ ...formData, confirmPassword });

    if (formData.password && confirmPassword) {
      setPasswordMatch(formData.password === confirmPassword);
    } else {
      setPasswordMatch(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordStrength("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/loginPage");

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
          <span style={{ color: isUsernameAvailable ? "green" : "red" }}>
            {isUsernameAvailable
              ? "사용 가능한 아이디입니다."
              : "이미 사용 중인 아이디입니다."}
          </span>
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

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const JoinPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     nickname: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     email: "",
//     location: "강남구",
//     referrer: "",
//   });
//   const [passwordStrength, setPasswordStrength] = useState("");
//   const [isEmailVerified, setIsEmailVerified] = useState(false);
//   const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
//   const navigate = useNavigate();

//   const checkUsernameAvailability = () => {
//     setIsUsernameAvailable(formData.username.length > 3);
//   };

//   const handlePasswordChange = (e) => {
//     const password = e.target.value;
//     setFormData({ ...formData, password });
//     setPasswordStrength(password.length > 8 ? "강함" : "약함");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       alert("비밀번호가 일치하지 않습니다.");
//       return;
//     }
//     if (!isEmailVerified) {
//       alert("이메일 인증이 필요합니다.");
//       return;
//     }
//     if (isUsernameAvailable === false) {
//       alert("사용할 수 없는 아이디입니다.");
//       return;
//     }
//     navigate("/login");
//   };
