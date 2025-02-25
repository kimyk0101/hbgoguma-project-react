import React, { useState, useEffect } from "react";
import "../css/productDetailPage.css";
import UserNegoChat from "../components/userNegoChat.jsx"; // 채팅 컴포넌트 임포트
import Footer from "../components/footer";
import Header from "../components/header";
import Advertise from "../components/advertise";
import { MdOutlineBackspace } from "react-icons/md"; // 뒤로가기
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import { useLocation } from "react-router-dom";

const ProductDetailPage = () => {
  const location = useLocation(); // location을 통해 state에서 post 데이터 받기
  const post = location.state?.post; // state가 있을 때 post 데이터 가져오기

  const [newPost, setNewPost] = useState(null); // 변경된 상품 데이터 저장
  const [showReportPopup, setShowReportPopup] = useState(false); // 신고 팝업 표시 여부
  const [reportReason, setReportReason] = useState(""); // 선택된 신고 사유

  useEffect(() => {
    const API_POST_URL = `http://localhost:18090/api/gogumapost/${post.id}`;

    fetch(API_POST_URL) // 여기에 실제 API 입력
      .then((response) => response.json())
      .then((data) => {
        const postData = {
          id: data.pid, // 서버에서 받은 상품 ID
          sellerUid: data.uid, // 판매자 UID
          selectedUser: data.selected_user, // 선택된 유저
          regionGu: data.loca_gu, // 지역 (구 정보만 사용)
          regionDong: data.loca_dong, // 지역 (동 정보만 사용)
          title: data.post_title, // 제목
          image: data.post_photo, // 상품 이미지
          content: data.post_content, // 상품 설명
          category: data.post_category, // 카테고리
          price: data.post_price || "가격 미정", // 가격 (백엔드에 따라 수정)
          userList: data.user_list, // 구매 희망하는 유저 리스트
          reportCnt: data.report_cnt, // 신고 횟수
          updateTime: data.upd_date, // 마지막 업데이트 시간
          seller: data.nickname, // 판매자 닉네임
          thumbnail: data.thumbnail, // 판매자 썸네일(이미지)
          userRate: data.user_rate, // 판매자 평점
        };
        setNewPost(postData);
      })
      .catch((error) => {
        console.error("데이터 불러오기 실패:", error);
      });
  }, []);

  // 신고 사유 목록
  const reportReasons = [
    "허위 매물",
    "부적절한 게시글",
    "사기 의심",
    "기타 사유",
  ];

  // 신고 버튼 클릭 시 팝업 열기
  const handleOpenReportPopup = () => {
    setShowReportPopup(true);
  };

  // 신고 팝업 닫기
  const handleCloseReportPopup = () => {
    setShowReportPopup(false);
    setReportReason("");
  };

  // 신고 제출
  const handleReportSubmit = () => {
    if (!reportReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    const reportData = {
      rid: Date.now(), // 신고 번호 (임시)
      uid: 1, // 신고한 사용자 ID
      pid: post.id, // 신고당한 게시글 ID
      reportId: reportReasons.indexOf(reportReason) + 1, // 신고 사유 ID
      isConfirm: false, // 신고 처리 여부 (초기값 false)
      reportDate: new Date().toISOString(), // 신고 일시
    };

    alert("신고가 접수되었습니다.");
    handleCloseReportPopup();
  };

  const navigate = useNavigate(); // useNavigate 훅 사용

  const onBack = () => {
    navigate("/list"); // 리스트 페이지로 이동
  };

  // 카테고리와 지역 처리
  const PostCategory = {
    0: "디지털기기",
    1: "가구/인테리어",
    2: "유아동",
    3: "의류",
    4: "잡화",
    5: "생활가전",
    6: "생활/주방",
    7: "스포츠/레저",
    8: "취미/게임/음반",
    9: "뷰티/미용",
    10: "식물",
    11: "식품",
    12: "반려동물",
    13: "티켓/교환권",
    14: "도서",
    15: "기타",
  };

  const Gu = {
    0: "강남구",
    1: "서초구",
  };

  const Dong = {
    0: "개포1동",
    1: "개포2동",
    2: "개포3동",
    3: "개포4동",
    4: "논현1동",
    5: "논현2동",
    6: "대치1동",
    7: "대치2동",
    8: "대치4동",
    9: "도곡1동",
    10: "도곡2동",
    11: "삼성1동",
    12: "삼성2동",
    13: "세곡동",
    14: "수서동",
    15: "신사동",
    16: "압구정동",
    17: "역삼1동",
    18: "역삼2동",
    19: "일원1동",
    20: "일원본동",
    21: "청담동",
    22: "내곡동",
    23: "반포1동",
    24: "반포2동",
    25: "반포3동",
    26: "반포4동",
    27: "반포본동",
    28: "방배1동",
    29: "방배2동",
    30: "방배3동",
    31: "방배4동",
    32: "방배본동",
    33: "서초1동",
    34: "서초2동",
    35: "서초3동",
    36: "서초4동",
    37: "양재1동",
    38: "양재2동",
    39: "잠원동",
  };

  // 현재 로그인한 사용자 (더미 데이터)
  const user = { id: 123 };

  return (
    <>
      <Header />
      <Advertise />

      <div className="detail-product-detail">
        {/* 뒤로가기 버튼을 상단에 위치시킴 */}
        <button onClick={onBack} className="detail-back-button">
          <MdOutlineBackspace />
        </button>

        {/* 상품 이미지와 내용 (왼쪽, 오른쪽 분리된 부분) */}
        <div className="detail-product-body">
          <div className="detail-product-left">
            <img
              src={post.image}
              alt={post.title}
              className="detail-product-image"
            />

            <div className="detail-seller-info">
              <div className="detail-seller-left">
                <img src={post.thumbnail} alt="판매자 이미지" />
                <div>
                  <p className="detail-nickname">{post.seller}</p>
                  <p className="detail-location">
                    {post.regionGu}, {post.regionDong}
                  </p>
                </div>
              </div>
              <div className="detail-seller-right">
                <p>{post.userRate} / 5</p>
              </div>
            </div>
            {/* 신고하기 버튼 */}
            <button
              className="detail-report-button"
              onClick={handleOpenReportPopup}
            >
              🚨 신고하기
            </button>
            {/* 신고 팝업 */}
            {showReportPopup && (
              <div className="detail-report-popup">
                <div className="detail-popup-content">
                  <h3>게시글 신고</h3>
                  <p>신고 사유를 선택해주세요.</p>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  >
                    <option value="">-- 신고 사유 선택 --</option>
                    {reportReasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                  <div className="detail-popup-buttons">
                    <button
                      className="detail-submit-button"
                      onClick={handleReportSubmit}
                    >
                      신고하기
                    </button>
                    <button
                      className="detail-cancel-button"
                      onClick={handleCloseReportPopup}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="detail-product-right">
            <h2 className="detail-product-title">{post.title}</h2>

            {/* 카테고리와 날짜 추가 */}
            <p className="detail-product-category">
              {PostCategory[post.category]} | {/* post.updateTime */}
            </p>

            {/* 가격 추가 */}
            <p className="detail-product-price">
              {post.price.toLocaleString() + "원"}
            </p>

            <p className="detail-product-description">{post.content}</p>
            {/* <UserNegoChat user_id={{ id: 123 }} post={newPost} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
