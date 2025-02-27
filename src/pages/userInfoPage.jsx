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

  const Gu = {
    1: "강남구",
    2: "서초구",
  };

  const Dong = {
    1: "개포1동",
    2: "개포2동",
    3: "개포3동",
    4: "개포4동",
    5: "논현1동",
    6: "논현2동",
    7: "대치1동",
    8: "대치2동",
    9: "대치4동",
    10: "도곡1동",
    11: "도곡2동",
    12: "삼성1동",
    13: "삼성2동",
    14: "세곡동",
    15: "수서동",
    16: "신사동",
    17: "압구정동",
    18: "역삼1동",
    19: "역삼2동",
    20: "일원1동",
    21: "일원본동",
    22: "청담동",
    23: "내곡동",
    24: "반포1동",
    25: "반포2동",
    26: "반포3동",
    27: "반포4동",
    28: "반포본동",
    29: "방배1동",
    30: "방배2동",
    31: "방배3동",
    32: "방배4동",
    33: "방배본동",
    34: "서초1동",
    35: "서초2동",
    36: "서초3동",
    37: "서초4동",
    38: "양재1동",
    39: "양재2동",
    40: "잠원동",
  };

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

  // 로그인 유저 정보 받아오기
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
            "http://localhost:18090/api/gogumareview"
          );
          console.log("리뷰 데이터:", response.data);

          // 로그인한 사용자(user.uid)와 seller_uid가 같은 리뷰만 필터링
          const filteredReviews = response.data.filter(
            (review) => review.seller_uid === currentUser.uid
          );

          setReviews(filteredReviews);
        } catch (error) {
          console.error("리뷰 데이터를 불러오는 중 오류 발생: ", error);
        }
      };
      fetchReviews();
    }
  }, [selectedTab, currentUser]);

  // 판매중인 상품 게시물 리스트
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

  // 판매 중인 게시글 -> 페이지 이동
  const handleSellPost = (pid) => {
    navigate(`/${pid}`);
  };

  // 판매자 평점 -> 매너 사이다
  const getCiderColor = (score) => {
    if (score < 30) return "#F97316"; // 주황
    if (score < 60) return "#A3E635"; // 라임 그린
    if (score < 90) return "#4BC0C8"; // 청록
    return "#0350e0"; // 블루
  };

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
          {/* 왼쪽: 닉네임 + 지역 */}
          <div className="user-info-text">
            <span className="nickname">{currentUser?.nickname}</span>
            <span className="user-info-location">
              {Gu[currentUser?.loca_gu]}, {Dong[currentUser?.loca_dong]}
            </span>
          </div>

          {/* 오른쪽: 사이다 매너지수 */}
          <div className="user-info-cider-container">
            <div
              className="user-info-cider-liquid"
              style={{
                height: `${(currentUser?.user_rate ?? 0) / 100}%`, // 100점 만점 변환
                backgroundColor: getCiderColor(
                  (currentUser?.user_rate ?? 0) / 100
                ), // 색상 변경
              }}
            />
            <div className="user-info-cider-label">
              {(currentUser?.user_rate ?? 0) / 100}L
            </div>
          </div>
        </div>

        {/* 본인인증 + 판매/구매/포인트 정보 */}
        <div className="user-stats">
          <p className="user-info-verified">✅ 본인인증 완료</p>
          <div className="user-info-stats">
            <p>📦 판매: {sellPostList.length || 0}회</p>
            <p>🛒 구매: {currentUser?.purchases || 0}회</p>
            <p>
              🎃 포인트: {(currentUser?.pumpkin_point || 0).toLocaleString()}P
            </p>
            <p>📧 이메일: {currentUser?.email}</p>
            <p>📞 연락처: {currentUser?.tel_number}</p>
          </div>
        </div>
      </div>

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

        {selectedTab === "구매 중인 상품" && <p>구매 중인 상품이 없습니다.</p>}
      </div>
      <Footer />
    </div>
  );
}
