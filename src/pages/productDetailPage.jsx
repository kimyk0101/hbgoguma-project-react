import React, { useState } from "react";
import "../css/productDetailPage.css";
import UserNegoChat from "../components/userNegoChat.jsx"; // 채팅 컴포넌트 임포트
import { MdOutlineBackspace } from "react-icons/md";  //  뒤로가기

const ProductDetailPage = ({ onBack, product }) => {
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
  
  // 더미데이터
  const product1 = {
    description: "상품1 팝니다, 111111111111111111111111111111111111111111111111",
   
  };

  const user = { id: "buyer123" }; // 현재 로그인한 사용자 (판매자가 아니라면 구매자로 간주)

  return (
    <div>
      <div className="product-detail">
        <div className="product-left">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="seller-info">
            <p>판매자: {product.seller}</p>
            <p>거래 희망 지역: {product.location}</p>
            <p>카테고리: {product.category}</p>
          </div>
        </div>

        <div className="product-right">
          <button onClick={onBack} className="back-button">
          <MdOutlineBackspace />
          </button>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product1.description}</p>
        </div>
      </div>
      <p className="product-description">{product.description}</p>
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

      <UserNegoChat onBack={onBack} product={product} user={user} />
    </div>
  );
};

export default ProductDetailPage;
