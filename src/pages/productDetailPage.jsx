import React, { useState } from "react";
import "../css/productDetailPage.css";
import UserNegoChat from "../components/userNegoChat.jsx"; // 채팅 컴포넌트 임포트
import "../css/sellerReviewPage.css";

const ProductDetailPage = ({ product, onBack }) => {
  const [interestedBuyers, setInterestedBuyers] = useState([]); // 관심 구매자 리스트
  const [activeChat, setActiveChat] = useState(null); // 현재 활성화된 채팅 ID
  const [selectedBuyer, setSelectedBuyer] = useState(null); // 선택된 구매자
  const [isPurchased, setIsPurchased] = useState(false); // 구매 확정 여부
  const [showReportPopup, setShowReportPopup] = useState(false); // 신고 팝업 표시 여부
  const [reportReason, setReportReason] = useState(""); // 선택된 신고 사유
  // TODO: 임의의 데이터 바꾸기
  // const product = {
  //   image: "../images/iphone14.png",
  //   title: "아이폰 14",
  //   description: "아이폰 14 팔아요",
  //   seller: "판매자",
  //   location: "역삼동",
  //   category: "전자기기",
  // };

  const user = { id: "buyer123" }; // 현재 로그인한 사용자 (판매자가 아니라면 구매자로 간주)

  // 관심 구매자 추가 (구매 희망 버튼 클릭 시 실행)
  const handleInterest = () => {
    const newBuyerId = "buyer" + Math.floor(Math.random() * 10000); // 랜덤 ID 생성

    if (!interestedBuyers.some((buyer) => buyer.id === newBuyerId)) {
      const newBuyer = {
        id: newBuyerId,
        name: `구매자 ${interestedBuyers.length + 1}`,
      };
      setInterestedBuyers((prevBuyers) => [...prevBuyers, newBuyer]);
      console.log("🔹 새로운 구매자 추가됨:", newBuyer);
    } else {
      console.log("⚠ 이미 존재하는 구매자입니다.");
    }
  };

  // 채팅 시작 버튼 클릭 시 활성화/비활성화 토글
  const handleStartChat = (buyerId) => {
    setActiveChat((prevActiveChat) =>
      prevActiveChat === buyerId ? null : buyerId
    );
  };

  // 구매자 확정 버튼 클릭 시
  const handleConfirmBuyer = (buyerId) => {
    setSelectedBuyer(buyerId);
  };

  // 구매 확정
  const handlePurchaseConfirm = () => {
    setIsPurchased(true);
    console.log("✅ 구매 확정됨!");
  };

  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewSubmit = () => {
    if (newReview.trim() === "") return;
    const newReviewObj = {
      id: reviews.length + 1,
      author: "사용자", // 로그인 시스템이 없으므로 임시 이름 사용
      rating,
      content: newReview,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([newReviewObj, ...reviews]); // 최신순 정렬
    setNewReview("");
    setRating(5);
  };
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "사용자1",
      rating: 5,
      content: "정말 친절한 판매자였습니다!",
      date: "2025-02-18",
    },
  ]);

  //신고 기능
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

  return (
    <div>
      <button onClick={onBack} className="back-button">
        ← 뒤로가기
      </button>

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
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          {/* 신고하기 버튼 */}
          <button className="report-button" onClick={handleOpenReportPopup}>
            🚨 신고하기
          </button>

          {/* 구매자일 경우 "구매 희망" 버튼 표시 */}
          {user.id !== product.seller && !isPurchased && (
            <button className="interest-button" onClick={handleInterest}>
              구매 희망
            </button>
          )}
        </div>
      </div>

      {/* 상품 설명 끝난 후, 구매 희망자 리스트를 하단에 위치 */}
      <div className="product-footer">
        {user.id !== product.seller && (
          <div className="interested-buyers">
            <h3>구매 희망자</h3>
            <ul>
              {interestedBuyers.length > 0 ? (
                interestedBuyers.map((buyer) => (
                  <li key={buyer.id} className="buyer-item">
                    <span>{buyer.name}</span>
                    <button onClick={() => handleConfirmBuyer(buyer.id)}>
                      구매 확정
                    </button>
                    <button onClick={() => handleStartChat(buyer.id)}>
                      {activeChat === buyer.id ? "채팅 닫기" : "채팅 시작"}
                    </button>
                    {activeChat === buyer.id && (
                      <UserNegoChat buyerId={buyer.id} />
                    )}
                  </li>
                ))
              ) : (
                <p>아직 구매 희망자가 없습니다.</p>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* 구매자 확정 팝업 */}
      {selectedBuyer && !isPurchased && (
        <div className="purchase-popup">
          <div className="popup-content">
            <h3>판매가 완료되었습니다</h3>
            {/* TODO: 리뷰페이지로 이동(팝업) */}
            <div className="seller-review-container">
              <h3>판매자 리뷰</h3>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= rating ? "star selected" : "star"}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="판매자에 대한 리뷰를 작성하세요..."
                className="review-input"
              />
              <button onClick={handleReviewSubmit} className="submit-button">
                리뷰 등록
              </button>

              <ul className="review-list">
                {/* 리뷰는 스크롤 가능한 영역에 표시 */}
                <div className="reviews-scroll-container">
                  {reviews.slice(1).map((review) => (
                    <li key={review.id} className="review-item">
                      <p>
                        <strong>{review.author}</strong> ({review.date})
                      </p>
                      <p className="review-rating">
                        평점: {"★".repeat(review.rating)}
                      </p>
                      <p>{review.content}</p>
                    </li>
                  ))}
                </div>
              </ul>
              <button
                className="confirm-button"
                onClick={handlePurchaseConfirm}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
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

      {isPurchased && (
        <div className="purchase-confirmation">
          <h3>거래가 완료되었습니다!</h3>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
