import React, { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg"; 
import "../css/sellerReviewPage.css";
import spEmpty from "../resources/images/sweet-potato-Empty.png";  // 색이 없는 고구마
import spFilled from "../resources/images/sweet-potato-Filled.png";  // 색이 있는 고구마

const SReviewPopup = ({ onClose, onSubmit, reviewData }) => {
  const [rating, setRating] = useState(0); // 평점 상태
  const [newReview, setNewReview] = useState(""); // 리뷰 내용
  const [isReviewed, setIsReviewed] = useState(false); // 이미 리뷰 작성 여부 체크

  // 리뷰 데이터를 서버에서 받아오는 형식에 맞게 초기화
  useEffect(() => {
    if (reviewData) {
      setRating(reviewData.reviewPoint || 0); // 서버에서 받은 평점을 설정
      setNewReview(reviewData.reviewContent || ""); // 서버에서 받은 리뷰 내용을 설정
    }
  }, [reviewData]);

  const handleClick = (index) => {
    setRating(index);  // 클릭된 고구마에 해당하는 평점으로 상태 업데이트
  };

  // 리뷰 제출 함수
  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      // 더미데이터
      const reviewDataToSubmit = {
        hid: Date.now(), // 고유번호는 임시로 Date.now()로 설정 (서버에서 처리하도록)
        sendUid: 1,
        rexeiveUid: 1,
        reviewContent: newReview,
        reviewPoint: rating,
        rewardPoint: 10, // 보상 포인트는 서버에서 제공하는 값으로 수정 필요
        reviewUpdate: new Date().toLocaleDateString(), // 서버에서 요구하는 날짜 형식에 맞게 수정 필요
      };

      onSubmit(reviewDataToSubmit); // 리뷰 데이터를 서버로 전송
      localStorage.setItem("hasReviewed", "true"); // 리뷰 작성 여부 저장
      onClose();
    }
  };

  if (isReviewed) return null; // 이미 리뷰를 작성한 경우 팝업을 띄우지 않음

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
              key={index}  // 각 평점에 고유 키를 부여
              src={index <= rating ? spFilled : spEmpty}  // 평점에 맞는 아이콘 이미지 사용
              alt={`sweetPotato-${index}`}  // 이미지 설명 텍스트
              onClick={() => handleClick(index)}  // 클릭 시 평점 업데이트
              style={{ width: "40px", height: "40px", cursor: "pointer" }}  // 아이콘 크기 및 클릭 시 커서
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

        <button
          onClick={() => {
            handleReviewSubmit();
            onClose();
          }}
          className="sreview-confirm-button"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default SReviewPopup;
