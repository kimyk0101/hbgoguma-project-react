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
  const [currentUser, setCurrentUser] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 상태 추가
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

  //  판매중인 상품 게시물 리스트
  useEffect(() => {
    if (selectedTab === "판매 중인 상품" && currentUser?.uid) {
      const fetchPostData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:18090/api/gogumapost/my/${currentUser.uid}`
          );

          // 날짜 포맷 변경
          const formattedPosts = response.data
            .map((post) => ({
              id: post.pid,
              sellerUid: post.uid,
              title: post.post_title,
              image: post.post_photo,
              reportCnt: post.report_cnt,
              updateTime: post.upd_date
                ? new Date(post.upd_date).toISOString().split("T")[0]
                : "날짜 없음",
            }))
            .sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime)); // 최신순 정렬

          setSellPostList(formattedPosts);
        } catch (error) {
          console.error("🔴 판매 게시글을 불러오는 중 오류 발생:", error);
        }
      };

      fetchPostData();
    }
  }, [selectedTab, currentUser?.uid]);

  //  판매 중인 게시글 -> 페이지 이동
  const handleSellPost = (pid) => {
    navigate(`/${pid}`);
  };

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
          <div className="user-info-sell-post-list">
            {sellPostList.length > 0 ? (
              sellPostList.map((post) => (
                <div
                  key={post.id}
                  className="user-info-sell-post-item"
                  onClick={() => {
                    console.log("클릭된 상품 id:", post.id);
                    handleSellPost(post.id);
                  }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="user-info-sell-post-img"
                  />
                  <div className="user-info-sell-post-info">
                    <span className="user-info-sell-post-title">
                      {post.title}
                    </span>
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
