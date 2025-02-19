import React, { useState } from "react";
import "../css/productDetailPage.css";
import UserNegoChat from "../components/userNegoChat.jsx"; // 채팅 컴포넌트 임포트
import { MdOutlineBackspace } from "react-icons/md"; //  뒤로가기

const ProductDetailPage = ({ onBack }) => {
  const [showReportPopup, setShowReportPopup] = useState(false); // 신고 팝업 표시 여부
  const [reportReason, setReportReason] = useState(""); // 선택된 신고 사유

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
      uid: user.id, // 신고한 사용자 ID
      pid: product.id, // 신고당한 게시글 ID
      reportId: reportReasons.indexOf(reportReason) + 1, // 신고 사유 ID
      isConfirm: false, // 신고 처리 여부 (초기값 false)
      reportDate: new Date().toISOString(), // 신고 일시
    };

    console.log("📌 신고 접수됨:", reportData);
    alert("신고가 접수되었습니다.");
    handleCloseReportPopup();
  };

  // ENUM 정의
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

  // 강남구와 서초구에 대한 ENUM 정의
  const Gu = {
    0: "강남구",
    1: "서초구",
  }

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

  // 더미 데이터 (서버에서 불러온다고 가정)
  const GogumaPost = {
    pid: 1,
    uid: 1,
    selectedUid: 2,
    locaGu: 1,
    locaDong: 1,
    postTitle: "아이폰 14 팝니다",
    postPhoto: "../resources/images/iphone14.png",
    postContent: "아이폰 14 싸게 팔아요!",
    postCategory: 0,
    reportCnt: 0,
    postUpdate: "2025-02-19",
  };

  const user = { id: "buyer123" }; // 현재 로그인한 사용자 (판매자가 아니라면 구매자로 간주)

  return (
    <div>
      <div className="product-detail">
        <div className="product-left">
          <img
            src={GogumaPost.postPhoto}
            alt={GogumaPost.postTitle}
            className="product-image"
          />
          <div className="seller-info">
            <p>판매자: {GogumaPost.uid}</p>
            <p>
              거래 희망 지역: {Gu[GogumaPost.locaGu]},{" "}
              {Dong[GogumaPost.locaDong]}
            </p>
            <p>카테고리: {PostCategory[GogumaPost.postCategory]}</p>
          </div>
        </div>

        <div className="product-right">
          <button onClick={onBack} className="back-button">
            <MdOutlineBackspace />
          </button>
          <h2 className="product-title">{GogumaPost.postTitle}</h2>
          <p className="product-description">{GogumaPost.postContent}</p>
        </div>
      </div>
      {/* 신고하기 버튼 */}
      <button className="report-button" onClick={handleOpenReportPopup}>
        🚨 신고하기
      </button>
      {/* 신고 팝업 */}
      {showReportPopup && (
        <div className="report-popup">
          <div className="popup-content">
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
            <div className="popup-buttons">
              <button className="submit-button" onClick={handleReportSubmit}>
                신고하기
              </button>
              <button
                className="cancel-button"
                onClick={handleCloseReportPopup}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      <UserNegoChat onBack={onBack} user={user} GogumaPost={GogumaPost} />
    </div>
  );
};

export default ProductDetailPage;
