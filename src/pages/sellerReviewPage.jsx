import React, { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import "../css/sellerReviewPage.css";
import spEmpty from "../resources/images/sweet-potato-Empty.png"; // 색이 없는 고구마
import spFilled from "../resources/images/sweet-potato-Filled.png"; // 색이 있는 고구마

const SReviewPopup = ({ onClose, reviewData, sellerId, buyerId }) => {
  const [rating, setRating] = useState(0); // 평점 상태
  const [newReview, setNewReview] = useState(""); // 리뷰 내용
  const [isReviewed, setIsReviewed] = useState(false); // 이미 리뷰 작성 여부 체크
  // 기존 리뷰 데이터 불러오기
  useEffect(() => {
    if (reviewData) {
      setRating(reviewData.review_point || 0);
      setNewReview(reviewData.review_content || "");
    }
  }, [reviewData]);

  const handleClick = (index) => {
    setRating(index);
  };

  // 🔹 리뷰 제출 함수 (서버로 전송)
  const handleReviewSubmit = async () => {
    if (newReview.trim()) {
      const reviewDataToSubmit = {
        seller_uid: sellerId, // 판매자 UID
        buyer_uid: buyerId, // 구매자 UID
        review_content: newReview, // 리뷰 내용
        review_point: rating, // 평점 (1~5)
        reward_point: 10, // 보상 포인트 (서버에서 결정 가능)
        upd_date: new Date().toISOString(), // 날짜 형식 ISO 8601
      };

      try {
        const response = await fetch(
          "http://localhost:18090/api/gogumareview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reviewDataToSubmit),
          }
        );
        console.log(reviewDataToSubmit);
        if (!response.ok) {
          throw new Error("리뷰 전송 실패");
        }

        alert("리뷰가 성공적으로 등록되었습니다!");
        setIsReviewed(true); // 리뷰 작성 완료 처리
        onClose(); // 팝업 닫기
      } catch (error) {
        console.error("🚨 리뷰 전송 오류:", error);
        alert("리뷰 등록 중 오류가 발생했습니다.");
      }
    }
  };

  if (isReviewed) return null; // 이미 리뷰 작성 시 팝업 숨김

  return (
    <div className="sreview-seller-review-container">
      <div className="sreview-seller-review-content">
        <button className="sreview-closePopup-button" onClick={onClose}>
          <CgCloseR />
        </button>
        <h3>리뷰를 작성해주세요</h3>

        {/* 평점 선택 */}
        <div className="sreview-rating-input">
          {[1, 2, 3, 4, 5].map((index) => (
            <img
              key={index}
              src={index <= rating ? spFilled : spEmpty}
              alt={`sweetPotato-${index}`}
              onClick={() => handleClick(index)}
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            />
          ))}
        </div>

        {/* 리뷰 입력 */}
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="구매자에 대한 리뷰를 작성하세요..."
          className="sreview-review-input"
        />

        <button onClick={handleReviewSubmit} className="sreview-confirm-button">
          확인
        </button>
      </div>
    </div>
  );
};

export default SReviewPopup;
