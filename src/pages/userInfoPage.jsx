// @TODO - 유저 정보 페이지 구현
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import "../css/header.css";
import "../css/footer.css";
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마
import spEmpty from "../resources/images/sweet-potato-Empty.png"; // 색이 없는 고구마

export default function UserInfoPage() {
  const [selectedTab, setSelectedTab] = useState("판매 중인 상품");
  // const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태 추가
  // const [contentImage, setContentImage] = useState(null);
  // const [description, setDescription] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  const [sellPostList, setSellPostList] = useState([]);

  const navigate = useNavigate();

  // 파일 업로드 핸들러(썸네일 저장)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
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

  //  로그인 유저 정보 받아오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:18090/api/gogumauser/session",
          {
            withCredentials: true, // 쿠키 포함 (세션 기반 인증 시 필요)
          }
        );

        console.log("서버 응답 데이터:", response.data);

        if (!response.data.uid) {
          console.error("🚨 유저 UID가 없습니다.");
          return;
        }

        setCurrentUser(response.data);

        if (response.data.thumbnail) {
          setThumbnail(response.data.thumbnail);
        }

        // ✅ 로그인한 유저 UID를 기반으로 게시글 요청
        fetchPostData(response.data.uid);
      } catch (error) {
        console.error(
          "🔴 로그인한 사용자 데이터를 불러오는 중 오류 발생:",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedTab === "나의 평가" && currentUser?.uid) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:18090/api/gogumareview?seller_uid=${currentUser.uid}`
          );
          console.log("🟢 리뷰 데이터:", response.data);
          setReviews(response.data);
        } catch (error) {
          console.error("🔴 리뷰 데이터를 불러오는 중 오류 발생:", error);
        }
      };
      fetchReviews();
    }
  }, [selectedTab, currentUser?.uid]);

  //  판매중인 상품 게시글 리스트
  const fetchPostData = async (userUid) => {
    if (!userUid) return; // uid 없으면 실행 안 함

    const API_POST_URL = `http://localhost:18090/api/gogumapost`;

    try {
      const response = await fetch(API_POST_URL);
      const data = await response.json();
      console.log("🔍 응답 데이터 확인:", data);

      let postList = Array.isArray(data) ? data : [data];

      // 현재 유저의 uid와 일치하는 게시글만 필터링
      const filteredPosts = postList.filter((post) => {
        console.log("🔍 post.uid:", post.uid);
        console.log("🔍 userUid:", userUid);
        return post.uid === userUid;
      });

      console.log("🔍 필터링된 게시글:", filteredPosts);

      if (filteredPosts.length === 0) {
        console.log("🚨 해당 uid에 맞는 게시글이 없습니다.");
      }

      // 날짜 포맷 변경 후 리스트에 저장
      const formattedPosts = filteredPosts.map((post) => ({
        id: post.pid,
        sellerUid: post.uid,
        title: post.post_title,
        image: post.post_photo,
        reportCnt: post.report_cnt,
        updateTime: post.upd_date
          ? new Date(post.upd_date).toISOString().split("T")[0] // 날짜만 추출
          : "날짜 없음",
      }));

      console.log("🔍 포맷팅된 게시글:", formattedPosts);
      setSellPostList(formattedPosts);
    } catch (error) {
      console.error("🚨 데이터 불러오기 실패:", error);
    }
  };

  if (!currentUser) return <p>사용자 정보를 불러오는 중...</p>;
  // ⭐ review_point를 별 개수로 변환하는 함수 (2000점당 1개, 최대 5개)
  const getStars = (reviewPoint) => {
    const starCount = Math.min(reviewPoint / 2000, 5);
    return "⭐".repeat(starCount);
  };
  // 🔹 게이지 바의 너비를 계산하여 백분위(%) 값에 맞게 조정 (최대 100%)
  const gaugeWidth = `${Math.min(currentUser?.userRate / 100, 100)}%`;

  return (
    <div className="user-info-container">
      <Header />

      {/* 상단 정보 블록 (닉네임 & 사이다 지수 + 본인인증 + 판매/구매 정보) */}
      <div className="user-info-block">
        {/* 썸네일 */}
        <label className="hidden-file-input">
          <input
            type="file"
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
                style={{ width: gaugeWidth }}
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
          </div>
        </div>
      </div>
      {/* 제품 사진 */}

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

      {/* 탭 내용 */}
      <div className="user-info-tab-content">
        {selectedTab === "나의 평가" && (
          <div className="user-reviews">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.hid} className="review-item">
                  <p className="review-content">{review.review_content}</p>
                  <div className="review-sweet-potato">
                    {Array(5) // 5개 고구마 배치
                      .fill()
                      .map((_, index) => (
                        <img
                          style={{ width: "40px", height: "40px" }}
                          key={index}
                          src={
                            index < review.review_point / 2000
                              ? spFilled
                              : spEmpty
                          } // 2000점 = 1개
                          alt="sweet potato"
                          className="sweet-potato-icon"
                        />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <p>아직 받은 평가가 없습니다.</p>
            )}
          </div>
        )}

        {selectedTab === "판매 중인 상품" && (
          <div className="sell-post-list">
            {sellPostList.length > 0 ? (
              sellPostList.map((post) => (
                <div key={post.id} className="sell-post-item">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="sell-post-img"
                  />
                  <div className="sell-post-info">
                    <h3>{post.title}</h3>
                    <p>판매자 UID: {post.sellerUid}</p>
                    <p>신고 수: {post.reportCnt}</p>
                    <p>업데이트 날짜: {post.updateTime}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>판매 중인 상품이 없습니다.</p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
