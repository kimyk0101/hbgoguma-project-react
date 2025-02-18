// @TODO - 유저 정보 페이지 구현
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyUsers from "./dummyUsers";

export default function UserInfoPage() {
  const [selectedTab, setSelectedTab] = useState("판매 중인 상품");
  // const [ciderScore, setCiderScore] = useState(75);
  // const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [contentImage, setContentImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // 파일 업로드 핸들러
  const handleImageUpload = (e, setImageFunc) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFunc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // 더미 데이터에서 로그인된 사용자 정보 가져오기
    const loggedInUsername = localStorage.getItem("loggedInUser");
    if (loggedInUsername) {
      const loggedInUser = dummyUsers.find(
        (u) => u.username === loggedInUsername
      );
      setCurrentUser(loggedInUser || null);
    }
  }, []);

  if (!currentUser) return <p>사용자 정보를 불러오는 중...</p>;

  return (
    <div className="container">
      {/* 상단 정보 블록 (닉네임 & 사이다 지수 + 본인인증 + 판매/구매 정보) */}
      <div className="user-info-block">
        {/* 썸네일 */}
        <label className="hidden-file-input">
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, setThumbnail)}
          />
          <div className="thumb-box">
            {thumbnail ? (
              <img src={thumbnail} alt="Thumbnail" />
            ) : (
              <span>썸네일</span>
            )}
          </div>
        </label>

        {/* 사용자 정보 */}
        <div className="user-info">
          <span className="nickname">{currentUser.nickname}</span>
          <div className="cider-bar-container">
            <span>{currentUser.ciderScore}%</span>
            <div className="cider-bar">
              <div
                className="cider-fill"
                style={{ width: `${currentUser.ciderScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 본인인증 + 판매/구매/포인트 정보 */}
        <div className="user-stats">
          <p className="verified">✅ 본인인증 완료</p>
          <div className="stats">
            <p>📦 판매: 15회</p>
            <p>🛒 구매: 8회</p>
            <p>💰 포인트: 3,500P</p>
            {/* <p>📦 판매: {user.salesCount}회</p>
              <p>🛒 구매: {user.purchaseCount}회</p>
              <p>💰 포인트: {user.points}P</p> */}
          </div>
          <button type="button" onClick={() => navigate("/mainPage")}>
            메인으로
          </button>
        </div>
      </div>

      {/* 제품 사진 */}
      <label className="image-upload hidden-file-input">
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
      </label>

      {/* 제품 설명 */}
      <div className="content">
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
      </div>

      {/* 버튼식 전환 */}
      <div className="tabs">
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

      <div className="tab-content">{selectedTab} 내용 표시</div>
    </div>
  );
}
