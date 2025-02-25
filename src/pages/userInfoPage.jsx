// @TODO - 유저 정보 페이지 구현
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dummyUsers from "./dummyUsers";
import Header from "../components/header";
import Footer from "../components/footer";
import "../css/header.css";
import "../css/footer.css";

export default function UserInfoPage() {
  const [selectedTab, setSelectedTab] = useState("판매 중인 상품");
  // const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  // const [contentImage, setContentImage] = useState(null);
  // const [description, setDescription] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // 파일 업로드 핸들러(썸네일 저장)
  // const handleImageUpload = (e, setImageFunc, storageKey) => { // 더미
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setImageFunc(reader.result);
      //   localStorage.setItem(storageKey, reader.result); // 이미지 저장
      // };
      // reader.readAsDataURL(file);
      try {
        const response = await axios.post(
          "http://localhost:18090/api/gogumauser/uploadThumbnail",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setThumbnail(response.data.thumbnailUrl);
        setCurrentUser((prevUser) => ({
          ...prevUser,
          thumbnail: response.data.thumbnailUrl,
        }));
      } catch (error) {
        console.error("썸네일 업로드 중 오류 발생: ", error);
      }
    }
  };

  useEffect(() => {
    // 실제 서버에서 정보 가져오기
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:18090/api/gogumauser"
        );
        console.log("서버 응답 데이터:", response.data);
        setCurrentUser(response.data);
        if (response.data.thumbnail) {
          setThumbnail(response.data.thumbnail);
        }
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생: ", error);
      }
    };
    fetchUserData();
  }, []);

  // 더미 데이터에서 로그인된 사용자 정보 가져오기
  // const loggedInUsername = localStorage.getItem("loggedInUser");
  //   const storedUser = localStorage.getItem("loggedInUser");
  //   if (storedUser) {
  //     const parsedUser = JSON.parse(storedUser); // JSON 파싱
  //     const loggedInUser = dummyUsers.find((u) => u.uid === parsedUser.uid); // uid로 검색
  //     setCurrentUser(loggedInUser || null);

  //     // localStorage에서 썸네일 이미지 불러오기
  //     const savedThumbnail = localStorage.getItem(
  //       `thumbnail_${loggedInUser?.uid}`
  //     );
  //     if (savedThumbnail) setThumbnail(savedThumbnail);
  //   }
  // }, []);

  //   if (loggedInUsername) {
  //     const loggedInUser = dummyUsers.find(
  //       (u) => u.username === loggedInUsername
  //     );
  //     setCurrentUser(loggedInUser || null);
  //   }
  // }, []);

  if (!currentUser) return <p>사용자 정보를 불러오는 중...</p>;

  // 🔹 게이지 바의 너비를 계산하여 백분위(%) 값에 맞게 조정 (최대 100%)
  const gaugeWidth = `${Math.min(currentUser?.userRate / 100, 100)}%`;

  return (
    <div className="user-info-container">
      <Header />
      {/* <button type="button" onClick={() => navigate("/")}> // 메인이동 버튼 잠시 보류
        메인으로
      </button> */}
      {/* <button type="button" onClick={() => navigate("/seller")}>
        리뷰작성
      </button> */}
      {/* 상단 정보 블록 (닉네임 & 사이다 지수 + 본인인증 + 판매/구매 정보) */}
      <div className="user-info-block">
        {/* 썸네일 */}
        <label className="hidden-file-input">
          <input
            type="file"
            // onChange={(e) => handleImageUpload(e, setThumbnail)}
            onChange={(e) =>
              handleImageUpload(e, setThumbnail, `thumbnail_${currentUser.uid}`)
            }
          />
          <div className="user-info-thumb-box">
            {thumbnail ? (
              <img src={thumbnail} alt="Thumbnail" />
            ) : (
              <span>썸네일</span>
            )}
          </div>
        </label>

        {/* 사용자 정보 */}
        <div className="user-info-details">
          <span className="nickname">{currentUser?.nickname}</span>
          <span className="user-info-location">
            {currentUser?.locaGu}
            &nbsp;
            {currentUser?.locaDong}
          </span>
          <div className="user-info-cider-bar-container">
            <span>{(currentUser?.userRate / 100).toFixed(2)}%</span>
            <div className="user-info-cider-bar">
              <div
                className="user-info-cider-fill"
                // style={{ width: `${currentUser.userRate}%` }}
                style={{ width: gaugeWidth }}
                // style={{ width: `${currentUser?.userRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 본인인증 + 판매/구매/포인트 정보 */}
        <div className="user-stats">
          <p className="user-info-verified">✅ 본인인증 완료</p>
          <div className="user-info-stats">
            <p>📦 판매: {currentUser?.sales || 0}회</p>
            <p>🛒 구매: {currentUser?.purchases || 0}회</p>
            <p>💰 포인트: {(currentUser?.point || 0).toLocaleString()}P</p>
            <p>📧 이메일: {currentUser?.email}</p>
            <p>📞 연락처: {currentUser?.telNumber}</p>
            {/* <p>
              📍 주소: {currentUser?.locaGu} {currentUser?.locaDong}
            </p> */}
            {/* <p>📦 판매: {user.salesCount}회</p>
              <p>🛒 구매: {user.purchaseCount}회</p>
              <p>💰 포인트: {currentUser.point}P</p> */}
          </div>
        </div>
      </div>
      {/* 제품 사진 */}
      {/* <label className="image-upload hidden-file-input">
        <input
          type="file"
          onChange={(e) => handleImageUpload(e, setContentImage)}
        />
        <div className="image-box">
          {contentImage ? (
            <img src={contentImage} alt="Content" />
          ) : (
            <span>사진 추가</span>
          )}
        </div>
      </label> */}

      {/* 제품 설명 */}
      {/* <div className="content">
        {isEditing ? (
          <>
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setDescription(e.target.value);
                }
              }}
            />
            <div className="char-count">{description.length} / 300</div>
          </>
        ) : (
          <p>{description || "제품 설명을 입력하세요..."}</p>
        )}
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "저장" : "작성/수정"}
        </button>
      </div> */}

      {/* 버튼식 전환 */}
      <div className="user-info-tabs">
        {["판매 중인 상품", "구매 중인 상품", "나의 평가"].map((tab) => (
          <button
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* <div className="tabs">
          {["판매 중인 상품", "구매 중인 상품", "나의 평가"].map((tab) => (
            <button key={tab} onClick={() => setSelectedTab(tab)}>
              {tab}
            </button>
          ))}
        </div> */}

      <div className="user-info-tab-content">{selectedTab} 내용 표시</div>
      <Footer />
    </div>
  );
}
